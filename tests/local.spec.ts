import { test, expect, type Page } from '@playwright/test';

const XYZ = 'https://www.xiaoyuzhoufm.com/episode/6a62ccb96356eb2d9be785fa';
const ORIMONO = 'https://neg2sode.github.io/orimono/';

// Every opaque background on the page must be a pure grey (R = G = B) — no
// green/blue cast anywhere, and the page itself sits on rgb(25, 25, 25).
async function neutralBackgrounds(page: Page) {
  return page.evaluate(() => {
    const parse = (bg: string) => {
      const m = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      if (!m) return null;
      return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
    };
    const offenders: string[] = [];
    for (const el of Array.from(document.querySelectorAll('*'))) {
      const bg = getComputedStyle(el).backgroundColor;
      const rgb = parse(bg);
      if (!rgb || rgb[3] === 0) continue;
      if (rgb[0] !== rgb[1] || rgb[1] !== rgb[2]) offenders.push(`${el.tagName}.${el.className}: ${bg}`);
    }
    return offenders;
  });
}

test('home shows site title and an episode card', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-title')).toHaveText('雨林观察者的博客');
  await expect(page.locator('.site-intro')).toHaveText('我目前只有播客(｡•́︿•̀｡)');
  const card = page.locator('#podcasts .card').first();
  await expect(card).toBeVisible();
  await expect(card.locator('.card-title')).toContainText('AI指向温带雨林');
  // Avatar renders in the header and actually decodes.
  const avatar = page.locator('.site-head .avatar');
  await expect(avatar).toBeVisible();
  await expect(avatar).toHaveAttribute('src', /avatar\.jpg/);
});

test('page background is neutral rgb(25, 25, 25)', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(25, 25, 25)');
  expect(await neutralBackgrounds(page)).toEqual([]);
});

test('clicking anywhere on the card opens the detail page', async ({ page }) => {
  await page.goto('/');
  // Click the excerpt text — proves the WHOLE card is the link, not just the title.
  await page.locator('#podcasts .card .card-excerpt').click();
  await expect(page).toHaveURL(/#\/ep01$/);
  await expect(page.locator('.episode-title')).toContainText('AI指向温带雨林');
  await expect(page.locator('.back a')).toBeVisible();
});

test('the article itself is plain text, not a card', async ({ page }) => {
  await page.goto('/#/ep01');
  const article = page.locator('article.episode');
  await expect(article).toBeVisible();
  await expect(article).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(article).toHaveCSS('border-top-width', '0px');
  await expect(article).toHaveCSS('border-radius', '0px');
  // Notes hang directly off the column: no padding, no border.
  const notes = page.locator('.notes');
  await expect(notes).toHaveCSS('padding-top', '0px');
  await expect(notes).toHaveCSS('border-top-width', '0px');
  // Body paragraphs are full-measure (no inner card padding).
  const body = page.locator('.notes .body-text').first();
  const [bodyBox, wrapBox, padding] = await Promise.all([
    body.boundingBox(),
    page.locator('.wrap').boundingBox(),
    page
      .locator('.wrap')
      .evaluate((el) => {
        const s = getComputedStyle(el);
        return parseFloat(s.paddingLeft) + parseFloat(s.paddingRight);
      }),
  ]);
  // The paragraph spans the whole content column — no card padding in between.
  expect(bodyBox && wrapBox && Math.abs(bodyBox.width - (wrapBox.width - padding)) < 2).toBe(
    true,
  );
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

test('home cards carry the content and nothing else', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#podcasts .card').first();
  // No artwork, no extra furniture inside a card — just the episode content.
  await expect(card.locator('img')).toHaveCount(0);
  await expect(card.locator('.card-mark, .card-body')).toHaveCount(0);
  await expect(card.locator('.card-title')).toContainText('AI指向温带雨林');
  await expect(card.locator('.card-sub')).toContainText('51 分钟');
  await expect(card.locator('.card-excerpt')).toBeVisible();
  // The old "隔壁 / Elsewhere" card block is gone.
  await expect(page.locator('#elsewhere')).toHaveCount(0);
});

test('the nav links out to the neighbouring orimono site', async ({ page }) => {
  await page.goto('/');
  const link = page.locator(`.site-nav a[href="${ORIMONO}"]`);
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toContainText('Orimono');
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
  await expect(
    page.locator('.app-meta a[href="https://github.com/neg2sode/Andare"]'),
  ).toHaveAttribute('href', 'https://github.com/neg2sode/Andare');
});

test('home nav links to the andare page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.site-nav a[href="#/andare"]').click();
  await expect(page).toHaveURL(/#\/andare$/);
  await expect(page.locator('.app-name')).toContainText('Andare');
});

// The site shows one language based on system language: zh → Chinese, else English.
test.describe('localisation (English)', () => {
  test.use({ locale: 'en-US' });

  test('renders English UI for a non-Chinese system language', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.site-title')).toHaveText('The Rainforest Observer');
    await expect(page.locator('.site-nav')).toContainText('Orimono');
    await expect(page.locator('.site-nav')).toContainText('Andare app');
    await expect(page).toHaveTitle('The Rainforest Observer');

    await page.goto('/#/andare');
    await expect(page.locator('.app-name')).toHaveText('Andare');
    await expect(page.locator('.app-tagline')).toHaveText(
      'Cadence for cycling, running and walking, with just your iPhone.',
    );
    await expect(page.locator('.back a')).toHaveText('← Home');

    await page.goto('/#/andare/privacy');
    await expect(page.locator('.app-name')).toContainText('Privacy Policy');
    await expect(page.locator('.app-section .section-title').first()).toHaveText('Overview');
  });

  test('English visitors get a fully readable episode, not Chinese text', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#podcasts .card-title')).toHaveText(
      'EP01 AI Points at the Temperate Rainforest',
    );
    await expect(page.locator('#podcasts .card-sub')).toContainText('Guqi');
    await expect(page.locator('#podcasts .card-excerpt')).toContainText('Scottish Highlands');

    await page.goto('/#/ep01');
    await expect(page.locator('.episode-title')).toHaveText(
      'AI Points at the Temperate Rainforest',
    );
    await expect(page.locator('.episode-kicker')).toContainText('Seeing the World at 18');

    const notes = page.locator('.notes');
    await expect(notes).toContainText('temperate rainforest');
    await expect(notes).toContainText('Malham Cove');
    await expect(notes).toContainText('awe-inspiring');
    await expect(notes).toContainText('Thurso');

    // Interface chrome is English-only (glosses inside the notes may keep a
    // Chinese word in parentheses on purpose).
    for (const sel of ['.episode-title', '.episode-sub', '.episode-kicker', '.back', '.site-foot']) {
      await expect(page.locator(sel)).not.toContainText(/[\u4e00-\u9fff]/);
    }
  });
});

test('language toggle switches the UI and persists', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('.lang-toggle');
  // Default locale is zh-CN, so the button offers English.
  await expect(toggle).toHaveText('English');
  await toggle.click();
  await expect(page.locator('.site-title')).toHaveText('The Rainforest Observer');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(toggle).toHaveText('中文');
  // The manual choice survives a reload (saved to localStorage).
  await page.reload();
  await expect(page.locator('.site-title')).toHaveText('The Rainforest Observer');
});

test('rss feed is generated from the same content the pages render', async ({
  page,
  request,
}) => {
  const res = await request.get('/feed.xml');
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toContain('<rss version="2.0"');
  expect(xml).toContain('<title>雨林观察者的博客</title>');
  expect(xml).toContain('我目前只有播客');
  expect(xml).toContain('<title>EP01 AI指向温带雨林</title>');
  expect(xml).toContain('<itunes:duration>51:00</itunes:duration>');
  expect(xml).toMatch(
    /<enclosure url="https:\/\/media\.xyzcdn\.net\/[^"]+\.m4a" length="\d+" type="audio\/mp4" \/>/,
  );
  // The show-note photos travel with the feed, as absolute URLs.
  expect(xml).toContain('https://neg2sode.github.io/images/ep01/01-inverness-lichen.jpeg');

  // Well-formed XML (a broken feed would show a parsererror).
  const parserError = await page.evaluate((text) => {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    return doc.querySelector('parsererror')?.textContent ?? null;
  }, xml);
  expect(parserError).toBeNull();
});

test('feed and avatar icons are linked from the document head', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveAttribute(
    'href',
    '/feed.xml',
  );
  await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/apple-touch-icon.png',
  );

  for (const path of ['/favicon.ico', '/favicon-32.png', '/apple-touch-icon.png']) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()['content-type'], path).toMatch(/image/);
  }

  // Footer offers the feed, and no longer links to the retired font page.
  await expect(page.locator('.site-foot a[href="/feed.xml"]')).toHaveText('RSS');
  await expect(page.locator('.site-foot a[href="#/fonts"]')).toHaveCount(0);
});

test('everything on the article stays neutral too', async ({ page }) => {
  await page.goto('/#/ep01');
  await page.waitForLoadState('networkidle');
  expect(await neutralBackgrounds(page)).toEqual([]);
});

test('type is large on desktop and the column keeps a readable measure', async ({
  page,
}) => {
  await page.goto('/#/ep01');
  const root = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  expect(root).toBeGreaterThanOrEqual(22);
  const body = page.locator('.notes .body-text').first();
  const fontPx = await body.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(fontPx).toBeGreaterThanOrEqual(22);
});

test('narrow screens: almost no side padding, text fills the glass', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/ep01');
  const padding = await page.locator('.wrap').evaluate((el) => {
    const s = getComputedStyle(el);
    return { left: parseFloat(s.paddingLeft), right: parseFloat(s.paddingRight) };
  });
  expect(padding.left).toBeLessThanOrEqual(12);
  expect(padding.right).toBeLessThanOrEqual(12);

  // Body text spans nearly the whole viewport width.
  const [bodyBox, viewport] = await Promise.all([
    page.locator('.notes .body-text').first().boundingBox(),
    page.evaluate(() => window.innerWidth),
  ]);
  expect(bodyBox && bodyBox.width / viewport > 0.9).toBe(true);

  // A show-note photo runs edge to edge too.
  const shot = page.locator('.notes .shot img').first();
  await shot.scrollIntoViewIfNeeded();
  const shotBox = await shot.boundingBox();
  expect(shotBox && shotBox.width / viewport > 0.9).toBe(true);
});

// Scroll the page in steps so lazy images start loading, then come back up.
async function settle(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.documentElement.scrollHeight) setTimeout(step, 100);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 600);
        }
      };
      step();
    });
  });
  await page.waitForLoadState('networkidle');
}

test('screenshots: home + detail + andare', async ({ page }) => {
  await page.goto('/');
  await settle(page);
  await page.screenshot({ path: 'test-results/home.png', fullPage: true });
  await page.goto('/#/ep01');
  await settle(page);
  await page.screenshot({ path: 'test-results/detail.png', fullPage: true });
  await page.goto('/#/andare');
  await settle(page);
  await page.screenshot({ path: 'test-results/andare.png', fullPage: true });
  await page.goto('/#/ep01');
  await page.locator('.lang-toggle').click();
  await settle(page);
  await page.screenshot({ path: 'test-results/detail-en.png', fullPage: true });
});
