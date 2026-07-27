/* eslint-disable no-await-in-loop, no-console, no-continue, no-restricted-syntax */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

process.loadEnvFile('.env');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEMINI_API_ROOT = 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_CHUNK_CHARACTERS = 4_500;

const sources = [
  {
    file: '08-technical-skills.md',
    table: 'technical_skills_documents',
    title: 'Technical Skills',
  },
  {
    file: '07-stockload.md',
    table: 'stockload_documents',
    title: 'Stockload',
  },
  {
    file: '05-momants-ai.md',
    table: 'momants_documents',
    title: 'Momants.ai',
  },
  {
    file: '04-gemeente-amsterdam.md',
    table: 'gemeente_amsterdam_documents',
    title: 'Gemeente Amsterdam',
  },
  {
    file: '03-vodafoneziggo-checkout.md',
    table: 'vodafoneziggo_checkout_documents',
    title: 'VodafoneZiggo Checkout',
  },
  {
    file: '02-vodafoneziggo-product-card.md',
    table: 'vodafoneziggo_product_card_documents',
    title: 'VodafoneZiggo Product Card',
  },
  {
    file: '01-portfolio-website.md',
    table: 'portfolio_website_documents',
    title: 'Portfolio Website',
  },
];

const requiredEnvironment = [
  'GEMINI_API_KEY',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];

for (const variable of requiredEnvironment) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

const sleep = (milliseconds) => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});

const splitMarkdown = (markdown) => {
  const sections = markdown
    .split(/(?=^#{1,3}\s)/gm)
    .map((section) => section.trim())
    .filter(Boolean);
  const chunks = [];
  let current = '';

  for (const section of sections) {
    if (
      current
      && current.length + section.length + 2 > MAX_CHUNK_CHARACTERS
    ) {
      chunks.push(current);
      current = '';
    }

    if (section.length <= MAX_CHUNK_CHARACTERS) {
      current = current ? `${current}\n\n${section}` : section;
      continue;
    }

    const paragraphs = section.split(/\n{2,}/);
    for (const paragraph of paragraphs) {
      if (
        current
        && current.length + paragraph.length + 2 > MAX_CHUNK_CHARACTERS
      ) {
        chunks.push(current);
        current = '';
      }
      current = current ? `${current}\n\n${paragraph}` : paragraph;
    }
  }

  if (current) chunks.push(current);
  return chunks;
};

const embedDocument = async (content, title) => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(
      `${GEMINI_API_ROOT}/gemini-embedding-001:embedContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          model: 'models/gemini-embedding-001',
          content: { parts: [{ text: content }] },
          taskType: 'RETRIEVAL_DOCUMENT',
          title,
        }),
      },
    );

    if (response.ok) {
      const payload = await response.json();
      const values = payload.embedding?.values;

      if (!Array.isArray(values) || values.length !== 3072) {
        throw new Error(`Invalid embedding returned for ${title}.`);
      }

      return values;
    }

    if (response.status !== 429 || attempt === 4) {
      throw new Error(
        `Gemini embedding failed for ${title} with status ${response.status}.`,
      );
    }

    await sleep(2 ** attempt * 1_000);
  }

  throw new Error(`Gemini embedding failed for ${title}.`);
};

const upsertDocument = async (table, record) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}`,
    {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(record),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Supabase upsert failed for ${table} with status ${response.status}.`,
    );
  }
};

for (const source of sources) {
  const markdown = await readFile(
    path.join(ROOT, 'knowledge', source.file),
    'utf8',
  );
  const chunks = splitMarkdown(markdown);

  for (const [index, content] of chunks.entries()) {
    const id = createHash('sha256')
      .update(`${source.file}:${index}:${content}`)
      .digest('hex');
    const embedding = await embedDocument(content, source.title);

    await upsertDocument(source.table, {
      id,
      content,
      metadata: {
        source: source.file,
        title: source.title,
        chunk: index + 1,
        chunkCount: chunks.length,
      },
      embedding,
    });

    console.log(`${source.table}: indexed chunk ${index + 1}/${chunks.length}`);
    await sleep(250);
  }
}

console.log('Career knowledge indexing complete.');
