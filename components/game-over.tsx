import React from 'react'
import Link from 'next/link'
import { useUser } from '@/contexts/user-context';

type GameOverProps = {
    restart: () => void;
}

export default function GameOver({ restart }: GameOverProps) {
    const { user } = useUser();
    return (
        <div className="flex justify-center items-center bg-black/60 fixed inset-0 z-[999] gap-5">
          <button
            className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
            onClick={() => restart()}
          >
            Retry
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
