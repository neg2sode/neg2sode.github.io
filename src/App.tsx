import { site, episodes, type Episode } from './content/episodes';

function EpisodeEntry({ ep }: { ep: Episode }) {
  return (
    <article className="episode" id={ep.id}>
      <div className="episode-head">
        <img className="cover" src={ep.cover} alt={`${ep.number} 封面`} width={96} height={96} />
        <div className="episode-meta">
          <h3 className="episode-title">
            <span className="epno">{ep.number}</span> {ep.title}
          </h3>
          <p className="episode-sub">
            {ep.show} · 主播 {ep.host} · {ep.date} · {ep.duration}
          </p>
          <p className="episode-links">
            <a href={ep.xiaoyuzhouUrl} target="_blank" rel="noreferrer">
              在小宇宙收听 ↗
            </a>
          </p>
        </div>
      </div>

      <audio className="player" controls preload="metadata" src={ep.audioUrl}>
        你的浏览器不支持音频播放，请<a href={ep.xiaoyuzhouUrl}>在小宇宙收听</a>。
      </audio>

      <div className="notes">
        {ep.showNotes.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {ep.photos.length > 0 && (
        <div className="gallery">
          {ep.photos.map((photo) => (
            <figure key={photo.src} className="shot">
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}

export default function App() {
  return (
    <div className="wrap">
      <header className="site-head">
        <h1 className="site-title">{site.title}</h1>
        <p className="site-intro">{site.intro}</p>
        <nav className="site-nav">
          <a href="#podcasts">播客</a>
        </nav>
      </header>

      <main>
        <section id="podcasts">
          <h2 className="section-title">播客</h2>
          {episodes.map((ep) => (
            <EpisodeEntry key={ep.id} ep={ep} />
          ))}
        </section>
      </main>

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
