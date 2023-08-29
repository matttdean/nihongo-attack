"use client";

import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/game-context";
import { useUser, logout, updatePrefs, checkUser } from "../contexts/user-context";
import Card from "./card";
import { generateCards } from "../lib/generateCard";
import { levelData } from "../lib/level-data";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Card = {
  symbol: string;
  position: string;
  delay: number;
  handleClick: (e: any) => void;
};

type Game = {
  symbol: string;
  position: any;
};

export default function Game({ damageRef }: { damageRef: any }) {
  const [cards, setCards] = useState<any>({});
  const [winMessage, setWinMessage] = useState<any>({});
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
    setLevel
  } = useGame();

  const { user, setUser, loading, setLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if(user !== null) {
      setLoading(false);
      return;
    }

    checkUser().then((user) => {
      if (user === null) {
          setLoading(false);
          return;
      }
      setUser({id: user.$id, email: user.email, name: user.name, prefs: user.prefs});
      if (gameState === "main-menu" && user !== null) {
      router.push("/levels");
      }
      setLoading(false);
  }).catch((error) => {
      setLoading(false);
  })
    
    if (gameState === "main-menu" && user !== null) {
      setLevel(user.prefs.unLockedLevels);
    }

  }, []);


  useEffect(() => {
    const levelNumberofCards = levelData[level - 1].numberOfCards;
    const levelSymbols = levelData[level - 1].symbols;
    const levelTarget = levelData[level - 1].target;
    setCards(generateCards(levelNumberofCards, levelSymbols));
    setTarget(levelTarget);
    setHealth(3);
  }, [level, setTarget, setHealth, setGameState]);

  const restart = () => {
    setScore(0);
    setGameState("playing");
    setHealth(3);
  };

  const winMessages = [{message: "Perfect!", style: { color: 'green'}}, {message: "Good Job!", style: { color: 'yellow'}}, {message: "You need to study more!", style: { color: 'red'}}]

  const nextLevel = () => {
    setScore(0);
    setGameState("playing");
    setLevel(level + 1);
  };
  const handleLogout = async () => {
    try {
      const loggedOutUser = await logout();
      setUser(null);
      setGameState("main-menu");
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePrefs = async () => {
    try {
      const prefs = await updatePrefs({ unLockedLevels: level + 1 });
      setUser({ ...user, prefs: prefs.prefs });
      setScore(0);
    } catch (error) {
      console.log(error);
    }
  };


  const subtractHealth = () => {
    setHealth(health - 1);
    damageRef.current.classList.add("headShake");
    setTimeout(() => {
      if (damageRef.current) {
        damageRef.current.classList.remove("headShake");
      }
    }, 600);
  };

  useEffect(() => {
    if (health === 0) {
      setGameState("game-over");
      setScore(0);
      setHealth(3);
    }
    if (health === 3) {
      setWinMessage(winMessages[0]);
    } else if (health === 2) {
      setWinMessage(winMessages[1]);
    } else if (health === 1) {
      setWinMessage(winMessages[2]);
    }
  }, [health, setGameState]);

  useEffect(() => {
    if (score === 5) {
      if (
        level === 5 ||
        level === 10 ||
        level === 15 ||
        level === 20 ||
        level === 25 ||
        level === 30 ||
        level === 35 ||
        level === 40 ||
        level === 45 ||
        level === 50 ||
        level === 55 ||
        level === 60 ||
        level === 65 ||
        level === 70 ||
        level === 75 ||
        level === 80 ||
        level === 85 ||
        level === 90 ||
        level === 95 ||
        level === 100
      ) {
        setGameState("won");
      } else {
        setGameState("level-up");
      }
      setScore(0);
      if (user) {
      if (level === user.prefs.unLockedLevels) {
        handleUpdatePrefs();
      } 
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, setGameState]);

  const handleClick = (e: any) => {
    if (e.target.innerText === target.symbol) {
      e.target.parentElement.classList.add("correct-animation");
      e.target.classList.add("correct");
      setScore(score + 1);
    } else if (e.target.innerText !== target.symbol) {
      e.target.parentElement.classList.add("incorrect-animation");
      e.target.classList.add("incorrect");
      subtractHealth();
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
            subtractHealth={subtractHealth}
          />
        ))}
      </>
    );
  } else if (gameState === "main-menu") {
    return (
      <>
      { loading ? (<div className="w-full h-screen flex justify-center items-center bg-black/60 fixed inset-0 z-[999] gap-5"></div>) :

      <div className="w-full h-screen flex flex-col gap-10 items-center sm:justify-center bg-zinc-800 fixed inset-0 z-[999]">
        <div className="flex flex-col gap-10 justify-center items-center w-10/12 mt-[40%] sm:mt-0  max-w-[40rem] h-[20rem] bg-zinc-950 rounded-md">
          <h1 className="text-white text-5xl text-center font-semibold">
            NIHONGO ATTACK
          </h1>
          <div className="flex gap-5">
            {user ? (
              <>
                <Link
                  className="bg-white/90 py-4 px-6 rounded-md text-black  hover:bg-white"
                  href="/levels"
                >
                  Level Select
                </Link>
                <button
                className="bg-white/90 py-4 px-6 rounded-md  hover:bg-white"
                onClick={() => handleLogout()}
              >
                Log out
              </button>
            </>
            ) : (
              <button
                className="bg-white/90 py-4 px-6 rounded-md  hover:bg-white"
                onClick={() => setGameState("playing")}
              >
                Play
              </button>
            )}
            {!user && (
              <Link
                href="/login"
                className="bg-white/90 py-4 px-6 rounded-md  hover:bg-white"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
      }
      </>
    );
  } else if (gameState === "paused") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-800 fixed inset-0 z-[999] gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-zinc-300 text-2xl">Target</div>
          <span className="text-white text-8xl bg-zinc-700 rounded-md p-4">{target && target.symbol}</span>
          <p className="text-zinc-200 text-xl">Sound: {target.sound}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
            onClick={() => setGameState("playing")}
          >
            Start
          </button>
          {user && (
            <Link
              className="bg-white/80 py-4 px-6 rounded-md text-black  hover:bg-white"
              href="/levels"
            >
              Level Select
            </Link>
          )} 
        </div>
      </div>
    );
  } else if (gameState === "game-over") {
    return (
      <div className="flex justify-center items-center bg-black/60 fixed inset-0 z-[999] gap-5">
        <button
          className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
          onClick={() => restart()}
        >
          Retry
        </button>
        {user && (
          <Link
            className="bg-white/90 py-4 px-6 rounded-md text-black  hover:bg-white"
            href="/levels"
          >
            Level Select
          </Link>
        )}
      </div>
    );
  } else if (gameState === "level-up") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black/60 fixed inset-0 z-[999] gap-5">
        <h2 className="text-4xl text-white text-center"
        style={
          winMessage.style
        }
        >{winMessage.message}</h2>
        <button
          className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
          onClick={() => nextLevel()}
        >
          Next Level
        </button>
        {user && (
          <Link
            className="bg-white/90 py-4 px-6 rounded-md text-black  hover:bg-white"
            href="/levels"
          >
            Level Select
          </Link>
        )}
      </div>
    );
  } else if (gameState === "won") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-green-900/60 fixed inset-0 z-[999] gap-5">
        <h2 className="text-4xl text-white text-center">日本語上手!</h2>
        <h2 className="text-4xl text-white text-center">
          Time for the Next Section!
        </h2>
        <button
          className="bg-white/80 py-4 px-6 rounded-md  hover:bg-white"
          onClick={() => nextLevel()}
        >
          Next Section
        </button>
        {user && (
          <Link
            className="bg-white/90 py-4 px-6 rounded-md text-black  hover:bg-white"
            href="/levels"
          >
            Level Select
          </Link>
        )}
      </div>
    );
  }
}
