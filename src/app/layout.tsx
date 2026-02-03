import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Minha Lista | Filmes e Séries',
  description:
    'Descubra filmes e séries incríveis. Explore nossa coleção de títulos selecionados.',
  keywords: ['filmes', 'séries', 'streaming', 'entretenimento'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Header userAvatarUrl="https://picsum.photos/seed/user1/200/200" userName="João Silva" />
        {children}
      </body>
    </html>
  );
}
