'use client'
import React from 'react'
import { useGame } from '../contexts/game-context';

export default function UI() {
    const {score, target, health} = useGame();
    
  return (
    <div className='w-full flex justify-evenly items-center text-4xl absolute py-5 z-50 bg-black/30 top-0 backdrop-blur-sm'>
        <div className='flex flex-col text-white/90'><h2 className='text-lg'>Score</h2>{score}</div>
        <div className='bg-white w-14 h-14 flex justify-center items-center pb-1 text-center rounded-full'>{target.sound}</div>
        <div className='flex flex-col  text-white/90'><h2 className='text-lg'>Health</h2>{health}</div>
    </div>
  )
}
