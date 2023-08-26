"use client";

import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/game-context";
import Card from "./card";
import { generateCards } from "../lib/generateCard";
import { levelData } from "../lib/level-data";

type Card = {
  symbol: string;
  position: string;
  delay: number;
  handleClick: (e: any) => void;
};

type Cards = {
  symbol: string;
  position: any;
};

export default function Cards() {
  const [cards, setCards] = useState<any>({});
  const {
    score,
    setScore,
    target,
    setTarget,
    health,
    setHealth,
    gameState,
    setGameState,
    level,
    setLevel,
  } = useGame();



  useEffect(() => {
    const levelNumberofCards = levelData[level - 1].numberOfCards;
    const levelSymbols = levelData[level - 1].symbols;
    const levelTarget = levelData[level - 1].target;
    setCards(generateCards(levelNumberofCards, levelSymbols));
    setTarget(levelTarget);
    setHealth(3);
    if (level === 5) {
        setGameState("won");
      }
  }, [level, setTarget, setHealth, setGameState]);

  const restart = () => {
    setScore(0);
    setGameState("playing");
    setHealth(3);
  };
  const nextLevel = () => {
    setScore(0);
    setGameState("playing");
    setLevel(level + 1);
  };

  useEffect(() => {
    if (health === 0) {
      setGameState("game-over");
    }
  }, [health, setGameState]);

  useEffect(() => {
    if (score === 5) {
      setGameState("level-up");
    }
  }, [score, setGameState]);

  const handleClick = (e: any) => {
    if (e.target.innerText === target.symbol) {
      e.target.parentElement.classList.add("correct-animation");
      e.target.classList.add("correct");
      setScore(score + 1);
    } else if (e.target.innerText !== target.symbol) {
      e.target.parentElement.classList.add("incorrect-animation");
      e.target.classList.add("incorrect");
      setHealth(health - 1);
    }
  };
  if (gameState === "playing") {
    return (
      <>
        {cards.map((card: Card, index: number) => (
          <Card
            key={index}
            symbol={card.symbol}
            position={card.position}
            delay={index}
            handleClick={handleClick}
          />
        ))}
      </>
    );
  } else if (gameState === "paused") {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black/60 absolute z-[999]">
        <button
          className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
          onClick={() => setGameState("playing")}
        >
          Start
        </button>
      </div>
    );
  } else if (gameState === "game-over") {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black/60 absolute z-[999]">
        <button
          className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
          onClick={() => restart()}
        >
          Retry
        </button>
      </div>
    );
  } else if (gameState === "level-up") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black/60 absolute z-[999] gap-5">
        <h2 className="text-4xl text-white">すごい！</h2>
        <button
          className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
          onClick={() => nextLevel()}
        >
          Next Level
        </button>
      </div>
    );
  } else if (gameState === "won") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-green-900/60 absolute z-[999] gap-5">
        <h2 className="text-4xl text-white text-center">You Won!</h2>
        <h2 className="text-4xl text-white text-center">日本語上手!</h2>
      </div>
    );
  }
}
