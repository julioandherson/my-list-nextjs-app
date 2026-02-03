'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from 'react';
import { User, UserUpdateData } from '@/types';
import { getUserById } from '@/data';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userId: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: UserUpdateData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simular persistência de sessão
    useEffect(() => {
        const storedUserId = localStorage.getItem('auth_user_id');
        if (storedUserId) {
            // Simular delay de rede
            setTimeout(() => {
                const foundUser = getUserById(storedUserId);
                if (foundUser) {
                    setUser(foundUser);
                }
                setIsLoading(false);
            }, 500);
        } else {
            // Auto-login para demonstração se não houver sessão
            const demoUser = getUserById('1');
            if (demoUser) {
                setUser(demoUser);
                localStorage.setItem('auth_user_id', demoUser.id);
            }
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (userId: string) => {
        setIsLoading(true);
        // Simular API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundUser = getUserById(userId);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('auth_user_id', userId);
        }
        setIsLoading(false);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('auth_user_id');
    }, []);

    const updateProfile = useCallback(
        async (data: UserUpdateData) => {
            if (!user) return false;

            // Otimistic updates
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);

            try {
                // Na prática seria um fetch PATCH /api/users/[id]
                // Aqui estamos chamando a "DB" diretamente por estarmos no mesmo projeto sem DB real
                // Mas para simular corretamente, vamos fazer um fetch
                const response = await fetch(`/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Falha ao atualizar');
                }

                const result = await response.json();
                if (result.success) {
                    setUser(result.data);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
                // Reverter em caso de erro
                setUser(user);
                return false;
            }
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
