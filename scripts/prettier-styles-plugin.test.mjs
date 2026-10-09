import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "prettier";
import * as plugin from "./prettier-styles-plugin.mjs";

const options = { parser: "typescript", plugins: [plugin], tabWidth: 2 };

test("formats nested breakpoint CSS and preserves its tag", async () => {
  const source =
    "const rule = breakpoint.desktop`gap:24px; &:hover{opacity:0.8;}`;";
  const result = await format(source, options);
  assert.match(result, /breakpoint\.desktop`\n {2}gap: 24px;/);
  assert.match(result, / {2}&:hover \{\n {4}opacity: 0\.8;\n {2}\}/);
  assert.equal(await format(result, options), result);
});

test("formats global CSS without replacing the global style component", async () => {
  const result = await format(
    "const Reset = createGlobalStyle`.page{margin:0;}`;",
    options,
  );
  assert.match(result, /createGlobalStyle`\n {2}\.page \{\n {4}margin: 0;/);
});

test("preserves dynamic CSS interpolations", async () => {
  const result = await format(
    "const rule = breakpoint.md`gap:${({$gap})=>$gap}px;`;",
    options,
  );
  assert.match(result, /breakpoint\.md`/);
  assert.match(result, /gap: \$\{\(\{ \$gap \}\) => \$gap\}px;/);
});
