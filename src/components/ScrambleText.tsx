import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: 'hover' | 'mount' | 'both';
  speed?: number; // Time in ms per step of resolution
  scrambleChars?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  trigger = 'both',
  speed = 40,
  scrambleChars = '0123456789ABCDEF!@#$_%+=-'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (isScrambling.current) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    isScrambling.current = true;

    const startTime = Date.now();
    const totalLength = text.length;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      // We resolve about one character per 'speed' milliseconds
      const resolvedCount = Math.floor(elapsed / speed);

      if (resolvedCount >= totalLength) {
        setDisplayText(text);
        isScrambling.current = false;
        animationFrameId.current = null;
        return;
      }

      const nextText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < resolvedCount) {
            return text[index];
          }
          // Scramble characters
          const randomIndex = Math.floor(Math.random() * scrambleChars.length);
          return scrambleChars[randomIndex];
        })
        .join('');

      setDisplayText(nextText);
      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);
  }, [text, speed, scrambleChars]);

  useEffect(() => {
    if (trigger === 'mount' || trigger === 'both') {
      startScramble();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [startScramble, trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      startScramble();
    }
  };

  return (
    <span
      className={`font-mono select-none inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};
