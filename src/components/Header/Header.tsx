import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

interface HeaderProps {
    /** URL do avatar do usuário (opcional) */
    userAvatarUrl?: string;
    /** Nome do usuário para alt text */
    userName?: string;
}

/**
 * Componente Header - Cabeçalho da aplicação
 */
export function Header({ userAvatarUrl, userName = 'Usuário' }: HeaderProps) {
    return (
        <header className={styles.header} role="banner">
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo} aria-label="Ir para página inicial">
                    <span className={styles.logoIcon} aria-hidden="true">
                        🎬
                    </span>
                    <span>Minha Lista</span>
                </Link>

                <nav className={styles.nav} role="navigation" aria-label="Navegação principal">
                    <Link href="/" className={styles.navLink}>
                        Início
                    </Link>
                    <Link href="/profile/1" className={styles.navLink}>
                        Minha Lista
                    </Link>

                    {userAvatarUrl && (
                        <Link
                            href="/profile/1"
                            className={styles.userAvatar}
                            aria-label={`Perfil de ${userName}`}
                        >
                            <Image
                                src={userAvatarUrl}
                                alt={`Avatar de ${userName}`}
                                width={36}
                                height={36}
                                className={styles.avatarImage}
                            />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
