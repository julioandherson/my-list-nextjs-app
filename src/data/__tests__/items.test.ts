import { items, getItemById, getItemsByGenre, getItemsByType } from '../items';
import { isValidItem } from '@/types';

describe('Items Data', () => {
    describe('items array', () => {
        it('deve conter 10 itens', () => {
            expect(items).toHaveLength(10);
        });

        it('todos os itens devem ser válidos', () => {
            items.forEach((item) => {
                expect(isValidItem(item)).toBe(true);
            });
        });

        it('todos os itens devem ter IDs únicos', () => {
            const ids = items.map((item) => item.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(items.length);
        });

        it('ratings devem estar entre 0 e 10', () => {
            items.forEach((item) => {
                expect(item.rating).toBeGreaterThanOrEqual(0);
                expect(item.rating).toBeLessThanOrEqual(10);
            });
        });
    });

    describe('getItemById', () => {
        it('deve retornar o item correto pelo ID', () => {
            const item = getItemById('1');
            expect(item).toBeDefined();
            expect(item?.title).toBe('Interestelar');
        });

        it('deve retornar undefined para ID inexistente', () => {
            const item = getItemById('999');
            expect(item).toBeUndefined();
        });
    });

    describe('getItemsByGenre', () => {
        it('deve retornar itens do gênero especificado', () => {
            const dramaItems = getItemsByGenre('Drama');
            expect(dramaItems.length).toBeGreaterThan(0);
            dramaItems.forEach((item) => {
                expect(item.genre.map((g) => g.toLowerCase())).toContain('drama');
            });
        });

        it('deve ser case-insensitive', () => {
            const items1 = getItemsByGenre('drama');
            const items2 = getItemsByGenre('DRAMA');
            expect(items1).toEqual(items2);
        });
    });

    describe('getItemsByType', () => {
        it('deve retornar apenas filmes', () => {
            const movies = getItemsByType('movie');
            expect(movies.length).toBeGreaterThan(0);
            movies.forEach((item) => {
                expect(item.type).toBe('movie');
            });
        });

        it('deve retornar apenas séries', () => {
            const series = getItemsByType('series');
            expect(series.length).toBeGreaterThan(0);
            series.forEach((item) => {
                expect(item.type).toBe('series');
            });
        });
    });
});
