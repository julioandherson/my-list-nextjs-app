import { Inter } from 'next/font/google';
import { Header, RouteGuard } from '@/components';
import { AuthProvider } from '@/context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// ... metadata ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <AuthProvider>
          <RouteGuard>
            <Header />
            {children}
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
