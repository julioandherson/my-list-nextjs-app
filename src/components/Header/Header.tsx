'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context';
import styles from './Header.module.css';

/**
 * Componente Header - Cabeçalho da aplicação
 * Agora conectado ao AuthContext
 */
export function Header() {
    const { user, isLoading } = useAuth();

    return (
        <header className={styles.header} role="banner">
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo} aria-label="Ir para página inicial">
                    <span className={styles.logoIcon} aria-hidden="true">
                        🎬
                    </span>
                    <span>Minha Lista</span>
                </Link>

                {/* Só mostrar navegação se não estiver carregando e houver usuário */}
                {!isLoading && user && (
                    <nav className={styles.nav} role="navigation" aria-label="Navegação principal">
                        {/* Links removidos conforme solicitação */}

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

                {/* Se não houver usuário logado (simulado) */}
                {!isLoading && !user && (
                    <div className={styles.nav}>
                        <span className={styles.navLink}>Visitante</span>
                    </div>
                )}
            </div>
        </header>
    );
}
