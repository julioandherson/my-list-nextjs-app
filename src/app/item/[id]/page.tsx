import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getItemById, items } from '@/data';
import styles from './page.module.css';

// ISR: Revalidar a cada 60 segundos
export const revalidate = 60;

// SSG: Gerar páginas estáticas para todos os itens conhecidos
export function generateStaticParams() {
    return items.map((item) => ({
        id: item.id,
    }));
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const item = getItemById(id);

    if (!item) {
        return {
            title: 'Item não encontrado',
        };
    }

    return {
        title: `${item.title} | Minha Lista`,
        description: item.description,
    };
}

export default async function ItemPage({ params }: PageProps) {
    const { id } = await params;
    const item = getItemById(id);

    if (!item) {
        notFound();
    }

    const typeLabel = item.type === 'movie' ? 'Filme' : 'Série';

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <Image
                    src={item.imageUrl}
                    alt={`Capa de ${item.title}`}
                    fill
                    priority
                    className={styles.heroImage}
                />
                <div className={styles.overlay} />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{item.title}</h1>

                    <div className={styles.meta}>
                        <div className={styles.rating} aria-label={`Avaliação ${item.rating}`}>
                            ⭐ {item.rating}
                        </div>
                        <div className={styles.year}>{item.year}</div>
                        <div className={styles.type}>{typeLabel}</div>
                        <div className={styles.duration}>{item.duration}</div>
                        <div className={styles.genres}>
                            {item.genre.map((g) => (
                                <span key={g} className={styles.genreTag}>
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className={styles.description}>{item.description}</p>

                    <div className={styles.actions}>
                        <button className={`${styles.actionButton} ${styles.primaryButton}`}>
                            ▶ Assistir Agora
                        </button>
                        <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                            + Minha Lista
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
