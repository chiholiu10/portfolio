import { motion } from "framer-motion";

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
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={() => handleComplete(i === words.length - 1)}
          style={{
            display: "inline-block",
            marginRight: "0.35em",
            willChange: "transform, opacity",
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
};
