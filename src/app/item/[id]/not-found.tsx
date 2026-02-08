import Link from 'next/link';
import styles from './page.module.css';

export default function ItemNotFound() {
    return (
        <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Item não encontrado</h2>
            <p className={styles.errorText}>
                O filme ou série que você tentou acessar não está disponível em nosso catálogo.
            </p>
            <Link href="/" className={styles.backButton}>
                Voltar para a lista
            </Link>
        </div>
    );
}
