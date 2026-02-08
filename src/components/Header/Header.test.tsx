import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { useAuth } from '@/context';

// Mock do hook useAuth
jest.mock('@/context', () => ({
    useAuth: jest.fn(),
}));

// Mock do next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe('Header', () => {
    it('deve renderizar o logo corretamente', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, isLoading: false });
        render(<Header />);
        expect(screen.getByText('Minha Lista')).toBeInTheDocument();
        expect(screen.getByLabelText('Ir para Home')).toBeInTheDocument();
    });

    it('deve mostrar "Visitante" quando não há usuário logado', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, isLoading: false });
        render(<Header />);
        expect(screen.getByText('Visitante')).toBeInTheDocument();
        expect(screen.queryByRole('img', { name: /avatar/i })).not.toBeInTheDocument();
    });

    it('deve mostrar o avatar do usuário quando logado', () => {
        const mockUser = {
            id: '1',
            username: 'testuser',
            name: 'Test User',
            avatarUrl: '/avatar.jpg',
        };
        (useAuth as jest.Mock).mockReturnValue({ user: mockUser, isLoading: false });

        render(<Header />);

        const avatarLink = screen.getByLabelText(`Perfil de ${mockUser.username}`);
        expect(avatarLink).toBeInTheDocument();
        expect(avatarLink).toHaveAttribute('href', `/profile/${mockUser.id}`);
        expect(screen.getByAltText(`Avatar de ${mockUser.name}`)).toBeInTheDocument();
        expect(screen.queryByText('Visitante')).not.toBeInTheDocument();
    });

    it('não deve renderizar informações de usuário enquanto carrega', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, isLoading: true });
        render(<Header />);

        expect(screen.queryByText('Visitante')).not.toBeInTheDocument();
        expect(screen.queryByRole('img', { name: /avatar/i })).not.toBeInTheDocument();
    });
});
