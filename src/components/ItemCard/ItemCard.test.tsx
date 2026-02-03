import { render, screen } from '@testing-library/react';
import { ItemCard } from './ItemCard';
import { Item } from '@/types';

// Mock do next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />;
    },
}));

const mockItem: Item = {
    id: '1',
    title: 'Filme de Teste',
    description: 'Descrição do filme de teste',
    imageUrl: 'https://example.com/image.jpg',
    rating: 8.5,
    year: 2024,
    genre: ['Drama', 'Ação', 'Aventura'],
    duration: '2h 30min',
    type: 'movie',
};

describe('ItemCard', () => {
    it('deve renderizar o título do item', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('Filme de Teste')).toBeInTheDocument();
    });

    it('deve renderizar a avaliação formatada', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('deve renderizar o ano do item', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('2024')).toBeInTheDocument();
    });

    it('deve exibir "Filme" para tipo movie', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('Filme')).toBeInTheDocument();
    });

    it('deve exibir "Série" para tipo series', () => {
        const seriesItem: Item = { ...mockItem, type: 'series' };
        render(<ItemCard item={seriesItem} />);
        expect(screen.getByText('Série')).toBeInTheDocument();
    });

    it('deve exibir até 2 gêneros', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('Drama • Ação')).toBeInTheDocument();
    });

    it('deve ter link para página de detalhes', () => {
        render(<ItemCard item={mockItem} />);
        const link = screen.getByRole('link', { name: /ver detalhes de filme de teste/i });
        expect(link).toHaveAttribute('href', '/item/1');
    });

    it('deve ter aria-label na avaliação', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByLabelText(/avaliação: 8.5 de 10/i)).toBeInTheDocument();
    });

    it('deve ter data-testid correto', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByTestId('item-card-1')).toBeInTheDocument();
    });

    it('deve renderizar imagem com alt text correto', () => {
        render(<ItemCard item={mockItem} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'Capa de Filme de Teste');
    });
});
