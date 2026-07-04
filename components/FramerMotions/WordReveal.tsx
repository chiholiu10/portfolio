import { m } from "motion/react";
import { premiumEase } from "./motion.config";

const seenWords = new Set<string>();

interface WordRevealProps {
  text?: string | null;
  id?: string;
}

export const WordReveal = ({ text = "", id = "" }: WordRevealProps) => {
  if (!text) return null;

  const words = text.split(" ");
  const alreadyPlayed = seenWords.has(id);

  if (alreadyPlayed) {
    return <span>{text}</span>;
  }

  const handleComplete = (isLast: boolean) => {
    if (isLast) {
      seenWords.add(id);
    }
  };

  return (
    <span>
      {words.map((word, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 9 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
            margin: "-80px 0px -80px 0px",
          }}
          transition={{
            duration: 0.56,
            delay: Math.min(i * 0.018, 0.38),
            ease: premiumEase,
          }}
          onAnimationComplete={() => handleComplete(i === words.length - 1)}
          style={{
            display: "inline-block",
            marginRight: "0.35em",
            willChange: "transform, opacity",
          }}
        >
          {word}
        </m.span>
      ))}
    </span>
  );
};
