"use client";

import React, { useEffect, useState, useRef, use } from "react";
import { useGame } from "../contexts/game-context";
import { useUser, logout, updatePrefs, checkUser } from "../contexts/user-context";
import { generateCards } from "../lib/generateCard";
import { levelData } from "../lib/level-data";
import { useRouter } from "next/navigation";
import MainMenu from "./main-menu";
import Cards from "./cards";
import GameOver from "./game-over";
import LevelUp from "./level-up";
import NextSection from "./next-section";
import LoadingScreen from "./loading-screen";
import Starting from "./starting";


type Game = {
  symbol: string;
  position: any;
};


const winMessages = [{message: "Perfect!", style: { color: 'green'}}, {message: "Good Job!", style: { color: 'yellow'}}, {message: "You need to study more!", style: { color: 'red'}}]

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
    setLevel,
    streak,
    setStreak,
    streakCounter,
    setStreakCounter
  } = useGame();

  const { user, setUser, loading, setLoading } = useUser();
  const router = useRouter();


  useEffect(() => {
    setLoading(true);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const levelNumberofCards = levelData[level - 1].numberOfCards;
    const levelSymbols = levelData[level - 1].symbols;
    const levelTarget = levelData[level - 1].target;
    setCards(generateCards(levelNumberofCards, levelSymbols));
    setTarget(levelTarget);
    // if(level  >  1) {
    //   setGameState("starting");
    // }
    setHealth(3);
    setStreak(0);
    setStreakCounter(0);
  }, [level, setTarget, setHealth, setGameState, setStreak, setStreakCounter]);

  const restart = () => {
    setScore(0);
    setGameState("starting");
    setHealth(3);
    setStreak(0);
    setStreakCounter(0);
  };

  

  const nextLevel = () => {
    setGameState("paused");
    setScore(0);
    setLevel(level + 1);
    setStreak(0);
    setStreakCounter(0);
    router.push("/level-intro");
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
    setStreak(0);
    setStreakCounter(0);
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
      setStreak(0);
      setStreakCounter(0);
    }
    if (health === 3) {
      setWinMessage(winMessages[0]);
    } else if (health === 2) {
      setWinMessage(winMessages[1]);
    } else if (health === 1) {
      setWinMessage(winMessages[2]);
    }
  }, [health, setGameState, setScore, setHealth, setStreak, setStreakCounter, setWinMessage]);

  useEffect(() => {
    if (score === 20) {
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
    if (score > 0) {
      
      setStreakCounter(streakCounter + 1);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, setGameState]);

  useEffect(() => {
    if (streakCounter === 5) {
      setStreak(streak + 1);
    }
    if (streakCounter === 10) {
      setStreak(streak + 1);
    }
    if (streakCounter === 15) {
      setStreak(streak + 1);
    }   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streakCounter]);

  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  if (gameState === "playing") {
    return (
      <Cards cards={cards} subtractHealth={subtractHealth}/>
    );
  } else if (gameState === "main-menu") {
    return (
      <MainMenu />
    );
  } else if (gameState === "starting") {
    return (
     <Starting />
    );
  } else if (gameState === "game-over") {
    return (
      <GameOver restart={restart}/>
    );
  } else if (gameState === "level-up") {
    return (
      <LevelUp nextLevel={nextLevel} winMessage={winMessage}/>
    );
  } else if (gameState === "won") {
    return (
      <NextSection nextLevel={nextLevel} />
    );
  }
  else if (gameState === "paused") {
    return (
      <div className="w-full h-screen bg-zinc-800"></div>
    )
  }
}
