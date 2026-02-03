import {
    getUserById,
    updateUser,
    addToUserList,
    removeFromUserList,
    getAllUsers,
    resetUsers,
} from '../users';
import { isValidUser } from '@/types';

describe('Users Data', () => {
    beforeEach(() => {
        resetUsers();
    });

    describe('getAllUsers', () => {
        it('deve retornar todos os usuários', () => {
            const users = getAllUsers();
            expect(users).toHaveLength(2);
        });

        it('todos os usuários devem ser válidos', () => {
            const users = getAllUsers();
            users.forEach((user) => {
                expect(isValidUser(user)).toBe(true);
            });
        });
    });

    describe('getUserById', () => {
        it('deve retornar o usuário correto', () => {
            const user = getUserById('1');
            expect(user).toBeDefined();
            expect(user?.name).toBe('João Silva');
        });

        it('deve retornar undefined para ID inexistente', () => {
            const user = getUserById('999');
            expect(user).toBeUndefined();
        });
    });

    describe('updateUser', () => {
        it('deve atualizar o nome do usuário', () => {
            const updated = updateUser('1', { name: 'Novo Nome' });
            expect(updated?.name).toBe('Novo Nome');
        });

        it('deve retornar null para usuário inexistente', () => {
            const updated = updateUser('999', { name: 'Teste' });
            expect(updated).toBeNull();
        });
    });

    describe('addToUserList', () => {
        it('deve adicionar item à lista', () => {
            const user = addToUserList('1', '10');
            expect(user?.myList).toContain('10');
        });

        it('não deve duplicar itens na lista', () => {
            const user = getUserById('1');
            const originalLength = user?.myList.length ?? 0;

            const updated = addToUserList('1', '1'); // ID já existe na lista
            expect(updated?.myList.length).toBe(originalLength);
        });

        it('deve retornar null para usuário inexistente', () => {
            const result = addToUserList('999', '1');
            expect(result).toBeNull();
        });
    });

    describe('removeFromUserList', () => {
        it('deve remover item da lista', () => {
            const user = removeFromUserList('1', '1');
            expect(user?.myList).not.toContain('1');
        });

        it('deve retornar null para usuário inexistente', () => {
            const result = removeFromUserList('999', '1');
            expect(result).toBeNull();
        });
    });
});
