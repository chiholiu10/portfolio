import type { ToolItem, ToolCategory } from "@/lib/content-model";

export const normalizeToolName = (title?: string | null) =>
  title?.trim().toLowerCase() || "";

export const groupTools = (
  items: ToolItem[],
  toolCategories: ToolCategory[],
) => {
  const assignedTools = new Set<string>();
  const categories = toolCategories.map((category) => {
    const tools = category.tools
      .map((toolName) =>
        items.find(
          (item) =>
            normalizeToolName(item.title) === normalizeToolName(toolName),
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
