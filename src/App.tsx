import { useEffect, useState } from 'react';
import {
  site,
  episodes,
  neighbours,
  type Episode,
  type Block,
} from './content/episodes';
import { andare } from './content/andare';
import { andarePrivacy } from './content/andare-privacy';
import { useLocale, pick, type Locale } from './locale';

// ── Tiny hash router (GitHub Pages friendly: no server config needed) ──────────
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  // Scroll to top whenever the route changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);
  return hash.replace(/^#\/?/, ''); // '' for home, 'ep01' for a detail route
}

function episodeMeta(ep: Episode, locale: Locale, includeShow = true): string[] {
  const parts = [
    `${pick(locale, 'Host', '主播')} ${pick(locale, ep.hostEn, ep.host)}`,
    ep.date,
    pick(locale, ep.durationEn, ep.duration),
  ];
  if (includeShow) parts.unshift(pick(locale, ep.showEn, ep.show));
  return parts;
}

// Small grey metadata run: parts are kept whole, the "·" never starts a line.
function MetaLine({ parts, className }: { parts: string[]; className: string }) {
  return (
    <p className={className}>
      {parts.map((part, i) => (
        <span className="meta-part" key={i}>
          {part}
        </span>
      ))}
    </p>
  );
}

// ── Home: episode cards holding the content itself (no artwork) ────────────────
function EpisodeCard({ ep }: { ep: Episode }) {
  const { locale } = useLocale();
  return (
    <a className="card" href={`#/${ep.id}`}>
      <h3 className="card-title">
        <span className="epno">{ep.number}</span> {pick(locale, ep.titleEn, ep.title)}
      </h3>
      <MetaLine className="card-sub" parts={episodeMeta(ep, locale)} />
      <p className="card-excerpt">{pick(locale, ep.excerptEn, ep.excerpt)}</p>
    </a>
  );
}

function Home() {
  const { t } = useLocale();
  return (
    <>
      <header className="site-head">
        <div className="site-head-text">
          <h1 className="site-title">{t(site.titleEn, site.title)}</h1>
          <p className="site-intro">{t(site.introEn, site.intro)}</p>
        </div>
        <img
          className="avatar"
          src={site.avatar}
          alt={t('avatar', '头像')}
          width={92}
          height={92}
        />
      </header>
      <div className="site-sub">
        <nav className="site-nav">
          <a href={neighbours[0].href} target="_blank" rel="noreferrer">
            {t(neighbours[0].title, neighbours[0].titleZh)}
          </a>
          <span className="sep"> · </span>
          <a href="#/andare">{t('Andare app', 'Andare 应用')}</a>
        </nav>
        <LangToggle />
      </div>
      <main>
        <section id="podcasts">
          <h2 className="section-title">{t('Podcast', '播客')}</h2>
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} ep={ep} />
          ))}
        </section>
      </main>
    </>
  );
}

// The top row of a non-home page: "back" on the left, language on the right.
function PageTop({ to, label }: { to: string; label: string }) {
  return (
    <div className="page-top">
      <a className="back" href={to}>
        ← {label}
      </a>
      <LangToggle />
    </div>
  );
}

// ── Andare (阳踏) support page ─────────────────────────────────────────────────
function AndarePage() {
  const { isZh, t } = useLocale();
  return (
    <>
      <PageTop to="#/" label={t('Home', '去主页')} />

      <header className="app-head">
        <img
          className="app-icon"
          src={andare.icon}
          alt={`${andare.name} ${t('icon', '图标')}`}
          width={120}
          height={120}
        />
        <div className="app-head-text">
          <h1 className="app-name">
            {andare.name}
            {isZh && <span className="app-name-zh"> {andare.nameZh}</span>}
          </h1>
          <p className="app-tagline">{t(andare.tagline, andare.taglineZh)}</p>
        </div>
      </header>

      <figure className="app-showcase">
        <img
          src={andare.showcase}
          alt={t('Andare screenshot', 'Andare 界面展示')}
          loading="lazy"
        />
      </figure>

      <section className="app-section">
        <h2 className="section-title">{t('About', '关于')}</h2>
        {andare.about.map((p, i) => (
          <p className="body-text" key={i}>
            {t(p, andare.aboutZh[i])}
          </p>
        ))}
      </section>

      <section className="app-section">
        <h2 className="section-title">{t('Support', '支持')}</h2>
        <p className="body-text">
          {t(
            'Questions, feedback or bug reports? Email ',
            '有问题、反馈或 Bug？请发邮件到 ',
          )}
          <a href={`mailto:${andare.supportEmail}`}>{andare.supportEmail}</a>
          {t('.', '。')}
        </p>
        <p className="app-meta">
          {andare.platform} · {t(andare.price, '免费')} ·{' '}
          <a href={andare.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>{' '}
          · <a href="#/andare/privacy">{t('Privacy Policy', '隐私政策')}</a>
        </p>
      </section>
    </>
  );
}

// ── Andare privacy policy page ────────────────────────────────────────────────
function PrivacyPage() {
  const { isZh, t } = useLocale();
  return (
    <>
      <PageTop to="#/andare" label="Andare" />

      <header className="app-head">
        <img
          className="app-icon"
          src={andare.icon}
          alt={`${andare.name} ${t('icon', '图标')}`}
          width={120}
          height={120}
        />
        <div className="app-head-text">
          <h1 className="app-name">
            {andare.name}
            <span className="app-name-zh">
              {isZh ? ` ${andare.nameZh} · 隐私政策` : ' · Privacy Policy'}
            </span>
          </h1>
          <p className="app-tagline">
            {t('Last updated: ', '最近更新：')}
            {andarePrivacy.updated}
          </p>
        </div>
      </header>

      {andarePrivacy.sections.map((s) => (
        <section className="app-section" key={s.title}>
          <h2 className="section-title">{t(s.title, s.titleZh)}</h2>
          {s.body.map((p, j) => (
            <p className="body-text" key={j}>
              {t(p, s.bodyZh[j])}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}

// ── Detail: full episode page — plain text on the background, no card ─────────
function BlockView({ block }: { block: Block }) {
  const { locale, t } = useLocale();
  if (block.type === 'photo') {
    return (
      <figure className="shot">
        <img
          src={block.src}
          alt={pick(locale, block.captionEn ?? block.caption, block.caption)}
          width={1600}
          height={1200}
          loading="lazy"
        />
        <figcaption>
          {pick(locale, block.captionEn ?? block.caption, block.caption)}
        </figcaption>
      </figure>
    );
  }
  if (block.type === 'bilibili') {
    const src =
      `https://player.bilibili.com/player.html?bvid=${block.bvid}` +
      `&page=1&autoplay=0&danmaku=0&high_quality=1&as_wide=1`;
    return (
      <figure className="video-block">
        <div className="video">
          <iframe
            src={src}
            title={t('Bilibili video', 'Bilibili 视频')}
            scrolling="no"
            allowFullScreen
            allow="fullscreen"
          />
        </div>
        <figcaption>
          {block.caption && <p>{pick(locale, block.captionEn ?? block.caption, block.caption)}</p>}
          <a href={block.href} target="_blank" rel="noreferrer">
            {t('Open on Bilibili', '在 Bilibili 打开')} ↗
          </a>
        </figcaption>
      </figure>
    );
  }
  if (block.type === 'link') {
    return (
      <p className="body-link">
        <a href={block.href} target="_blank" rel="noreferrer">
          {pick(locale, block.labelEn ?? block.label, block.label)} ↗
        </a>
      </p>
    );
  }
  return <p className="body-text">{pick(locale, block.textEn ?? block.text, block.text)}</p>;
}

function EpisodePage({ ep }: { ep: Episode }) {
  const { locale, isZh, t } = useLocale();
  return (
    <>
      <PageTop to="#/" label={t('Home', '去主页')} />
      <article className="episode" id={ep.id}>
        <header className="episode-head">
          <img
            className="cover cover-lg"
            src={ep.cover}
            alt={`${ep.number} ${t('cover', '封面')}`}
            width={104}
            height={104}
          />
          <div className="episode-meta">
            <p className="episode-kicker">
              <span className="epno">{ep.number}</span> ·{' '}
              {pick(locale, ep.showEn, ep.show)}
            </p>
            <h1 className="episode-title">{pick(locale, ep.titleEn, ep.title)}</h1>
            <MetaLine
              className="episode-sub"
              parts={episodeMeta(ep, locale, false)}
            />
            <p className="episode-links">
              <a href={ep.xiaoyuzhouUrl} target="_blank" rel="noreferrer">
                {t('Listen on Xiaoyuzhou', '在小宇宙收听')} ↗
              </a>
            </p>
          </div>
        </header>

        <audio className="player" controls preload="metadata" src={ep.audioUrl}>
          {isZh ? (
            <>
              你的浏览器不支持音频播放，请
              <a href={ep.xiaoyuzhouUrl}>在小宇宙收听</a>。
            </>
          ) : (
            <>
              Your browser does not support audio playback.{' '}
              <a href={ep.xiaoyuzhouUrl}>Listen on Xiaoyuzhou</a>.
            </>
          )}
        </audio>

        <div className="notes">
          {ep.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </article>
    </>
  );
}

function LangToggle() {
  const { isZh, toggleLocale, t } = useLocale();
  return (
    <button
      className="lang-toggle"
      onClick={toggleLocale}
      title={t('Switch language', '切换语言')}
      aria-label={t('Switch language', '切换语言')}
    >
      {isZh ? 'English' : '中文'}
    </button>
  );
}

function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="site-foot">
      {site.links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && <span className="sep"> · </span>}
          <a href={l.href} target="_blank" rel="noreferrer">
            {t(l.labelEn, l.label)}
          </a>
        </span>
      ))}
      <span className="sep"> · </span>
      <a href="/feed.xml" type="application/rss+xml">
        RSS
      </a>
    </footer>
  );
}

export default function App() {
  const route = useHashRoute();
  const { isZh, t } = useLocale();

  // Keep the tab title and description in step with the visible language.
  useEffect(() => {
    document.title = t(site.titleEn, site.title);
    document.documentElement.lang = isZh ? 'zh-CN' : 'en';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        t(site.introEn, site.intro),
      );
    }
  }, [isZh, t]);

  let page;
  if (route === 'andare') {
    page = <AndarePage />;
  } else if (route === 'andare/privacy') {
    page = <PrivacyPage />;
  } else {
    const current = episodes.find((ep) => ep.id === route);
    page = current ? <EpisodePage ep={current} /> : <Home />;
  }

  return (
    <div className="wrap">
      {page}
      <SiteFooter />
    </div>
  );
}
