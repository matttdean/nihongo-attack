"use client";
import React, { useEffect, useRef } from "react";
import { useGame } from "@/contexts/game-context";
import MainMenu from "./main-menu";
import UI from "./ui";
import Game from "./game";

export default function GameSection() {
    const damageRef =  useRef<HTMLDivElement>(null);
        
  return (
    <div ref={damageRef} className="w-full min-h-screen max-h-screen">
      <UI />
      <Game damageRef={damageRef}/>
    </div>
  );
}
