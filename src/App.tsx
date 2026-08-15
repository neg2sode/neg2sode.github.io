import { useEffect, useState } from 'react';
import { site, episodes, type Episode, type Block } from './content/episodes';
import { andare } from './content/andare';

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

function meta(ep: Episode) {
  return `${ep.show} · 主播 ${ep.host} · ${ep.date} · ${ep.duration}`;
}

// ── Home: list of clickable episode cards ──────────────────────────────────────
function EpisodeCard({ ep }: { ep: Episode }) {
  return (
    <a className="card" href={`#/${ep.id}`}>
      <img
        className="cover"
        src={ep.cover}
        alt={`${ep.number} 封面`}
        width={72}
        height={72}
      />
      <div className="card-body">
        <h3 className="card-title">
          <span className="epno">{ep.number}</span> {ep.title}
        </h3>
        <p className="card-sub">{meta(ep)}</p>
        <p className="card-excerpt">{ep.excerpt}</p>
      </div>
    </a>
  );
}

function Home() {
  return (
    <>
      <header className="site-head">
        <div className="site-head-text">
          <h1 className="site-title">{site.title}</h1>
          <p className="site-intro">{site.intro}</p>
          <nav className="site-nav">
            <a href="#/">播客</a>
            <span className="sep"> · </span>
            <a href="#/andare">Andare 应用</a>
          </nav>
        </div>
        <img className="avatar" src={site.avatar} alt="头像" width={84} height={84} />
      </header>
      <main>
        <section id="podcasts">
          <h2 className="section-title">播客</h2>
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
  return (
    <>
      <p className="back">
        <a href="#/">← 返回</a>
      </p>

      <header className="app-head">
        <img
          className="app-icon"
          src={andare.icon}
          alt={`${andare.name} 图标`}
          width={120}
          height={120}
        />
        <div className="app-head-text">
          <h1 className="app-name">
            {andare.name} <span className="app-name-zh">{andare.nameZh}</span>
          </h1>
          <p className="app-tagline">{andare.tagline}</p>
          <p className="app-tagline-zh">{andare.taglineZh}</p>
        </div>
      </header>

      <figure className="app-showcase">
        <img src={andare.showcase} alt="Andare 界面展示" loading="lazy" />
      </figure>

      <section className="app-section">
        <h2 className="section-title">关于 · About</h2>
        {andare.about.map((p, i) => (
          <div className="app-block" key={i}>
            <p className="body-text">{p}</p>
            <p className="app-zh">{andare.aboutZh[i]}</p>
          </div>
        ))}
      </section>

      <section className="app-section">
        <h2 className="section-title">功能 · Features</h2>
        <ul className="feature-list">
          {andare.features.map((f) => (
            <li className="feature" key={f.title}>
              <div className="feature-title">
                {f.title} <span className="app-zh">{f.titleZh}</span>
              </div>
              <p className="feature-body">{f.body}</p>
              <p className="app-zh">{f.bodyZh}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="app-section">
        <h2 className="section-title">支持 · Support</h2>
        <p className="body-text">
          Questions, feedback or bug reports? Email{' '}
          <a href={`mailto:${andare.supportEmail}`}>{andare.supportEmail}</a>.
        </p>
        <p className="app-zh">
          有问题、反馈或 Bug？请发邮件到{' '}
          <a href={`mailto:${andare.supportEmail}`}>{andare.supportEmail}</a>。
        </p>
        <p className="app-meta">
          {andare.platform} · {andare.price} ·{' '}
          <a href={andare.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </p>
      </section>
    </>
  );
}

// ── Detail: full episode page ──────────────────────────────────────────────────
function BlockView({ block }: { block: Block }) {
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
            title="Bilibili 视频"
            scrolling="no"
            allowFullScreen
            allow="fullscreen"
          />
        </div>
        <p className="video-fallback">
          <a href={block.href} target="_blank" rel="noreferrer">
            在 Bilibili 打开 ↗
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
  return (
    <>
      <p className="back">
        <a href="#/">← 返回</a>
      </p>
      <article className="episode" id={ep.id}>
        <div className="episode-head">
          <img
            className="cover cover-lg"
            src={ep.cover}
            alt={`${ep.number} 封面`}
            width={112}
            height={112}
          />
          <div className="episode-meta">
            <h1 className="episode-title">
              <span className="epno">{ep.number}</span> {ep.title}
            </h1>
            <p className="episode-sub">{meta(ep)}</p>
            <p className="episode-links">
              <a href={ep.xiaoyuzhouUrl} target="_blank" rel="noreferrer">
                在小宇宙收听 ↗
              </a>
            </p>
          </div>
        </div>

        <audio className="player" controls preload="metadata" src={ep.audioUrl}>
          你的浏览器不支持音频播放，请
          <a href={ep.xiaoyuzhouUrl}>在小宇宙收听</a>。
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

function SiteFooter() {
  return (
    <footer className="site-foot">
      {site.links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && <span className="sep"> · </span>}
          <a href={l.href} target="_blank" rel="noreferrer">
            {l.label}
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
