'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { User, UserUpdateData } from '@/types';
import { getUserById, authenticateUser } from '@/data';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: UserUpdateData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Verificar sessão ao carregar
    useEffect(() => {
        const storedUserId = localStorage.getItem('auth_user_id');
        if (storedUserId) {
            // Simular delay mínimo
            setTimeout(() => {
                const foundUser = getUserById(storedUserId);
                if (foundUser) {
                    setUser(foundUser);
                }
                setIsLoading(false);
            }, 100);
        } else {
            setTimeout(() => setIsLoading(false), 0);
        }
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        setIsLoading(true);

        // Autenticação direta contra o mock
        const authenticatedUser = authenticateUser(username, password);

        if (authenticatedUser) {
            setUser(authenticatedUser);
            localStorage.setItem('auth_user_id', authenticatedUser.id);
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('auth_user_id');
        router.push('/login');
    }, [router]);

    const updateProfile = useCallback(
        async (data: UserUpdateData) => {
            if (!user) return false;

            // Otimistic updates local
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);

            // Persistir no "DB" mock
            // Em um cenário real, faria request. Aqui, apenas atualizamos o estado.
            // O mock em `data/users.ts` é resetado on reload, mas o estado Context persiste na sessão.
            return true;
        },
        [user]
    );

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
