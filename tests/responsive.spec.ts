import { expect, test, type Page } from '@playwright/test';

const widths = [320, 360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1920, 2560];
const routes = [
  '/',
  '/about',
  '/services',
  '/nri-property-management',
  '/how-it-works',
  '/projects',
  '/pricing',
  '/insights',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
];

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  return errors;
}

test('official social destinations use the centralized verified URLs', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

  const expected = [
    'https://www.instagram.com/officialasv/',
    'https://www.facebook.com/officialASV',
    'https://www.youtube.com/channel/UCAeG716AYl4M5QXXxsXWa2w',
    'https://twitter.com/officialASVprop',
    'https://api.whatsapp.com/send?phone=917411001523',
    'https://in.linkedin.com/company/asv-property-management',
    'https://linktr.ee/officalasv',
  ];

  for (const href of expected) {
    await expect(page.getByRole('contentinfo').locator(`a[href="${href}"]:visible`).first()).toBeVisible();
  }
});

test('workflow preserves all activities, supports panning, tabs and fullscreen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const section = page.locator('#how-we-work');
  await section.scrollIntoViewIfNeeded();

  await expect(section.getByText('Swipe to explore the complete property management workflow.')).toBeVisible();
  await expect(section.getByRole('tab')).toHaveCount(4);

  const activityNames = [
    'Application Signing',
    'Property Marketing',
    'Tenant Screening',
    'Property Handover',
    'Quarterly Inspection',
    'Exit / Renewal',
    'Long-Term Service',
    'Monthly Report System',
    'Tenancy Management',
    'Annexure & Key Takeover',
    'Vendor Management',
    'Agreement Process',
  ];
  for (const name of activityNames) {
    await expect(section.getByText(name, { exact: true }).last()).toBeAttached();
  }

  const canvas = section.locator('.workflow-canvas-scroll').first();
  const initialLeft = await canvas.evaluate((element) => element.scrollLeft);
  expect(initialLeft).toBeGreaterThan(200);
  await section.getByRole('button', { name: 'Pan workflow right' }).click();
  await expect.poll(() => canvas.evaluate((element) => element.scrollLeft)).toBeGreaterThan(initialLeft);

  const agreementCard = section.getByRole('button', { name: /Agreement Process/ }).last();
  await agreementCard.scrollIntoViewIfNeeded();
  await expect(agreementCard).toBeVisible();
  await agreementCard.focus();
  await page.keyboard.press('Enter');
  await expect(agreementCard).toHaveAttribute('aria-pressed', 'true');

  const longTermCard = section.getByRole('button', { name: /Long-Term Service/ }).last();
  await longTermCard.scrollIntoViewIfNeeded();
  await expect(longTermCard).toBeVisible();

  await section.getByRole('tab', { name: /Ongoing Property Management/ }).click();
  await expect(section.getByRole('tab', { name: /Ongoing Property Management/ })).toHaveAttribute('aria-selected', 'true');

  await section.getByRole('button', { name: 'Fullscreen Workflow' }).click();
  const dialog = page.getByRole('dialog', { name: 'Fullscreen property management workflow' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Zoom in' }).click();
  await expect(dialog.getByText(/zoom 110%/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Reset workflow view' }).click();
  await dialog.getByRole('button', { name: 'Close fullscreen workflow' }).click();
  await expect(dialog).toBeHidden();
  await expect(section.getByRole('button', { name: 'Fullscreen Workflow' })).toBeFocused();
});

test('home is free of page-level horizontal overflow at every target width', async ({ page }) => {
  const errors = collectPageErrors(page);
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
  expect(errors).toEqual([]);
});

test('all routes render without console errors or overflow on mobile, tablet and desktop', async ({ page }) => {
  const errors = collectPageErrors(page);
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} overflows at ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  }
  expect(errors).toEqual([]);
});

test('mobile navigation closes with Escape and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
  await menuButton.click();
  const menu = page.getByRole('dialog', { name: 'Mobile Navigation' });
  await expect(menu).toBeVisible();
  await expect(menu.getByText('Follow ASV')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test('consultation form and API reject incomplete submissions safely', async ({ page, request }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Request a Free Consultation' }).click();
  await expect(page.getByText('Please enter your full name.')).toBeVisible();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  await expect(page.getByText('Please agree to the privacy consent to submit your enquiry.')).toBeVisible();

  const response = await request.post('/api/consultations', { data: {} });
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.ok).toBe(false);
  expect(body.error).toBeTruthy();
});

test('reduced motion is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const duration = await page.evaluate(() => {
    const element = document.querySelector('.btn-press');
    return element ? getComputedStyle(element).transitionDuration : '';
  });
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

test('capture requested responsive and workflow screenshots', async ({ page }) => {
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto('/');
    await page.screenshot({
      path: `qa-artifacts/screenshots/home-${width}.png`,
      fullPage: true,
      animations: 'disabled',
    });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('#how-we-work').screenshot({
    path: 'qa-artifacts/screenshots/workflow-desktop-1440.png',
    animations: 'disabled',
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const section = page.locator('#how-we-work');
  await section.scrollIntoViewIfNeeded();
  await section.screenshot({
    path: 'qa-artifacts/screenshots/workflow-mobile-390.png',
    animations: 'disabled',
  });
  await section.getByRole('button', { name: 'Fullscreen Workflow' }).click();
  await page.getByRole('dialog', { name: 'Fullscreen property management workflow' }).screenshot({
    path: 'qa-artifacts/screenshots/workflow-fullscreen-390.png',
    animations: 'disabled',
  });
});
