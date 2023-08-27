"use client";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserContextProvider from '@/contexts/user-context';
import GameContextProvider from '@/contexts/game-context';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Hiragana Attack',
//   description: 'Learn Hiragana with this fun game!',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center bg-zinc-600 overflow-hidden overscroll-none`}>
        <UserContextProvider>
          <GameContextProvider>
        {children}
          </GameContextProvider>
        </UserContextProvider>
        </body>
    </html>
  )
}
