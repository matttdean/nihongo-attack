"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../contexts/game-context";

type CardProps = {
  position: string;
  symbol: string;
  delay: number;
  handleClick: (e: any) => void;
  subtractHealth: () => void;
};

export default function Card({
  position,
  symbol,
  delay,
  handleClick,
  subtractHealth,
}: CardProps) {
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const [cardPosition, setCardPosition] = useState(0);
  const { target, health, setHealth, streak } = useGame();
  const wasClicked = useRef(false);

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
        className={`w-20 h-28 card absolute z-10 bg-white rounded-md ${position}`}
        style={{ animationDelay: `${delay}s`} }
      >
        <div
          onClick={(e) => {
            handleClick(e);
            wasClicked.current = true;
          }}
          className={`text-black text-3xl font-semibold text-center cursor-pointer w-20 h-28 bg-white rounded-md flex justify-center items-center absolute z-10`}
        >
          {symbol}
        </div>
        { streak  > 0  && <div className={`w-20 h-28 streak-${streak} blur-lg absolute z-0`}></div> }
      </div>
    );
  }
}
