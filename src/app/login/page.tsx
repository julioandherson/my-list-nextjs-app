'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { getAllUsers } from '@/data';
import styles from './page.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const router = useRouter();

    // Para demonstração
    const validUsers = getAllUsers();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const success = await login(username, password);
            if (success) {
                router.push('/');
            } else {
                setError('Usuário ou senha inválidos.');
            }
        } catch {
            setError('Ocorreu um erro ao tentar fazer login.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <h1 className={styles.title}>Entrar</h1>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Usuário (ex: julio)"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className={styles.demoCredentials}>
                    <strong>Login:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                        {validUsers.map(u => (
                            <li key={u.id}>
                                {u.username} / 123
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
