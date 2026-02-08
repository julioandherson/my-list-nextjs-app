import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './page';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';

// Mock do hook useAuth
jest.mock('@/context', () => ({
    useAuth: jest.fn(),
}));

// Mock do hook useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('LoginPage', () => {
    const mockLogin = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            isLoading: false,
        });
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it('deve renderizar o formulário de login corretamente', () => {
        render(<LoginPage />);

        expect(screen.getByRole('heading', { name: /entrar/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/usuário/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('deve chamar a função de login com os valores corretos', async () => {
        mockLogin.mockResolvedValue(true);
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText(/usuário/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
        });
    });

    it('deve redirecionar para a home após login com sucesso', async () => {
        mockLogin.mockResolvedValue(true);
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText(/usuário/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('deve exibir mensagem de erro quando o login falha', async () => {
        mockLogin.mockResolvedValue(false);
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText(/usuário/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(screen.getByText(/usuário ou senha inválidos/i)).toBeInTheDocument();
            expect(mockPush).not.toHaveBeenCalled();
        });
    });

    it('deve lidar com exceções durante o login', async () => {
        mockLogin.mockRejectedValue(new Error('Erro de rede'));
        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText(/usuário/i), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: 'pass' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(screen.getByText(/ocorreu um erro ao tentar fazer login/i)).toBeInTheDocument();
        });
    });

    it('deve desabilitar o botão enquanto estiver carregando', () => {
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            isLoading: true,
        });
        render(<LoginPage />);

        const button = screen.getByRole('button', { name: /entrando/i });
        expect(button).toBeDisabled();
    });
});
