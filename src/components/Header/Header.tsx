'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context';
import styles from './Header.module.css';

export function Header() {
    const { user, isLoading } = useAuth();

    return (
        <header className={styles.header} role="banner">
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo} aria-label="Ir para Home">
                    <span className={styles.logoIcon} aria-hidden="true">
                        🎬
                    </span>
                    <span>Minha Lista</span>
                </Link>

                {!isLoading && user && (
                    <nav className={styles.nav} role="navigation" aria-label="Navegação principal">

                        <Link
                            href={`/profile/${user.id}`}
                            className={styles.userAvatar}
                            aria-label={`Perfil de ${user.username}`}
                            title={user.username}
                        >
                            <Image
                                src={user.avatarUrl}
                                alt={`Avatar de ${user.name}`}
                                width={36}
                                height={36}
                                className={styles.avatarImage}
                            />
                        </Link>
                    </nav>
                )}

                {!isLoading && !user && (
                    <div className={styles.nav}>
                        <span className={styles.navLink}>Visitante</span>
                    </div>
                )}
            </div>
        </header>
    );
}
