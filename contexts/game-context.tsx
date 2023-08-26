'use client';

import { type } from 'os';
import React, { useState, useEffect, createContext, useContext } from 'react'


type gameState = "paused" | "playing" | "game-over" | "level-up" | "won";

type GameContextProviderProps = {
    children: React.ReactNode;
}

type GameContextType = {  
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    target: {symbol: string, sound: string};
    setTarget: React.Dispatch<React.SetStateAction<{symbol: string, sound: string}>>;
    health: number;
    setHealth: React.Dispatch<React.SetStateAction<number>>;
    level: number;
    setLevel: React.Dispatch<React.SetStateAction<number>>;
    gameState: "paused" | "playing" | "game-over" | "level-up"| "won";
    setGameState: React.Dispatch<React.SetStateAction<gameState>>;
}

const GameContext = createContext<GameContextType | null>(null);

export default function GameContextProvider({ children}: GameContextProviderProps) {

    const [score, setScore] = useState<number>(0);
    const [target, setTarget] = useState({symbol: "あ", sound: "a"});
    const [health, setHealth] = useState<number>(3);
    const [level, setLevel] = useState<number>(1);
    const [gameState, setGameState] = useState<gameState>("paused");

  return (
    <GameContext.Provider value={{
        score,
        setScore,
        target,
        setTarget,
        health,
        setHealth,
        level,
        setLevel,
        gameState,
        setGameState
    }}>
        {children}
    </GameContext.Provider>
  )
}

export function useGame() {
    const context = useContext(GameContext)

    if (context === null){
        throw new Error("useGame must be used within a GameContextProvider");
    }
    return context;
}