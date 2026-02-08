import { getAllUsers, getUserById, authenticateUser, addToUserList, removeFromUserList, resetUsers } from './users';

describe('Users Data', () => {
    beforeEach(() => {
        resetUsers();
    });

    describe('getAllUsers', () => {
        it('deve retornar a lista inicial de usuários', () => {
            const users = getAllUsers();
            expect(users).toHaveLength(2);
            expect(users[0].username).toBe('julio');
            expect(users[1].username).toBe('maria');
        });
    });

    describe('getUserById', () => {
        it('deve retornar o usuário correto pelo ID', () => {
            const user = getUserById('1');
            expect(user).toBeDefined();
            expect(user?.name).toBe('Julio Silva');
        });

        it('deve retornar undefined para ID inexistente', () => {
            const user = getUserById('999');
            expect(user).toBeUndefined();
        });
    });

    describe('authenticateUser', () => {
        it('deve autenticar com credenciais corretas', () => {
            const user = authenticateUser('julio', '123');
            expect(user).toBeDefined();
            expect(user?.username).toBe('julio');
        });

        it('deve falhar com senha incorreta', () => {
            const user = authenticateUser('julio', 'wrongpass');
            expect(user).toBeNull();
        });

        it('deve falhar com usuário inexistente', () => {
            const user = authenticateUser('ghost', '123');
            expect(user).toBeNull();
        });
    });

    describe('addToUserList', () => {
        it('deve adicionar um item à lista do usuário', () => {
            const newItemId = '99';
            const updatedUser = addToUserList('1', newItemId);

            expect(updatedUser?.myList).toContain(newItemId);
            expect(getUserById('1')?.myList).toContain(newItemId);
        });

        it('não deve duplicar item se já existir na lista', () => {
            const existingItemId = '1';
            const userBefore = getUserById('1');
            const initialListLength = userBefore?.myList.length;

            addToUserList('1', existingItemId);

            const userAfter = getUserById('1');
            expect(userAfter?.myList.length).toBe(initialListLength);
        });

        it('deve retornar null se usuário não existir', () => {
            const result = addToUserList('999', '1');
            expect(result).toBeNull();
        });
    });

    describe('removeFromUserList', () => {
        it('deve remover um item da lista do usuário', () => {
            const itemToRemoveId = '1';
            const updatedUser = removeFromUserList('1', itemToRemoveId);

            expect(updatedUser?.myList).not.toContain(itemToRemoveId);
            expect(userInfo('1')?.myList).not.toContain(itemToRemoveId);
        });

        it('não deve fazer nada se o item não estiver na lista', () => {
            const nonExistentItemId = '999';
            const userBefore = getUserById('1');
            const initialListLength = userBefore?.myList.length;

            removeFromUserList('1', nonExistentItemId);

            const userAfter = getUserById('1');
            expect(userAfter?.myList.length).toBe(initialListLength);
        });

        it('deve retornar null se usuário não existir', () => {
            const result = removeFromUserList('999', '1');
            expect(result).toBeNull();
        });
    });
});

// Helper para pegar usuário atualizado nos testes
function userInfo(id: string) {
    return getUserById(id);
}
