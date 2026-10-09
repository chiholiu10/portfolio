import type { ToolItem, ToolCategory } from "@/lib/content-model";

export const additionalTools: ToolItem[] = [
  { title: "Shopify", url: "/tools/shopify.svg" },
  { title: "WordPress", url: "/tools/wordpress.svg" },
  { title: "Elementor", url: "/tools/elementor.svg" },
  { title: "Codex", url: "/tools/codex.svg" },
  { title: "GitHub", url: "/tools/github.svg" },
  { title: "GitLab", url: "/tools/gitlab.svg" },
  { title: "Node.js", url: "/tools/nodejs.svg" },
  { title: "Supabase", url: "/tools/supabase.svg" },
  { title: "PostgreSQL", url: "/tools/postgresql.svg" },
];

export const normalizeToolName = (title?: string | null) =>
  title?.trim().toLowerCase() || "";

export const groupTools = (items: ToolItem[], toolCategories: ToolCategory[]) => {
  const assignedTools = new Set<string>();
  const categories = toolCategories.map((category) => {
    const tools = category.tools
      .map((toolName) =>
        items.find(
          (item) => normalizeToolName(item.title) === toolName.toLowerCase(),
        ),
      )
      .filter((item): item is ToolItem => Boolean(item));

    tools.forEach((tool) => assignedTools.add(normalizeToolName(tool.title)));

    return { ...category, tools };
  });
  const uncategorizedTools = items.filter(
    (item) => !assignedTools.has(normalizeToolName(item.title)),
  );

  if (uncategorizedTools.length > 0) {
    const fallback = categories[1] || categories[0];
    if (fallback) fallback.tools.push(...uncategorizedTools);
  }

  return categories;
};
