let lastPosition: number;

const generatePosition: any = () => {
  const positions = ["left", "center", "right"];
  let randomPosition = Math.floor(Math.random() * 3);
  if (lastPosition === randomPosition) {
    if (randomPosition === 0) {
      randomPosition = 1;
    } else if (randomPosition === 1) {
      randomPosition = 2;
    } else {
      randomPosition = 0;
    }
  }
  lastPosition = randomPosition;
  return positions[randomPosition];
};

export const generateCards = (numberOfCards: number, symbols: string[]) => {
  let cards = [];
  let previosSymbol = "";
  for (let i = 0; i < numberOfCards; i++) {
    let randomSymbol = Math.floor(Math.random() * symbols.length);
    if (previosSymbol === symbols[randomSymbol]) {
      if (previosSymbol === symbols[symbols.length - 1]) {
        randomSymbol = 0;
      } else {
        randomSymbol++;
      }
    }
    cards.push({
      symbol: symbols[randomSymbol],
      position: generatePosition(),
    });
    previosSymbol = symbols[randomSymbol];
  }
  return cards;
};
