'use client';

import { useState } from 'react';
import { useAuth } from '@/context';
import styles from './ItemActions.module.css';

interface ItemActionsProps {
    itemId: string;
}

export function ItemActions({ itemId }: ItemActionsProps) {
    const { user, updateProfile, isLoading } = useAuth();
    const [isUpdating, setIsUpdating] = useState(false);

    // Verifica se o item está na lista do usuário
    const isInList = user?.myList?.includes(itemId) || false;

    const handleListToggle = async () => {
        if (!user) {
            // Aqui poderia redirecionar para login ou abrir modal
            alert('Você precisa estar logado para salvar itens.');
            return;
        }

        setIsUpdating(true);

        let newList: string[];
        if (isInList) {
            newList = user.myList.filter((id) => id !== itemId);
        } else {
            newList = [...user.myList, itemId];
        }

        await updateProfile({ myList: newList });
        setIsUpdating(false);
    };

    if (isLoading) {
        return null; // Ou um placeholder/skeleton
    }

    return (
        <div className={styles.actions}>
            <button className={`${styles.actionButton} ${styles.primaryButton}`}>
                ▶ Assistir Agora
            </button>

            <button
                className={`${styles.actionButton} ${isInList ? styles.removeButton : styles.secondaryButton}`}
                onClick={handleListToggle}
                disabled={isUpdating}
            >
                {isUpdating ? '...' : isInList ? '✓ Salvo' : '+ Minha Lista'}
            </button>
        </div>
    );
}
