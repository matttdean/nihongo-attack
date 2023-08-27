'use client'
import React from 'react'
import { useGame } from "@/contexts/game-context";
import Link from "next/link";

export default function MainMenu() {
    const {gameState, setGameState} = useGame();
  return (
    <main className="w-[80rem] max-w-full min-h-screen max-h-screen relative overflow-hidden overscroll-none flex justify-center items-center bg-zinc-600">
    <button
      onClick={() => setGameState('playing')}
      className="px-4 py-3 rounded-md flex justify-center items-center bg-white"
    >
      Let&apos;s Begin
    </button>
</main>
  )
}
