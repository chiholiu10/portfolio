import { useState } from "react";
import { ShareActions, ShareSection, ShareStatus } from "./Blog.styles";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [status, setStatus] = useState("");
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("The link could not be copied. You can copy it from the address bar.");
    }
  };

  const shareNative = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text: title, url });
      setStatus("Article shared.");
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setStatus("The article could not be shared.");
      }
    }
  };

  return (
    <ShareSection aria-labelledby="share-article-title">
      <h2 id="share-article-title">Worth sharing?</h2>
      <p>Send this article to someone who might find it useful.</p>
      <ShareActions>
        <button className="primary-share" type="button" onClick={shareNative}>
          Share article
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a href={`mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`}>
          Email
        </a>
        <button type="button" onClick={copyLink}>Copy link</button>
      </ShareActions>
      <ShareStatus role="status" aria-live="polite">{status}</ShareStatus>
    </ShareSection>
  );
};
