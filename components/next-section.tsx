import React from 'react'
import Link from 'next/link';
import { useUser } from '@/contexts/user-context';

type NextSectionProps = {
    nextLevel: () => void;
}

export default function NextSection({nextLevel}: NextSectionProps) {
    const { user } = useUser();
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-green-900/60 fixed inset-0 z-[999] gap-5">
          <h2 className="text-4xl text-white text-center">日本語上手!</h2>
          <h2 className="text-4xl text-white text-center">
            Time for the Next Section!
          </h2>
          <button
            className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
            onClick={() => nextLevel()}
          >
            Next Section
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
