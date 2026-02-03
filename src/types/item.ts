/**
 * Representa um item (filme ou série) na aplicação
 */
export interface Item {
    /** Identificador único do item */
    id: string;
    /** Título do filme/série */
    title: string;
    /** Descrição/sinopse */
    description: string;
    /** URL da imagem de capa */
    imageUrl: string;
    /** Avaliação (0-10) */
    rating: number;
    /** Ano de lançamento */
    year: number;
    /** Lista de gêneros */
    genre: string[];
    /** Duração (ex: "2h 30min" ou "8 temporadas") */
    duration: string;
    /** Tipo do conteúdo */
    type: 'movie' | 'series';
}

/**
 * Valida se um objeto é um Item válido
 */
export function isValidItem(item: unknown): item is Item {
    if (typeof item !== 'object' || item === null) return false;

    const obj = item as Record<string, unknown>;

    return (
        typeof obj.id === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.description === 'string' &&
        typeof obj.imageUrl === 'string' &&
        typeof obj.rating === 'number' &&
        obj.rating >= 0 &&
        obj.rating <= 10 &&
        typeof obj.year === 'number' &&
        Array.isArray(obj.genre) &&
        obj.genre.every((g) => typeof g === 'string') &&
        typeof obj.duration === 'string' &&
        (obj.type === 'movie' || obj.type === 'series')
    );
}
