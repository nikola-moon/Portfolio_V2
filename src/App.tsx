import { useMemo, useState } from 'react';
import { archive, featured } from './projectData';
import './index.css';

const filters = ['Tous', 'Web', 'Mobile', 'Backend', 'IA', 'Expériences'] as const;
type Filter = typeof filters[number];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function App() {
  const [filter, setFilter] = useState<Filter>('Tous');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => archive.filter(project =>
    (filter === 'Tous' || project.category === filter) &&
    project.name.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr').trim())
  ), [filter, query]);
  const displayed = showAll || filter !== 'Tous' || query ? visible : visible.slice(0, 18);
  const linkedCount = archive.filter(project => project.github).length;

  return <>
    <a className="skip-link" href="#main">Aller au contenu</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="N'Dri Moahe O., accueil"><span className="brand-mark">N<span>✳</span></span><span className="brand-name">N'Dri <span>Moahe O.</span></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-nav" aria-label="Ouvrir le menu">{menuOpen ? 'Fermer ✕' : 'Menu ☰'}</button>
      <nav id="site-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Navigation principale">
        <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
        <a href="#explorer" onClick={() => setMenuOpen(false)}>Archives</a>
        <a href="#apropos" onClick={() => setMenuOpen(false)}>À propos</a>
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Me contacter <Arrow diagonal /></a>
      </nav>
    </header>

    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> PORTFOLIO / DÉVELOPPEMENT FULLSTACK</div>
          <h1 id="hero-title">Des idées<br/>qui deviennent<br/><em>des expériences.</em></h1>
          <p>Je conçois et développe des produits web, mobiles et des explorations autour de l’intelligence artificielle. Voici les projets qui racontent mon parcours, du prototype à l’application.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projets">Explorer les projets <Arrow diagonal /></a><a className="text-link" href="https://github.com/nikola-moon" target="_blank" rel="noopener noreferrer">Voir mon GitHub <Arrow diagonal /></a></div>
          <div className="hero-meta"><span>01 / 04</span><span>SCROLL POUR DÉCOUVRIR ↓</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-grid"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-disc"><span>BUILD<br/>CREATE<br/>REPEAT.</span></div><span className="art-spark spark-a">✳</span><span className="art-spark spark-b">✳</span><span className="art-tag">WEB / MOBILE / AI</span></div>
      </section>

      <div className="ticker" aria-hidden="true"><div>CODE CRÉATIF <span>✳</span> PRODUITS DIGITAUX <span>✳</span> FULLSTACK <span>✳</span> EXPÉRIMENTATION <span>✳</span> CODE CRÉATIF <span>✳</span> PRODUITS DIGITAUX <span>✳</span></div></div>

      <section className="intro section-pad" id="apropos">
        <div className="section-kicker">/ 01 — PRÉSENTATION</div>
        <div className="intro-grid"><h2>Curiosité.<br/><span>Code.</span><br/>Impact.</h2><div><p>De l’interface au serveur, j’aime donner une forme concrète aux idées. Mon travail traverse les sites vitrines, les plateformes, les applications mobiles et les prototypes IA.</p><p>Ce portfolio rassemble des projets personnels, des expérimentations et des travaux en évolution. Chaque dépôt public est relié directement quand il est disponible.</p><a href="#explorer" className="inline-link">Parcourir tout le catalogue <Arrow diagonal /></a></div></div>
        <div className="stats"><div><strong>{archive.length}</strong><small>dossiers de projets</small></div><div><strong>{linkedCount}</strong><small>liens GitHub repérés</small></div><div><strong>05</strong><small>univers créatifs</small></div></div>
      </section>

      <section className="selected section-pad" id="projets">
        <div className="section-heading"><div><div className="section-kicker">/ 02 — À LA UNE</div><h2>Projets <em>choisis.</em></h2></div><p>Une sélection de réalisations qui montre la diversité des formats et des technologies explorés.</p></div>
        <div className="featured-grid">{featured.map((project, index) => <article className={`project-card card-${index % 6}`} key={project.folder}>
          <div className="card-visual"><span className="visual-index">{String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span><span className="visual-glyph">{['✳','◈','⌘','◎','↗','◉'][index % 6]}</span><span className="visual-caption">{project.category.toUpperCase()} / {project.stack.toUpperCase()}</span></div>
          <div className="card-content"><div className="card-topline"><span>{project.category}</span><span>{project.stack}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="card-bottom">{project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Code GitHub de ${project.title}`}>Voir le code <Arrow diagonal /></a> : <span className="local-note">Projet local</span>}<span className="folder-name" title={project.folder}>{project.folder}</span></div></div>
        </article>)}</div>
      </section>

      <section className="catalog section-pad" id="explorer">
        <div className="section-heading"><div><div className="section-kicker">/ 03 — L’ARCHIVE</div><h2>Tout le <em>parcours.</em></h2></div><p>Prototypes, applications, exercices et idées en cours : retrouvez ici l’ensemble des dossiers du répertoire de projets.</p></div>
        <div className="catalog-controls"><div className="filters" role="group" aria-label="Filtrer les projets">{filters.map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => { setFilter(item); setShowAll(true); }}>{item}</button>)}</div><label className="search"><span className="sr-only">Rechercher un projet</span><span aria-hidden="true">⌕</span><input value={query} onChange={event => { setQuery(event.target.value); setShowAll(true); }} placeholder="Rechercher un projet..." type="search" /></label></div>
        <div className="catalog-count">{visible.length} PROJET{visible.length > 1 ? 'S' : ''} {filter !== 'Tous' ? `/ ${filter.toUpperCase()}` : '/ TOUS'}</div>
        <div className="archive-list">{displayed.map((project, index) => <div className="archive-row" key={project.name}><span className="archive-number">{String(index + 1).padStart(3, '0')}</span><div><h3>{project.name}</h3><span className="archive-category">{project.category}{project.featured ? ' · À la une' : ''}</span></div>{project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${project.name}`}>GitHub <Arrow diagonal /></a> : <span className="archive-local">Projet local</span>}</div>)}</div>
        {visible.length === 0 && <p className="empty-state">Aucun projet ne correspond à cette recherche.</p>}
        {!showAll && visible.length > displayed.length && <button className="show-more" onClick={() => setShowAll(true)}>Afficher les {visible.length - displayed.length} autres projets <Arrow /></button>}
        <p className="catalog-note">Les liens GitHub sont affichés uniquement pour les dépôts repérés sous le compte nikola-moon. « Projet local » indique qu’aucun lien public personnel n’a été confirmé dans le dossier.</p>
      </section>

      <section className="contact section-pad" id="contact"><div className="section-kicker">/ 04 — CONTACT</div><div className="contact-inner"><h2>Une idée à<br/><em>construire ensemble ?</em></h2><p>Une collaboration, un projet ou simplement une conversation autour du code ? Retrouvons-nous sur GitHub.</p><a className="button button-light" href="https://github.com/nikola-moon" target="_blank" rel="noopener noreferrer">Découvrir mon GitHub <Arrow diagonal /></a></div><span className="contact-decoration" aria-hidden="true">✳</span></section>
    </main>
    <footer><a className="footer-brand" href="#top">N'Dri <span>Moahe O.</span> ✳</a><span>PORTFOLIO FULLSTACK — 2026</span><a href="#top">Retour en haut ↑</a></footer>
  </>;
}

export default App;
