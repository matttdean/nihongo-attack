import React from 'react'
import UserContextProvider from '@/contexts/user-context'
import GameContextProvider from '@/contexts/game-context'

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <UserContextProvider>
        <GameContextProvider>
            {children}
        </GameContextProvider>
    </UserContextProvider>
  )
}
