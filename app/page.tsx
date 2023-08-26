import dynamic from 'next/dynamic'
import GameContextProvider from '@/contexts/game-context'
import UI from '@/components/ui'

const Cards = dynamic(() => import('@/components/cards'), { ssr: false })

export default function Home() {
  return (
    <main className="w-[80rem] max-w-full min-h-screen relative overflow-hidden bg-zinc-600">
      <GameContextProvider>
        <UI />
        <Cards />
      </GameContextProvider>
    </main>
  )
}
