"use client"

import React, { useEffect } from 'react'
import { useGame } from '@/contexts/game-context'
import { useUser } from '@/contexts/user-context'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { levelData } from '@/lib/level-data';

export default function LevelIntroPage() {
    const {target, setTarget, setGameState, level} = useGame();
    const {user} = useUser();

    useEffect(() => {
        setTarget(levelData[level - 1].target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: 50}}
        
        className="w-full h-screen flex flex-col justify-center items-center bg-zinc-800  gap-5">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-zinc-300 text-2xl">Target</div>
            <span className="text-white text-8xl bg-zinc-700 rounded-md p-4">{target && target.symbol}</span>
            <p className="text-zinc-200 text-xl">Sound: {target.sound}</p>
          </div>
          <div className="flex flex-col gap-4  items-center">
            <Link
                href="/"
              className="bg-white/80 py-4 px-6 w-44 rounded-md text-center  hover:bg-white"
              onClick={() => setGameState("starting")}
            >
              Start
            </Link>
            {user && (
              <Link
                className="bg-white/80 py-1 px-2 rounded-md text-black text-center w-32  hover:bg-white"
                href="/levels"
              >
                Level Select
              </Link>
            )} 
          </div>
        </motion.div>
      );
}
