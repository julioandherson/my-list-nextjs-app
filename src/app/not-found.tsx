import Link from 'next/link';
import styles from './not-found.module.css';

export default function GlobalNotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Página não encontrada</h2>
            <p className={styles.description}>
                A página que você está procurando não existe ou foi movida.
            </p>
            <Link href="/" className={styles.button}>
                Voltar para o início
            </Link>
        </div>
    );
}
