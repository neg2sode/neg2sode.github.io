import { useEffect, useState } from 'react';
import { site, episodes, type Episode, type Block } from './content/episodes';

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
        <h1 className="site-title">{site.title}</h1>
        <p className="site-intro">{site.intro}</p>
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

export default function App() {
  const route = useHashRoute();
  const current = episodes.find((ep) => ep.id === route);

  return (
    <div className="wrap">
      {current ? <EpisodePage ep={current} /> : <Home />}

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
    </div>
  );
}
