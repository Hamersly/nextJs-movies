import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { PageBox } from '@/components/PageBox/PageBox';
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ВидеоПоиск',
  description: 'Поиск и просмотр информации о фильмах и сериалах',
  openGraph: {
    title: 'ВидеоПоиск',
    description: 'Поиск и просмотр информации о фильмах и сериалах',
  },
};

// Корневой layout: Header → основной контент → Footer.
// ThemeRegistry оборачивает всё приложение в MUI ThemeProvider с тёмной/светлой темой.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ThemeRegistry>
          <Header />
          <main>
            <PageBox>{children}</PageBox>
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
