import { m, useTransform, type MotionValue } from "motion/react";
import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";

interface WordRevealProps {
  text?: string | null;
  id?: string;
}

export const WordReveal = ({ text = "", id }: WordRevealProps) => {
  const { ref, progress, reduceMotion } = useScrollReveal<HTMLSpanElement>();
  if (!text) return null;
  const words = text.trim().split(/\s+/);
  return (
    <span className="ui-span" id={id} ref={ref}>
      {words.map((word, index) => (
        <RevealWord
          key={index}
          word={word}
          progress={progress}
          offset={words.length > 1 ? (index / (words.length - 1)) * 0.22 : 0}
          reduceMotion={reduceMotion === true}
        />
      ))}
    </span>
  );
};

function RevealWord({
  word,
  progress,
  offset,
  reduceMotion,
}: {
  word: string;
  progress: MotionValue<number>;
  offset: number;
  reduceMotion: boolean;
}) {
  const opacity = useTransform(progress, [offset, offset + 0.65], [0, 1]);
  const y = useTransform(progress, [offset, offset + 0.65], [10, 0]);
  return (
    <>
      <m.span
        className="ui-span"
        style={{
          display: "inline-block",
          opacity: reduceMotion ? 1 : opacity,
          y: reduceMotion ? 0 : y,
        }}
      >
        {word}
      </m.span>{" "}
    </>
  );
}
