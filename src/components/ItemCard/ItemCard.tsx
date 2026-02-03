import Image from 'next/image';
import Link from 'next/link';
import { Item } from '@/types';
import styles from './ItemCard.module.css';

interface ItemCardProps {
    /** Dados do item a ser exibido */
    item: Item;
}

/**
 * Componente ItemCard - Card para exibir um filme ou série
 */
export function ItemCard({ item }: ItemCardProps) {
    const typeLabel = item.type === 'movie' ? 'Filme' : 'Série';

    return (
        <article className={styles.card} data-testid={`item-card-${item.id}`}>
            <div className={styles.imageWrapper}>
                <Image
                    src={item.imageUrl}
                    alt={`Capa de ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className={styles.image}
                />
            </div>

            <div className={styles.overlay}>
                <h3 className={styles.title}>{item.title}</h3>

                <div className={styles.meta}>
                    <span className={styles.rating} aria-label={`Avaliação: ${item.rating} de 10`}>
                        <span className={styles.ratingStar} aria-hidden="true">
                            ⭐
                        </span>
                        {item.rating.toFixed(1)}
                    </span>

                    <span className={styles.year}>{item.year}</span>

                    <span className={styles.type}>{typeLabel}</span>
                </div>

                <p className={styles.genres}>{item.genre.slice(0, 2).join(' • ')}</p>
            </div>

            <Link
                href={`/item/${item.id}`}
                className={styles.cardLink}
                aria-label={`Ver detalhes de ${item.title}`}
            />
        </article>
    );
}
