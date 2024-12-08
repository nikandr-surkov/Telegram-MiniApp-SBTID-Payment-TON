import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Telegram Mini App Ton Payment Example Using Sbt',
  description: 'Get your ice cream using SBTID - Social Bound Identity Token on TON blockchain. A secure and innovative payment system that verifies purchases through your Telegram ID. Pay once, verify anytime.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}