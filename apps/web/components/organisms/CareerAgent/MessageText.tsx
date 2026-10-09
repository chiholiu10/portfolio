import type { ReactNode } from "react";

const renderInlineText = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong className="ui-strong" key={`${part}-${index}`}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );

export const MessageText = ({ content }: { content: string }) => {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) {
      blocks.push(
        <p className="ui-p" key={`paragraph-${blocks.length}`}>
          {renderInlineText(text)}
        </p>,
      );
    }
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index].trim();
    const orderedMatch = line.match(/^\d+[.)]\s+(.+)$/);
    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);

    if (orderedMatch || unorderedMatch) {
      flushParagraph();
      const isOrdered = Boolean(orderedMatch);
      const items: string[] = [];

      while (index < lines.length) {
        const candidate = lines[index].trim();
        const match = isOrdered
          ? candidate.match(/^\d+[.)]\s+(.+)$/)
          : candidate.match(/^[-*]\s+(.+)$/);

        if (!match) break;
        items.push(match[1]);
        index += 1;
      }

      const listItems = items.map((item, itemIndex) => (
        <li className="ui-li" key={`${item}-${itemIndex}`}>
          {renderInlineText(item)}
        </li>
      ));

      blocks.push(
        isOrdered ? (
          <ol className="ui-ol" key={`list-${blocks.length}`}>
            {listItems}
          </ol>
        ) : (
          <ul className="ui-ul" key={`list-${blocks.length}`}>
            {listItems}
          </ul>
        ),
      );
    } else {
      if (!line) {
        flushParagraph();
      } else {
        paragraph.push(line);
      }
      index += 1;
    }
  }

  flushParagraph();
  return blocks;
};
