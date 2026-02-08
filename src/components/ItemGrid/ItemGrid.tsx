import { Item } from '@/models';
import { ItemCard } from '../ItemCard';
import styles from './ItemGrid.module.css';

interface ItemGridProps {
    items: Item[];
    title?: string;
    emptyMessage?: string;
}

export function ItemGrid({
    items,
    title,
    emptyMessage = 'Nenhum item encontrado',
}: ItemGridProps) {
    return (
        <section className={styles.section} aria-labelledby={title ? 'grid-title' : undefined}>
            {title && (
                <h2 id="grid-title" className={styles.sectionTitle}>
                    {title}
                </h2>
            )}

            <div className={styles.grid} role="list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} role="listitem">
                            <ItemCard item={item} />
                        </div>
                    ))
                ) : (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon} aria-hidden="true">
                            🎬
                        </div>
                        <p className={styles.emptyText}>{emptyMessage}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
