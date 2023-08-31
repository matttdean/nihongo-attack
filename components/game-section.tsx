"use client";
import React, { useEffect, useRef } from "react";
import UI from "./ui";
import Game from "./game";
import { motion } from "framer-motion";

export default function GameSection() {
    const damageRef =  useRef<HTMLDivElement>(null);
        
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    ref={damageRef} className="w-full min-h-screen max-h-screen">
      <UI />
      <Game damageRef={damageRef}/>
    </motion.div>
  );
}
