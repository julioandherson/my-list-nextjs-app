'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context';

export function RouteGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        // Se estiver logado e na página de login, manda pra home
        if (user && pathname === '/login') {
            router.replace('/');
            return;
        }

        // Se NÃO estiver logado e NÃO estiver na página de login, manda pro login
        if (!user && pathname !== '/login') {
            router.replace('/login');
        }
    }, [user, isLoading, pathname, router]);

    // Se estiver carregando, mostra nada ou um loader simples
    if (isLoading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#141414',
                color: '#fff'
            }}>
                Carregando...
            </div>
        );
    }

    // Se não tem user e não tá no login, não renderiza nada (vai redirecionar)
    if (!user && pathname !== '/login') {
        return null;
    }

    return <>{children}</>;
}
