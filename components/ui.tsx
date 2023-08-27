'use client'
import React from 'react'
import { useGame } from '../contexts/game-context';
import { useUser } from '../contexts/user-context';

export default function UI() {
    const {score, target, health, gameState} = useGame();
    const {user, setUser} = useUser();

    if(gameState === "main-menu") return null;
    console.log(user)

  return (
    
    <div className='w-full flex justify-evenly items-center text-4xl absolute py-5 z-50 bg-black/30 top-0 backdrop-blur-sm'>
        <div className='flex flex-col text-white/90'><h2 className='text-lg'>Score</h2>{score}</div>
        <div className='bg-white w-auto h-auto flex flex-col justify-center items-center p-6 text-center rounded-full'><div>{target.sound}</div><div className='text-xs'>{user && user.name}</div></div>
        <div className='flex flex-col  text-white/90'><h2 className='text-lg'>Health</h2>{health}</div>
    </div>
  )
}
