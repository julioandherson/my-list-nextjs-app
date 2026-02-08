import { items, getItemsByType } from '@/data';
import { ItemGrid } from '@/components';
import styles from './page.module.css';

export default function HomePage() {
  const movies = getItemsByType('movie');
  const series = getItemsByType('series');

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Hero Section */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitle}>
            Lista de filmes e séries
          </h1>
          <p className={styles.heroSubtitle}>
            Explore nossa coleção de títulos.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{items.length}</div>
              <div className={styles.statLabel}>Títulos</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{movies.length}</div>
              <div className={styles.statLabel}>Filmes</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{series.length}</div>
              <div className={styles.statLabel}>Séries</div>
            </div>
          </div>
        </section>
        <ItemGrid items={movies} title="🎬 Filmes" emptyMessage="Nenhum filme disponível" />
        <ItemGrid items={series} title="📺 Séries" emptyMessage="Nenhuma série disponível" />
      </div>
    </main>
  );
}
