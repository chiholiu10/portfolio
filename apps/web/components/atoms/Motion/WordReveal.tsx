import { useSkipEntrance } from "@/components/atoms/Motion/RevealSession";
import { m } from "motion/react";
import { premiumEase } from "@/components/atoms/Motion/motion.config";

interface WordRevealProps {
  text?: string | null;
  id?: string;
}

export const WordReveal = ({ text = "" }: WordRevealProps) => {
  const skip = useSkipEntrance();
  if (!text) return null;

  const words = text.split(" ");
  return (
    <span className="ui-span">
      {words.map((word, i) => (
        <m.span
          className="ui-span"
          key={i}
          initial={{ opacity: 0, y: 9 }}
          animate={skip ? { opacity: 1, y: 0 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
            margin: "-80px 0px -80px 0px",
          }}
          transition={{
            duration: skip ? 0 : 0.56,
            delay: skip ? 0 : Math.min(i * 0.018, 0.38),
            ease: premiumEase,
          }}
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
