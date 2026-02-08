import { getItemById, getItemsByGenre, getItemsByType, items } from './items';

describe('Items Data', () => {
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
        it('deve retornar itens com o gênero especificado', () => {
            const dramaItems = getItemsByGenre('Drama');
            expect(dramaItems.length).toBeGreaterThan(0);
            dramaItems.forEach(item => {
                expect(item.genre).toContain('Drama');
            });
        });

        it('deve ser case insensitive', () => {
            const dramaItems = getItemsByGenre('drama');
            expect(dramaItems.length).toBeGreaterThan(0);
        });

        it('deve retornar array vazio para gênero inexistente', () => {
            const items = getItemsByGenre('Xablau');
            expect(items).toHaveLength(0);
        });
    });

    describe('getItemsByType', () => {
        it('deve retornar apenas filmes', () => {
            const movies = getItemsByType('movie');
            movies.forEach(item => {
                expect(item.type).toBe('movie');
            });
        });

        it('deve retornar apenas séries', () => {
            const series = getItemsByType('series');
            series.forEach(item => {
                expect(item.type).toBe('series');
            });
        });
    });
});
