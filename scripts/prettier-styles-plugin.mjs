import { printers as estreePrinters } from "prettier/plugins/estree";

const estree = estreePrinters.estree;

/** Teach Prettier that our breakpoint templates contain CSS. */
export const printers = {
  estree: {
    ...estree,
    embed(path, options) {
      const parent = path.parent;
      const tag = parent?.type === "TaggedTemplateExpression" && parent.tag;
      const isBreakpoint =
        tag?.type === "MemberExpression" &&
        tag.object.type === "Identifier" &&
        tag.object.name === "breakpoint";
      const isGlobalStyle =
        tag?.type === "Identifier" && tag.name === "createGlobalStyle";

      if (!isBreakpoint && !isGlobalStyle) {
        return estree.embed(path, options);
      }

      // Reuse Prettier's CSS embedding; preserve the actual tag in the output.
      parent.tag = { type: "Identifier", name: "css" };
      try {
        return estree.embed(path, options);
      } finally {
        parent.tag = tag;
      }
    },
  },
};
