import Image from "next/image";
import { Fragment, ReactNode } from "react";
import { BlogAsset, RichTextNode } from "../../lib/contentful-blog";

type RichTextProps = {
  document: RichTextNode;
  assets?: BlogAsset[];
};

const applyMarks = (text: ReactNode, marks: Array<{ type: string }> = []) =>
  marks.reduce<ReactNode>((result, mark) => {
    if (mark.type === "bold") return <strong>{result}</strong>;
    if (mark.type === "italic") return <em>{result}</em>;
    if (mark.type === "underline") return <u>{result}</u>;
    if (mark.type === "code") return <code>{result}</code>;
    return result;
  }, text);

const renderNode = (node: RichTextNode, assets: BlogAsset[], key: string): ReactNode => {
  const children = node.content?.map((child, index) =>
    renderNode(child, assets, `${key}-${index}`),
  );

  switch (node.nodeType) {
    case "text":
      return <Fragment key={key}>{applyMarks(node.value || "", node.marks)}</Fragment>;
    case "paragraph":
      return <p key={key}>{children}</p>;
    case "heading-2":
      return <h2 key={key}>{children}</h2>;
    case "heading-3":
      return <h3 key={key}>{children}</h3>;
    case "heading-4":
      return <h4 key={key}>{children}</h4>;
    case "unordered-list":
      return <ul key={key}>{children}</ul>;
    case "ordered-list":
      return <ol key={key}>{children}</ol>;
    case "list-item":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;
    case "hr":
      return <hr key={key} />;
    case "hyperlink": {
      const href = node.data?.uri || "";
      const external = href.startsWith("http");
      return (
        <a key={key} href={href} rel={external ? "noopener noreferrer" : undefined} target={external ? "_blank" : undefined}>
          {children}
        </a>
      );
    }
    case "embedded-asset-block": {
      const asset = assets.find((item) => item.sys.id === node.data?.target?.sys?.id);
      return asset ? (
        <Image
          key={key}
          src={asset.url}
          alt={asset.description || asset.title || "Blog illustration"}
          width={asset.width || 1200}
          height={asset.height || 675}
          loading="lazy"
        />
      ) : null;
    }
    default:
      return <Fragment key={key}>{children}</Fragment>;
  }
};

export const RichText = ({ document, assets = [] }: RichTextProps) => (
  <>{renderNode(document, assets, "root")}</>
);
