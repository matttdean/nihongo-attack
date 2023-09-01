"use client";
import React from "react";
import { useGame } from "../contexts/game-context";
import { useUser } from "../contexts/user-context";

export default function UI() {
  const { score, target, health, gameState, streak, streakCounter } = useGame();
  const { user, setUser } = useUser();

  if (gameState !== "playing") return null;


  return (
    <div className="w-full flex justify-center items-center text-4xl absolute py-5 z-50 bg-black/30 top-0 backdrop-blur-sm">
      <div className="flex text-white w-[104px] -mr-1 bg-white/40 ring-1 ring-white rounded-sm relative h-[60px]">
        <div className="text-zinc-900 p-1">{score}</div>
        <div className="w-full ring-1  p-[0.1rem] bg-white/20 ring-white/80 absolute bottom-0 z-10">
        <div className={`h-[10px] rounded-sm bg-white/80 w-streak-${streakCounter} relative z-10`}></div>
        </div>
      </div>
      <div className="bg-white w-auto h-auto flex flex-col justify-center items-center p-6 text-center rounded-md relative z-10 border-2 border-black">
        <div>{target.sound}</div>
        <div className="text-xs">{user && user.name}</div>
      </div>
      <div className="flex  text-white/90 w-[104px] -ml-1">
        <div className="w-full ring-1 rounded-sm p-[0.1rem] bg-white/20 ring-white/80">
            <div className={`h-[60px] flex-grow-0 rounded-sm w-health-${health}`}></div>
        </div>
      </div>
    </div>
  );
}
