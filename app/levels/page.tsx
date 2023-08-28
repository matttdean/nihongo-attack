"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/user-context";
import { useGame } from "@/contexts/game-context";





export default function Levels() {
  const { user, loading } = useUser();
  const { setGameState, setLevel } = useGame();
  const [levels, setLevels] = useState<any>([]);

  const symbols = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん","が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ"]
    useEffect(() => {
        if (user) {
            let newLevels:any = [];
            for (let i = 0; i < user.prefs.unLockedLevels; i++) {
            newLevels.push({level: i + 1, symbol: symbols[i]});
            }
            setLevels(newLevels)
        }
    }, [user]);


  return (
    <div>
        { !loading &&
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white/90">Choose a level</h1>
          <div className="flex justify-center items-center flex-wrap">
            { levels.map(({level, symbol}: any) => (
              <Link href={`/`} key={level}>
                <button
                  className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2"
                  onClick={() => {
                    setGameState("paused");
                    setLevel(level);
                  }}
                >
                  {symbol}
                </button>
              </Link>
            ))}
          </div>
          <Link 
          onClick={() => setGameState("main-menu")}
          className="bg-white/90 py-4 px-6 rounded-md text-black hover:bg-white" href="/">Main Menu</Link>
        </div>
      </div>
}
    </div>
  );
}
