"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/game-context";

export default function Starting() {
  const [countDown, setCountDown] = useState(3);
  const { setGameState } = useGame();
  
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    } else if (countDown === 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }  
    else {
      setGameState("playing");

    }
  }, [countDown, setGameState]);

  return (
    <motion.div 
    initial={{ y: 50 }}
    animate={{ y: 0 }}
    exit={{ y: 50 }}
    className="h-screen w-full flex justify-center items-center bg-black/60 text-white text-6xl">
      {countDown > 0 ? countDown : "Go!"}
    </motion.div>
  );
}
