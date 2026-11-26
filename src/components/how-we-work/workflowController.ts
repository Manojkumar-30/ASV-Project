import type { ProcessPhaseId, ProcessService } from '../../types';

export const WORKFLOW_HYSTERESIS = 0.015;
export const MOBILE_STEP_HYSTERESIS_PX = 28;

export function clampNumber(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Authoritative deterministic step mapper with directional hysteresis.
 * Prevents boundary ping-ponging when scroll progress sits near a step boundary (k / totalSteps).
 * Supports both slow sequential progression and rapid jumps across multiple steps.
 */
export function computeScrollStepWithHysteresis(
  rawProgress: number,
  currentIndex: number,
  totalSteps = 12,
  hysteresis = WORKFLOW_HYSTERESIS,
): number {
  if (totalSteps <= 1) return 0;

  const progress = clampNumber(0, 1, rawProgress);
  const safeCurrent = clampNumber(0, totalSteps - 1, currentIndex);

  if (progress <= 0.005) return 0;
  if (progress >= 0.992) return totalSteps - 1;

  const rawBucket = clampNumber(0, totalSteps - 1, Math.floor(progress * totalSteps));

  if (rawBucket > safeCurrent) {
    let next = safeCurrent;
    while (next < totalSteps - 1) {
      const forwardThreshold = (next + 1) / totalSteps + hysteresis;
      if (progress >= forwardThreshold) {
        next += 1;
      } else {
        break;
      }
    }
    return next;
  }

  if (rawBucket < safeCurrent) {
    let next = safeCurrent;
    while (next > 0) {
      const backwardThreshold = next / totalSteps - hysteresis;
      if (progress <= backwardThreshold) {
        next -= 1;
      } else {
        break;
      }
    }
    return next;
  }

  return safeCurrent;
}

export interface ResolveDisplayedStepInput {
  scrollActiveIndex: number;
  hoveredServiceId: string | null;
  focusedServiceId: string | null;
  services: readonly ProcessService[];
}

export interface ResolvedWorkflowState {
  displayedIndex: number;
  activeService: ProcessService;
  activePhaseId: ProcessPhaseId;
  isPreviewActive: boolean;
  isJourneyComplete: boolean;
}

/**
 * Single source of truth for state precedence:
 * 1. Pointer hover preview (only on true hover devices when not suppressed by active scrolling)
 * 2. Keyboard focus preview
 * 3. Authoritative scroll-driven active step
 */
export function resolveWorkflowDisplayState({
  scrollActiveIndex,
  hoveredServiceId,
  focusedServiceId,
  services,
}: ResolveDisplayedStepInput): ResolvedWorkflowState {
  const safeScrollIndex = clampNumber(0, Math.max(0, services.length - 1), scrollActiveIndex);

  let previewIndex = -1;
  if (hoveredServiceId) {
    previewIndex = services.findIndex((s) => s.id === hoveredServiceId);
  }
  if (previewIndex < 0 && focusedServiceId) {
    previewIndex = services.findIndex((s) => s.id === focusedServiceId);
  }

  const displayedIndex = previewIndex >= 0 ? previewIndex : safeScrollIndex;
  const activeService = services[displayedIndex] ?? services[0];

  return {
    displayedIndex,
    activeService,
    activePhaseId: activeService.phaseId,
    isPreviewActive: previewIndex >= 0,
    isJourneyComplete: safeScrollIndex >= services.length - 1,
  };
}

export interface MobileStepCandidate {
  id: string;
  distance: number;
}

/**
 * Selects the mobile timeline step closest to the viewport focal activation point,
 * applying pixel hysteresis so adjacent cards do not oscillate during subtle touch scrolling.
 */
export function pickNearestMobileStepWithHysteresis(
  candidates: readonly MobileStepCandidate[],
  currentActiveId: string,
  hysteresisPx = MOBILE_STEP_HYSTERESIS_PX,
): string | null {
  if (candidates.length === 0) return null;

  let best = candidates[0];
  let currentCandidate: MobileStepCandidate | undefined;

  for (const candidate of candidates) {
    if (candidate.id === currentActiveId) {
      currentCandidate = candidate;
    }
    if (candidate.distance < best.distance) {
      best = candidate;
    }
  }

  if (currentCandidate && best.id !== currentActiveId) {
    if (best.distance + hysteresisPx >= currentCandidate.distance) {
      return currentActiveId;
    }
  }

  return best.id;
}
