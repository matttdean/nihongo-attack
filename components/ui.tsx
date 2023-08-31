"use client";
import React from "react";
import { useGame } from "../contexts/game-context";
import { useUser } from "../contexts/user-context";

export default function UI() {
  const { score, target, health, gameState, streak, streakCounter } = useGame();
  const { user, setUser } = useUser();

  if (gameState !== "playing") return null;


  return (
    <div className="w-full flex justify-evenly items-center text-4xl absolute py-5 z-50 bg-black/30 top-0 backdrop-blur-sm">
      <div className="flex flex-col text-white/90">
        <h2 className="text-lg">Score</h2>
        <div className="">{score}</div>
        <div className="w-full ring-1 rounded-sm p-[0.1rem] bg-white/20 ring-white/80">
            <div className={`h-2 flex-grow-0 rounded-sm bg-white/80 w-streak-${streakCounter}`}></div>
        </div>
      </div>
      <div className="bg-white/80 w-auto h-auto flex flex-col justify-center items-center p-6 text-center rounded-md">
        <div>{target.sound}</div>
        <div className="text-xs">{user && user.name}</div>
      </div>
      <div className="flex flex-col  text-white/90">
        <h2 className="text-lg">Health</h2>
        <div className="w-full ring-1 rounded-sm p-[0.1rem] bg-white/20 ring-white/80">
            <div className={`h-2 flex-grow-0 rounded-sm w-health-${health}`}></div>
        </div>
      </div>
    </div>
  );
}
