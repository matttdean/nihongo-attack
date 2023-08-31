'use client';

import React, { useState, createContext, useContext } from 'react'


type gameState = "main-menu" |  "starting" | "playing" | "game-over" | "level-up" | "won";

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
    gameState: "main-menu" | "starting" | "playing" | "game-over" | "level-up"| "won";
    setGameState: React.Dispatch<React.SetStateAction<gameState>>;
    streak: number;
    setStreak: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = createContext<GameContextType | null>(null);

export default function GameContextProvider({ children}: GameContextProviderProps) {

    const [score, setScore] = useState<number>(0);
    const [target, setTarget] = useState({symbol: "あ", sound: "a"});
    const [health, setHealth] = useState<number>(3);
    const [level, setLevel] = useState<number>(1);
    const [gameState, setGameState] = useState<gameState>("main-menu");
    const [streak, setStreak] = useState<number>(0);

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
        setGameState,
        streak,
        setStreak
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