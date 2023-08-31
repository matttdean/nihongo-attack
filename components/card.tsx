"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../contexts/game-context";

type CardProps = {
  position: string;
  symbol: string;
  delay: number;
  subtractHealth: () => void;
};

export default function Card({
  position,
  symbol,
  delay,
  subtractHealth,
}: CardProps) {
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const [cardPosition, setCardPosition] = useState(0);
  const [correct, setCorrect] = useState<boolean>();
  const { target, health, setHealth, streak, score, setScore } = useGame();
  const wasClicked = useRef(false);

  const handleClick = (e: any) => {
    if (e.target.innerText === target.symbol) {
    //   e.target.parentElement.classList.add("correct-animation");
      e.target.classList.add("correct");
      setCorrect(true);
      setScore(score + 1);
    } else if (e.target.innerText !== target.symbol) {
    //   e.target.parentElement.classList.add("incorrect-animation");
      e.target.classList.add("incorrect");
      setCorrect(false);
      subtractHealth();
    }
  };

  useEffect(() => {
    cardHitBottom(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (symbol === target.symbol && isBottom && !wasClicked.current) {
      subtractHealth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, isBottom]);



  const cardHitBottom = (delay: number) => {
    setTimeout(() => {
      setIsBottom(true);
    }, 5000 + 1000 * delay);
  };

  if (!isBottom) {
    return (
      <div
        className={`w-20 h-28 card absolute z-10 rounded-md ${position} after-health-${health} ${correct}-animation`}
        style={{ animationDelay: `${delay}s`} }
      >
        <div
          onClick={(e) => {
            handleClick(e);
            wasClicked.current = true;
          }}
          className={`text-black text-3xl font-semibold text-center cursor-pointer w-20 h-28 health-${health} rounded-md flex justify-center items-center absolute z-10`}
        >
          {symbol}
        </div>
        { streak  > 0  && <div className={`w-20 h-28 streak-${streak} absolute z-0`}></div> }
        { health  < 2  && <div className={`w-20 h-28 absolute z-0 bg-red-500 animate-ping blur-md`}></div> }
      </div>
    );
  }
}
