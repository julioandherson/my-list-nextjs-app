'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { Item } from '@/types';
import { ItemGrid } from '@/components';
import styles from './page.module.css';

interface ProfilePageProps {
    params: Promise<{ id: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
    const { id } = use(params);
    const { user, isLoading: isAuthLoading, updateProfile, logout } = useAuth();
    const router = useRouter();

    const [savedItems, setSavedItems] = useState<Item[]>([]);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form stats
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Redirecionar se não estiver logado ou se tentar acessar perfil de outro usuário
        // (Simplificado para este projeto avaliativo)
        if (!isAuthLoading && (!user || user.id !== id)) {
            if (!user) {
                // Se não tem user, talvez ainda esteja carregando ou não logado
                // Mas como isAuthLoading é false, então não está logado
                router.push('/');
            } else {
                // Se tem user mas id é diferente, redireciona para o próprio perfil
                router.push(`/profile/${user.id}`);
            }
        } else if (user) {
            setName(user.name);
        }
    }, [user, id, isAuthLoading, router]);

    // Buscar itens salvos
    useEffect(() => {
        async function fetchSavedItems() {
            if (!user?.myList || user.myList.length === 0) {
                setSavedItems([]);
                setIsLoadingItems(false);
                return;
            }

            setIsLoadingItems(true);
            try {
                // Buscar todos os itens (cacheado pelo next)
                const response = await fetch('/api/items');
                const data = await response.json();

                if (data.success) {
                    const allItems: Item[] = data.data;
                    const userItems = allItems.filter((item) => user.myList.includes(item.id));
                    setSavedItems(userItems);
                }
            } catch (error) {
                console.error('Falha ao buscar itens salvos', error);
            } finally {
                setIsLoadingItems(false);
            }
        }

        if (user) {
            fetchSavedItems();
        }
    }, [user]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const success = await updateProfile({ name });

        if (success) {
            setIsEditing(false);
        }

        setIsSaving(false);
    };

    if (isAuthLoading || !user) {
        return <div className={styles.loading}>Carregando perfil...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <div className={styles.avatarWrapper}>
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        fill
                        className={styles.avatar}
                    />
                </div>

                <div className={styles.userInfo}>
                    <h1 className={styles.userName}>{user.name}</h1>
                    <p className={styles.userEmail}>@{user.username}</p>
                    <p className={styles.memberSince}>
                        Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </p>

                    {!isEditing ? (
                        <button
                            className={styles.editButton}
                            onClick={() => setIsEditing(true)}
                        >
                            Editar Perfil
                        </button>
                    ) : (
                        <form onSubmit={handleSaveProfile} className={styles.editSection}>
                            <h3 className={styles.formTitle}>Editar Perfil</h3>

                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>Nome</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.input}
                                    disabled={isSaving}
                                />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    className={`${styles.button} ${styles.cancelButton}`}
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user.name);
                                    }}
                                    disabled={isSaving}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`${styles.button} ${styles.saveButton}`}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    )}

                    {!isEditing && (
                        <button
                            onClick={logout}
                            style={{
                                marginTop: '16px',
                                display: 'block',
                                color: '#e50914',
                                background: 'transparent',
                                border: '1px solid #e50914',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Sair
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.savedItems}>
                {isLoadingItems ? (
                    <div className={styles.loading}>Carregando sua lista...</div>
                ) : (
                    <ItemGrid
                        items={savedItems}
                        title="Minha Lista"
                        emptyMessage="Você ainda não adicionou nenhum item à sua lista."
                    />
                )}
            </div>
        </div>
    );
}
