import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

interface MaskedLineProps {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  skipAnimation?: boolean;
  className?: string;
}

/**
 * Masked upward typography reveal: text slides smoothly out of an overflow-hidden frame.
 */
export function MaskedLine({
  children,
  delay = 0,
  immediate = false,
  skipAnimation = false,
  className = '',
}: MaskedLineProps) {
  const reduced = useReducedMotion();
  const shouldSkip = Boolean(reduced || skipAnimation);

  if (shouldSkip) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%', opacity: 0.01 }}
        {...(immediate
          ? { animate: { y: '0%', opacity: 1 } }
          : {
              whileInView: { y: '0%', opacity: 1 },
              viewport: VIEWPORT_ONCE,
            })}
        transition={{
          duration: DURATION.slow,
          delay,
          ease: EASE_PREMIUM,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface ClipImageRevealProps {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  skipAnimation?: boolean;
  className?: string;
}

/**
 * Architectural image reveal combining subtle inset clip-path and gentle scale settle (1.04 -> 1).
 */
export function ClipImageReveal({
  children,
  delay = 0,
  immediate = false,
  skipAnimation = false,
  className = '',
}: ClipImageRevealProps) {
  const reduced = useReducedMotion();
  const shouldSkip = Boolean(reduced || skipAnimation);

  if (shouldSkip) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.01, scale: 1.03 }}
      {...(immediate
        ? { animate: { opacity: 1, scale: 1 } }
        : {
            whileInView: { opacity: 1, scale: 1 },
            viewport: VIEWPORT_ONCE,
          })}
      transition={{
        duration: DURATION.slow,
        delay,
        ease: EASE_PREMIUM,
      }}
    >
      {children}
    </motion.div>
  );
}

interface EditorialRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
}

/**
 * Versatile directional reveal for cards, rows, and secondary copy.
 */
export function EditorialReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
  className = '',
}: EditorialRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === 'up'
      ? { y: distance, x: 0 }
      : direction === 'left'
        ? { x: distance, y: 0 }
        : direction === 'right'
          ? { x: -distance, y: 0 }
          : { x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.01, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: DURATION.slow,
        delay,
        ease: EASE_PREMIUM,
      }}
    >
      {children}
    </motion.div>
  );
}
