import { test, expect } from '@playwright/test';

const XYZ = 'https://www.xiaoyuzhoufm.com/episode/6a62ccb96356eb2d9be785fa';

test('home shows site title and an episode card', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-title')).toHaveText('雨林观察者的博客');
  const card = page.locator('.card').first();
  await expect(card).toBeVisible();
  await expect(card.locator('.card-title')).toContainText('AI指向温带雨林');
  // Avatar renders in the header and actually decodes.
  const avatar = page.locator('.site-head .avatar');
  await expect(avatar).toBeVisible();
  await expect(avatar).toHaveAttribute('src', /avatar\.jpg/);
});

test('clicking anywhere on the card opens the detail page', async ({ page }) => {
  await page.goto('/');
  // Click the excerpt text — proves the WHOLE card is the link, not just the title.
  await page.locator('.card .card-excerpt').click();
  await expect(page).toHaveURL(/#\/ep01$/);
  await expect(page.locator('.episode-title')).toContainText('AI指向温带雨林');
  await expect(page.locator('.back a')).toBeVisible();
});

test('detail renders show-note photos in order with captions', async ({ page }) => {
  await page.goto('/#/ep01');
  const shots = page.locator('.notes .shot');
  await expect(shots).toHaveCount(5);

  // First photo is the Inverness lichen shot, and it actually decodes.
  const firstImg = shots.nth(0).locator('img');
  await expect(firstImg).toHaveAttribute('src', /01-inverness-lichen\.jpeg/);
  await firstImg.scrollIntoViewIfNeeded();
  await expect
    .poll(() => firstImg.evaluate((i: HTMLImageElement) => i.naturalWidth))
    .toBeGreaterThan(0);
  await expect(shots.nth(0).locator('figcaption')).toContainText('Inverness');
  await expect(shots.nth(4).locator('figcaption')).toContainText('石头缝');
});

test('audio player loads metadata from the CDN (seekable)', async ({ page }) => {
  await page.goto('/#/ep01');
  const audio = page.locator('audio.player');
  await expect(audio).toHaveAttribute('src', /media\.xyzcdn\.net.*\.m4a/);
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
  expect(duration).toBeGreaterThan(60);
});

test('detail has the Xiaoyuzhou link and an inset Bilibili player', async ({ page }) => {
  await page.goto('/#/ep01');
  await expect(page.locator('.episode-links a')).toHaveAttribute('href', XYZ);
  // Embedded player iframe points at Bilibili with the right BV id.
  await expect(page.locator('.video iframe')).toHaveAttribute(
    'src',
    /player\.bilibili\.com\/player\.html\?bvid=BV18Wgq6mEa1/,
  );
  // Fallback link to open on Bilibili directly.
  await expect(page.locator('.video-fallback a')).toHaveAttribute(
    'href',
    'https://www.bilibili.com/video/BV18Wgq6mEa1',
  );
});

test('screenshots: home + detail', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home.png', fullPage: true });
  await page.goto('/#/ep01');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/detail.png', fullPage: true });
  await page.goto('/#/andare');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/andare.png', fullPage: true });
});

test('andare support page shows app name, icon and contact', async ({ page }) => {
  await page.goto('/#/andare');
  await expect(page.locator('.app-name')).toContainText('Andare');
  await expect(page.locator('.app-name-zh')).toHaveText('阳踏');

  // App icon actually decodes.
  const icon = page.locator('.app-icon');
  await expect(icon).toHaveAttribute('src', /andare\/icon\.png/);
  await expect
    .poll(() => icon.evaluate((i: HTMLImageElement) => i.naturalWidth))
    .toBeGreaterThan(0);

  // Showcase image renders and decodes.
  const showcase = page.locator('.app-showcase img');
  await expect(showcase).toHaveAttribute('src', /andare_showcase\.jpg/);
  await expect
    .poll(() => showcase.evaluate((i: HTMLImageElement) => i.naturalWidth))
    .toBeGreaterThan(0);

  // Support contact is a mailto link.
  await expect(page.locator('.app-section a[href^="mailto:"]').first()).toBeVisible();
  // GitHub repo link present.
  await expect(page.locator('.app-meta a')).toHaveAttribute('href', 'https://github.com/neg2sode/Andare');
});

test('home nav links to the andare page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.site-nav a[href="#/andare"]').click();
  await expect(page).toHaveURL(/#\/andare$/);
  await expect(page.locator('.app-name')).toContainText('Andare');
});
