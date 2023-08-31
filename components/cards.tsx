import React from 'react'
import Card from './card'

type Card = {
    symbol: string;
    position: string;
    delay: number;
    handleClick: (e: any) => void;
  };

export default function Cards({ cards, subtractHealth}: any) {
    return (
        <>
          {cards.map((card: Card, index: number) => (
            <Card
              key={index}
              symbol={card.symbol}
              position={card.position}
              delay={index}
              subtractHealth={subtractHealth}
            />
          ))}
        </>
      );
}
