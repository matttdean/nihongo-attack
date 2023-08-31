import React from 'react'
import { useGame } from '@/contexts/game-context'
import { useUser } from '@/contexts/user-context';
import Link from 'next/link';

export default function LevelIntro() {
    const {target, setGameState} = useGame();
    const {user} = useUser();

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-800 fixed inset-0 z-[999] gap-5">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-zinc-300 text-2xl">Target</div>
            <span className="text-white text-8xl bg-zinc-700 rounded-md p-4">{target && target.symbol}</span>
            <p className="text-zinc-200 text-xl">Sound: {target.sound}</p>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
              onClick={() => setGameState("playing")}
            >
              Start
            </button>
            {user && (
              <Link
                className="bg-white/80 py-4 px-6 rounded-md text-black  hover:bg-white"
                href="/levels"
              >
                Level Select
              </Link>
            )} 
          </div>
        </div>
      );
}
