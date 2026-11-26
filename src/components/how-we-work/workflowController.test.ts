/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  LEFT_COLUMN_SERVICES,
  ORBIT_SERVICES,
  PROCESS_SERVICES,
  RIGHT_COLUMN_SERVICES,
} from '../../data/process.ts';
import {
  computeScrollStepWithHysteresis,
  pickNearestMobileStepWithHysteresis,
  resolveWorkflowDisplayState,
} from './workflowController.ts';

describe('PROCESS_SERVICES workflow structure invariants', () => {
  it('maintains sequential steps 01 through 12 with 6 orbit and 6 column cards', () => {
    assert.equal(PROCESS_SERVICES.length, 12);
    PROCESS_SERVICES.forEach((service, idx) => {
      assert.equal(service.stepNumber, String(idx + 1).padStart(2, '0'));
    });
    assert.equal(ORBIT_SERVICES.length, 6);
    assert.equal(LEFT_COLUMN_SERVICES.length, 3);
    assert.equal(RIGHT_COLUMN_SERVICES.length, 3);
  });
});

describe('computeScrollStepWithHysteresis', () => {
  it('activates steps 01..12 sequentially across slow forward scroll progression', () => {
    let activeIndex = 0;
    const seen = new Set<number>([activeIndex]);

    for (let i = 0; i <= 200; i += 1) {
      const progress = i / 200;
      activeIndex = computeScrollStepWithHysteresis(progress, activeIndex, 12);
      seen.add(activeIndex);
    }

    assert.equal(activeIndex, 11);
    assert.equal(seen.size, 12);
  });

  it('prevents ping-pong flickering when subpixel scroll oscillates near boundary k/12', () => {
    // Boundary between step 3 (index 2) and step 4 (index 3) sits at 3/12 = 0.25.
    let activeIndex = 2;

    // Cross clearly past forward hysteresis (0.25 + 0.015 = 0.265)
    activeIndex = computeScrollStepWithHysteresis(0.27, activeIndex, 12);
    assert.equal(activeIndex, 3);

    // Subpixel jitter back across 0.25 to 0.242 (still above backward threshold 0.235) MUST NOT revert
    activeIndex = computeScrollStepWithHysteresis(0.249, activeIndex, 12);
    assert.equal(activeIndex, 3);
    activeIndex = computeScrollStepWithHysteresis(0.242, activeIndex, 12);
    assert.equal(activeIndex, 3);

    // Moving past backward hysteresis (<= 0.235) cleanly transitions back to index 2
    activeIndex = computeScrollStepWithHysteresis(0.233, activeIndex, 12);
    assert.equal(activeIndex, 2);
  });

  it('reverses smoothly upward through steps and settles at Step 01 at top', () => {
    let activeIndex = 11;
    const visited: number[] = [activeIndex];

    for (let i = 200; i >= 0; i -= 1) {
      const progress = i / 200;
      const next = computeScrollStepWithHysteresis(progress, activeIndex, 12);
      if (next !== activeIndex) {
        assert.ok(next < activeIndex, 'upward scroll must move monotonically backward');
        activeIndex = next;
        visited.push(activeIndex);
      }
    }

    assert.equal(activeIndex, 0);
    assert.equal(visited.length, 12);
  });

  it('jumps cleanly on rapid scroll without queuing intermediate steps', () => {
    const fastDown = computeScrollStepWithHysteresis(0.88, 0, 12);
    assert.equal(fastDown, 10);

    const fastUp = computeScrollStepWithHysteresis(0.05, 11, 12);
    assert.equal(fastUp, 0);
  });

  it('clamps out-of-range scroll progress safely', () => {
    assert.equal(computeScrollStepWithHysteresis(-0.25, 4, 12), 0);
    assert.equal(computeScrollStepWithHysteresis(1.4, 2, 12), 11);
  });
});

describe('resolveWorkflowDisplayState precedence & completion', () => {
  it('prioritizes hover over focus over scrollActiveIndex and restores cleanly on clear', () => {
    const hovered = resolveWorkflowDisplayState({
      scrollActiveIndex: 2,
      hoveredServiceId: 'vendor-management', // index 7
      focusedServiceId: 'property-marketing', // index 2
      services: PROCESS_SERVICES,
    });
    assert.equal(hovered.displayedIndex, 7);
    assert.equal(hovered.activeService.stepNumber, '08');
    assert.equal(hovered.activePhaseId, 'phase-03');
    assert.equal(hovered.isPreviewActive, true);
    assert.equal(hovered.isJourneyComplete, false);

    // Clearing hover (e.g. when wheel scroll suppresses stationary pointer) drops cleanly to focus/scroll
    const unhoveredWithFocus = resolveWorkflowDisplayState({
      scrollActiveIndex: 4,
      hoveredServiceId: null,
      focusedServiceId: 'property-marketing',
      services: PROCESS_SERVICES,
    });
    assert.equal(unhoveredWithFocus.displayedIndex, 2);
    assert.equal(unhoveredWithFocus.isPreviewActive, true);

    const pureScroll = resolveWorkflowDisplayState({
      scrollActiveIndex: 4,
      hoveredServiceId: null,
      focusedServiceId: null,
      services: PROCESS_SERVICES,
    });
    assert.equal(pureScroll.displayedIndex, 4);
    assert.equal(pureScroll.activeService.stepNumber, '05');
    assert.equal(pureScroll.isPreviewActive, false);
  });

  it('marks journey complete only when scroll reaches Step 12', () => {
    const beforeEnd = resolveWorkflowDisplayState({
      scrollActiveIndex: 10,
      hoveredServiceId: 'long-term-service',
      focusedServiceId: null,
      services: PROCESS_SERVICES,
    });
    assert.equal(beforeEnd.isJourneyComplete, false);

    const atEnd = resolveWorkflowDisplayState({
      scrollActiveIndex: 11,
      hoveredServiceId: null,
      focusedServiceId: null,
      services: PROCESS_SERVICES,
    });
    assert.equal(atEnd.isJourneyComplete, true);
    assert.equal(atEnd.activeService.stepNumber, '12');
    assert.equal(atEnd.activePhaseId, 'phase-04');
  });
});

describe('pickNearestMobileStepWithHysteresis', () => {
  it('holds active step within 28px deadband and switches once surpassed', () => {
    const insideDeadband = pickNearestMobileStepWithHysteresis(
      [
        { id: 'application-signing', distance: 90 },
        { id: 'annexure-key-takeover', distance: 72 },
      ],
      'application-signing',
      28,
    );
    assert.equal(insideDeadband, 'application-signing');

    const outsideDeadband = pickNearestMobileStepWithHysteresis(
      [
        { id: 'application-signing', distance: 90 },
        { id: 'annexure-key-takeover', distance: 55 },
      ],
      'application-signing',
      28,
    );
    assert.equal(outsideDeadband, 'annexure-key-takeover');
  });

  it('returns null when no candidates exist', () => {
    assert.equal(pickNearestMobileStepWithHysteresis([], 'application-signing'), null);
  });
});
