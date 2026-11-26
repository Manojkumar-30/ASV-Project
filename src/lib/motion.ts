import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.18,
  standard: 0.3,
  slow: 0.6,
  cinematic: 0.85,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.18,
} as const;

// Tracks whether the first-load hero entrance has already played in this browser session
let heroEntrancePlayed = false;

export function hasHeroEntrancePlayed(): boolean {
  return heroEntrancePlayed;
}

export function markHeroEntrancePlayed(): void {
  heroEntrancePlayed = true;
}

/**
 * True only on desktop viewports with fine pointer input (mouse/trackpad)
 * and when user has NOT requested reduced motion.
 */
export function useIsDesktopPointer(): boolean {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined' || !window.matchMedia) {
      setEnabled(false);
      return;
    }

    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [prefersReduced]);

  return enabled;
}
