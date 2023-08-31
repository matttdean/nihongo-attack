import React from 'react'
import { useGame } from '@/contexts/game-context'
import { useUser } from '@/contexts/user-context'
import Link from 'next/link'

type LevelUpProps = {
    winMessage: {
        message: string;
        style: any;
    };
    nextLevel: () => void;
}


export default function LevelUp({winMessage, nextLevel}: LevelUpProps) {
    const { user } = useUser();
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-black/60 fixed inset-0 z-[999] gap-5">
          <h2 className="text-4xl text-white text-center"
          style={
            winMessage.style
          }
          >{winMessage.message}</h2>
          <button
            className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
            onClick={() => nextLevel()}
          >
            Next Level
          </button>
          {user && (
            <Link
              className="bg-white/90 py-4 px-6 rounded-md text-black  hover:bg-white"
              href="/levels"
            >
              Level Select
            </Link>
          )}
        </div>
      );
}
