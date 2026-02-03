import { items, getItemsByType } from '@/data';
import { ItemGrid } from '@/components';
import styles from './page.module.css';

/**
 * Página inicial - Geração Estática (SSG)
 *
 * Esta página é gerada estaticamente em build time,
 * pois os dados são buscados de forma síncrona.
 */
export default function HomePage() {
  const movies = getItemsByType('movie');
  const series = getItemsByType('series');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitle}>
            Descubra filmes e séries incríveis
          </h1>
          <p className={styles.heroSubtitle}>
            Explore nossa coleção de títulos selecionados e encontre sua próxima aventura
            cinematográfica.
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

        {/* Grid de Filmes */}
        <ItemGrid items={movies} title="🎬 Filmes" emptyMessage="Nenhum filme disponível" />

        {/* Grid de Séries */}
        <ItemGrid items={series} title="📺 Séries" emptyMessage="Nenhuma série disponível" />
      </div>
    </main>
  );
}
