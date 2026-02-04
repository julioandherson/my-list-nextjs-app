import { Inter } from 'next/font/google';
import { Header, RouteGuard } from '@/components';
import { AuthProvider, ToastProvider } from '@/context';
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
          <ToastProvider>
            <RouteGuard>
              <Header />
              {children}
            </RouteGuard>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
