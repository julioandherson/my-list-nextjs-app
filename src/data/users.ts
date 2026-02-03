import { User, UserUpdateData } from '@/types';

/**
 * Dados fictícios de usuários
 * Em uma aplicação real, isso viria de um banco de dados
 */
let users: User[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        avatarUrl: 'https://picsum.photos/seed/user1/200/200',
        myList: ['1', '4', '7', '9'],
        createdAt: '2024-01-15T10:30:00Z',
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        avatarUrl: 'https://picsum.photos/seed/user2/200/200',
        myList: ['2', '3', '6', '8', '10'],
        createdAt: '2024-02-20T14:45:00Z',
    },
];

/**
 * Busca um usuário pelo ID
 */
export function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
}

/**
 * Atualiza os dados de um usuário
 */
export function updateUser(id: string, data: UserUpdateData): User | null {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return null;
    }

    const updatedUser: User = {
        ...users[userIndex],
        ...data,
    };

    users[userIndex] = updatedUser;

    return updatedUser;
}

/**
 * Adiciona um item à lista do usuário
 */
export function addToUserList(userId: string, itemId: string): User | null {
    const user = getUserById(userId);

    if (!user) {
        return null;
    }

    if (user.myList.includes(itemId)) {
        return user;
    }

    return updateUser(userId, { myList: [...user.myList, itemId] });
}

/**
 * Remove um item da lista do usuário
 */
export function removeFromUserList(userId: string, itemId: string): User | null {
    const user = getUserById(userId);

    if (!user) {
        return null;
    }

    return updateUser(userId, {
        myList: user.myList.filter((id) => id !== itemId),
    });
}

/**
 * Retorna todos os usuários (para fins de teste)
 */
export function getAllUsers(): User[] {
    return users;
}

/**
 * Reseta os usuários para o estado inicial (para fins de teste)
 */
export function resetUsers(): void {
    users = [
        {
            id: '1',
            name: 'João Silva',
            email: 'joao.silva@email.com',
            avatarUrl: 'https://picsum.photos/seed/user1/200/200',
            myList: ['1', '4', '7', '9'],
            createdAt: '2024-01-15T10:30:00Z',
        },
        {
            id: '2',
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            avatarUrl: 'https://picsum.photos/seed/user2/200/200',
            myList: ['2', '3', '6', '8', '10'],
            createdAt: '2024-02-20T14:45:00Z',
        },
    ];
}
