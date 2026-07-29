import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('homepage renders title and podcast section', async ({ page }) => {
  await expect(page.locator('.site-title')).toBeVisible();
  await expect(page.locator('#podcasts .section-title')).toHaveText('播客');
});

test('EP01 entry renders cover, title, and show notes', async ({ page }) => {
  const ep = page.locator('#ep01');
  await expect(ep).toBeVisible();
  await expect(ep.locator('.episode-title')).toContainText('AI指向温带雨林');
  await expect(ep.locator('.episode-title .epno')).toHaveText('EP01');

  // Cover image actually loads (naturalWidth > 0)
  const cover = ep.locator('img.cover');
  await expect(cover).toBeVisible();
  const w = await cover.evaluate((img: HTMLImageElement) => img.naturalWidth);
  expect(w).toBeGreaterThan(0);

  // At least a few show-note paragraphs render
  await expect(ep.locator('.notes p').first()).toBeVisible();
  expect(await ep.locator('.notes p').count()).toBeGreaterThan(1);
});

test('audio player points at the episode and loads metadata from the CDN', async ({ page }) => {
  const audio = page.locator('#ep01 audio.player');
  await expect(audio).toHaveAttribute('src', /media\.xyzcdn\.net.*\.m4a/);

  // Force metadata load and confirm a real, finite duration comes back —
  // proves the cross-origin CDN stream is reachable and seekable in WebKit.
  const duration = await audio.evaluate<number, HTMLAudioElement>(
    (el) =>
      new Promise((resolve, reject) => {
        if (el.readyState >= 1) return resolve(el.duration);
        el.addEventListener('loadedmetadata', () => resolve(el.duration), { once: true });
        el.addEventListener('error', () => reject(new Error('audio failed to load')), {
          once: true,
        });
        el.load();
      }),
  );
  expect(Number.isFinite(duration)).toBe(true);
  expect(duration).toBeGreaterThan(60); // longer than a minute
});

test('external link goes to the Xiaoyuzhou episode', async ({ page }) => {
  const link = page.locator('#ep01 .episode-links a');
  await expect(link).toHaveAttribute(
    'href',
    'https://www.xiaoyuzhoufm.com/episode/6a62ccb96356eb2d9be785fa',
  );
  await expect(link).toHaveAttribute('target', '_blank');
});

test('screenshot the built page', async ({ page }) => {
  await page.screenshot({ path: 'test-results/site.png', fullPage: true });
});
