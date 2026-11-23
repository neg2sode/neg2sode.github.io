// ─────────────────────────────────────────────────────────────────────────────
//  Build the RSS feed (public/feed.xml) from the same content the site renders.
//
//  The episode data lives in src/content/episodes.ts. Instead of duplicating it
//  here, this script asks Vite to load that module (SSR transform), so the feed
//  can never drift from the pages.
//
//  Runs before `npm run dev` and `npm run build`; the output is gitignored.
// ─────────────────────────────────────────────────────────────────────────────
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://neg2sode.github.io';
const OUT = resolve(ROOT, 'public/feed.xml');

const xml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const absolute = (path) => (/^https?:\/\//.test(path) ? path : SITE + path);

const rfc822 = (date) => new Date(`${date}T00:00:00Z`).toUTCString();

// "51 分钟" / "51 min" → 3060 → "51:00"
function durationToClock(duration) {
  const minutes = Number(String(duration).match(/\d+/)?.[0] ?? 0);
  const total = minutes * 60;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

// Ask the CDN how big the audio file is (podcatchers like a real length).
async function audioByteLength(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
    const length = Number(res.headers.get('content-length'));
    return Number.isFinite(length) && length > 0 ? length : 0;
  } catch {
    return 0;
  }
}

// Show-note blocks → plain HTML for content:encoded.
function blockToHtml(block) {
  if (block.type === 'text') {
    return `<p>${xml(block.text).replace(/\n/g, '<br />')}</p>`;
  }
  if (block.type === 'photo') {
    return (
      `<figure><img src="${absolute(block.src)}" alt="${xml(block.caption)}" />` +
      `<figcaption>${xml(block.caption)}</figcaption></figure>`
    );
  }
  if (block.type === 'bilibili') {
    const figcaption = block.caption
      ? `<figcaption>${xml(block.caption)}</figcaption>`
      : '';
    return `<figure><a href="${block.href}">在 Bilibili 观看视频</a>${figcaption}</figure>`;
  }
  if (block.type === 'link') {
    return `<p><a href="${block.href}">${xml(block.label)}</a></p>`;
  }
  return '';
}

async function loadContent() {
  const server = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  });
  try {
    return await server.ssrLoadModule('/src/content/episodes.ts');
  } finally {
    await server.close();
  }
}

const { site, episodes } = await loadContent();

const items = [];
for (const ep of episodes) {
  const length = await audioByteLength(ep.audioUrl);
  const body = ep.body.map(blockToHtml).join('\n      ');
  items.push(
    `    <item>
      <title>${xml(`${ep.number} ${ep.title}`)}</title>
      <link>${SITE}/#/${ep.id}</link>
      <guid isPermaLink="false">${xml(ep.id)}</guid>
      <pubDate>${rfc822(ep.date)}</pubDate>
      <description>${xml(ep.excerpt)}</description>
      <content:encoded><![CDATA[
      ${body}
      ]]></content:encoded>
      <enclosure url="${xml(absolute(ep.audioUrl))}" length="${length}" type="audio/mp4" />
      <itunes:title>${xml(ep.title)}</itunes:title>
      <itunes:author>${xml(ep.host)}</itunes:author>
      <itunes:duration>${durationToClock(ep.duration)}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
      <itunes:image href="${xml(absolute(ep.cover))}" />
    </item>`,
  );
}

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.title)}</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${xml(site.intro)}</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>${xml(episodes[0]?.host ?? site.title)}</itunes:author>
    <itunes:summary>${xml(site.intro)}</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${xml(absolute(site.avatar))}" />
    <image>
      <url>${xml(absolute(site.avatar))}</url>
      <title>${xml(site.title)}</title>
      <link>${SITE}/</link>
    </image>
${items.join('\n')}
  </channel>
</rss>
`;

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, feed, 'utf8');
console.log(`feed.xml written — ${episodes.length} episode(s), ${feed.length} bytes`);
