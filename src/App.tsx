import { useEffect, useState } from 'react';
import { site, episodes, type Episode, type Block } from './content/episodes';
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

function meta(ep: Episode, locale: Locale) {
  return `${ep.show} · ${pick(locale, 'Host', '主播')} ${ep.host} · ${ep.date} · ${pick(
    locale,
    ep.durationEn,
    ep.duration,
  )}`;
}

// ── Home: list of clickable episode cards ──────────────────────────────────────
function EpisodeCard({ ep }: { ep: Episode }) {
  const { locale, t } = useLocale();
  return (
    <a className="card" href={`#/${ep.id}`}>
      <img
        className="cover"
        src={ep.cover}
        alt={`${ep.number} ${t('cover', '封面')}`}
        width={72}
        height={72}
      />
      <div className="card-body">
        <h3 className="card-title">
          <span className="epno">{ep.number}</span> {ep.title}
        </h3>
        <p className="card-sub">{meta(ep, locale)}</p>
        <p className="card-excerpt">{ep.excerpt}</p>
      </div>
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
          <nav className="site-nav">
            <a href="#/">{t('Podcast', '播客')}</a>
            <span className="sep"> · </span>
            <a href="#/andare">{t('Andare app', 'Andare 应用')}</a>
          </nav>
        </div>
        <img
          className="avatar"
          src={site.avatar}
          alt={t('avatar', '头像')}
          width={84}
          height={84}
        />
      </header>
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

// ── Andare (阳踏) support page ─────────────────────────────────────────────────
function AndarePage() {
  const { isZh, t } = useLocale();
  return (
    <>
      <p className="back">
        <a href="#/">← {t('Home', '去主页')}</a>
      </p>

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
          {andare.platform} · {andare.price} ·{' '}
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
      <p className="back">
        <a href="#/andare">← Andare</a>
      </p>

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

// ── Detail: full episode page ──────────────────────────────────────────────────
function BlockView({ block }: { block: Block }) {
  const { t } = useLocale();
  if (block.type === 'photo') {
    return (
      <figure className="shot">
        <img src={block.src} alt={block.caption} loading="lazy" />
        <figcaption>{block.caption}</figcaption>
      </figure>
    );
  }
  if (block.type === 'bilibili') {
    const src =
      `https://player.bilibili.com/player.html?bvid=${block.bvid}` +
      `&page=1&autoplay=0&danmaku=0&high_quality=1&as_wide=1`;
    return (
      <>
        <div className="video">
          <iframe
            src={src}
            title={t('Bilibili video', 'Bilibili 视频')}
            scrolling="no"
            allowFullScreen
            allow="fullscreen"
          />
        </div>
        <p className="video-fallback">
          <a href={block.href} target="_blank" rel="noreferrer">
            {t('Open on Bilibili', '在 Bilibili 打开')} ↗
          </a>
        </p>
      </>
    );
  }
  if (block.type === 'link') {
    return (
      <p className="body-link">
        <a href={block.href} target="_blank" rel="noreferrer">
          {block.label} ↗
        </a>
      </p>
    );
  }
  return <p className="body-text">{block.text}</p>;
}

function EpisodePage({ ep }: { ep: Episode }) {
  const { locale, isZh, t } = useLocale();
  return (
    <>
      <p className="back">
        <a href="#/">← {t('Home', '去主页')}</a>
      </p>
      <article className="episode" id={ep.id}>
        <div className="episode-head">
          <img
            className="cover cover-lg"
            src={ep.cover}
            alt={`${ep.number} ${t('cover', '封面')}`}
            width={112}
            height={112}
          />
          <div className="episode-meta">
            <h1 className="episode-title">
              <span className="epno">{ep.number}</span> {ep.title}
            </h1>
            <p className="episode-sub">{meta(ep, locale)}</p>
            <p className="episode-links">
              <a href={ep.xiaoyuzhouUrl} target="_blank" rel="noreferrer">
                {t('Listen on Xiaoyuzhou', '在小宇宙收听')} ↗
              </a>
            </p>
          </div>
        </div>

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
    </footer>
  );
}

export default function App() {
  const route = useHashRoute();

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
    <>
      <LangToggle />
      <div className="wrap">
        {page}
        <SiteFooter />
      </div>
    </>
  );
}
