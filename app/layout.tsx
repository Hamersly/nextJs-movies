import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from 'react';
import {Footer} from '@/components/Footer/Footer';
import {Header} from '@/components/Header/Header';
import {PageBox} from '@/components/PageBox/PageBox';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'ВидеоПоиск',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <PageBox>
          {children}
        </PageBox>
        <Footer/>
      </body>
    </html>
  );
}
