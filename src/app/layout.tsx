import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.css';
import AuthContext from '@/context/AuthContext';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Hwitter',
  description: '나만의 새로운 세상을 만들어 보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${pretendard.variable}`}>
      <body className={`${pretendard.className} bg-background`}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
