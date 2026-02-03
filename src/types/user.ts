/**
 * Representa um usuário da aplicação
 */
export interface User {
    /** Identificador único do usuário */
    id: string;
    /** Nome do usuário */
    name: string;
    /** Email do usuário */
    email: string;
    /** URL do avatar */
    avatarUrl: string;
    /** IDs dos itens salvos na lista do usuário */
    myList: string[];
    /** Data de criação da conta */
    createdAt: string;
}

/**
 * Valida se um objeto é um User válido
 */
export function isValidUser(user: unknown): user is User {
    if (typeof user !== 'object' || user === null) return false;

    const obj = user as Record<string, unknown>;

    return (
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.avatarUrl === 'string' &&
        Array.isArray(obj.myList) &&
        obj.myList.every((id) => typeof id === 'string') &&
        typeof obj.createdAt === 'string'
    );
}

/**
 * Dados permitidos para atualização do usuário
 */
export interface UserUpdateData {
    name?: string;
    avatarUrl?: string;
    myList?: string[];
}
