"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useUser, checkUser, logout } from "@/contexts/user-context";
import { useGame } from "@/contexts/game-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { symbols } from "@/lib/level-data";

const skillMessage = [
     "beginner",
    "intermediate",
    "expert",
    "master",
    "legend",
    "god"
]

export default function Levels() {
  const { user, setUser, loading, setLoading } = useUser();
  const { setGameState, setLevel } = useGame();
  const [levels, setLevels] = useState<any>([]);
  const [currentLevels, setCurrentLevels] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [notLastPage, setNotLastPage] = useState<boolean>(true);
  const [needsPagination, setNeedsPagination] = useState<boolean>(false);
  const [skill,  setSkill] = useState<number>(0);
  const router = useRouter();

  const buildLevels = (prefs: any) => {
    setPage(1);
    let newLevels: any = [];
    for (let i = 0; i < prefs; i++) {
      newLevels.push({ level: i + 1, symbol: symbols[i] });
    }
    setLevels(newLevels);

    const newCurrentLevels = newLevels.filter((level: any) => level.level < 10);
    if (newLevels.length > 9) {
      setNeedsPagination(true);
    }

    setCurrentLevels(newCurrentLevels);
  };

  useEffect(() => {
    setLoading(true);
    const checkUserAndBuildLevels = async () => {
      try {
        const user = await checkUser();
        if (user) {
          setUser({
            id: user.$id,
            email: user.email,
            name: user.name,
            prefs: user.prefs,
          });
          buildLevels(user.prefs.unLockedLevels);
          if (user.prefs.unLockedLevels >= 10) {
            setSkill(1);
          } else if (user.prefs.unLockedLevels >= 15) {
            setSkill(2);
            } else if (user.prefs.unLockedLevels >= 25) {
                console.log(user.prefs.unLockedLevels);
                setSkill(3);
            } else if (user.prefs.unLockedLevels >= 35) {
                setSkill(4);
            } else if (user.prefs.unLockedLevels >= 40) {
                setSkill(5);
            }

          setLoading(false);
        } else {
          console.log("no user");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserAndBuildLevels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setGameState("main-menu");
    router.push("/");
  };

  useEffect(() => {
    if (user !== null && currentLevels.length > 0) {
      if (
        currentLevels[currentLevels.length - 1].level <
        user.prefs.unLockedLevels
      ) {
        setNotLastPage(true);
      } else {
        setNotLastPage(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
    // exit={{ opacity: 0}}
    className="w-full h-screen flex justify-center items-center bg-zinc-600  gap-5"
    >
      {!loading && (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="absolute top-5 left-5 right-5 flex gap-2  bg-zinc-300 p-3 flex-wrap rounded-md">
            <div className="basis-full text-xl">{user && user.name }</div>
            <div className="text-sm"> {skillMessage[skill]} </div>
            <Link href='/account' className=" underline mr-0 ml-auto text-sm hover:text-amber-700">
              account details
            </Link>
              
          </div>
          <div className="flex flex-col justify-center items-center min-h-[460px] gap-5">
            <h1 className="text-4xl text-white/90">Choose a level</h1>
            <motion.div 
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            // transition={{ delay: 0.5 }}
            className="grid grid-cols-3 min-h-[216px] ">
              {currentLevels.map(({ level, symbol }: any, index: number) => (
                <Link href={`/level-intro`} key={level}>
                  <motion.button
                    // initial={{ y: 25, opacity: 0 }}
                    // animate={{ y: 0, opacity: 1 }}
                    // transition={{ delay: index * 0.1 }}
                    className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 col-span-1"
                    onClick={() => {
                      setLevel(level);
                    }}
                  >
                    {symbol}
                  </motion.button>
                </Link>
              ))}
            </motion.div>
            <div className="h-[64px] flex justify-center items-center">
              {page > 1 && (
                <button
                  onClick={() => {
                    const newPageAmount = page - 1;
                    let newCurrentLevels: any = [];

                    if (page === 2) {
                      newCurrentLevels = levels.filter(
                        (level: any) => level.level <= 9
                      );
                    } else {
                      newCurrentLevels = levels.filter(
                        (level: any) =>
                          level.level <= newPageAmount * 9 &&
                          level.level > (newPageAmount - 1) * 9
                      );
                    }
                    setCurrentLevels(newCurrentLevels);
                    setPage(page - 1);
                  }}
                  className="bg-white/90 py-1 px-2 rounded-md hover:bg-white m-2 h-8"
                >
                  {"<"}
                </button>
              )}
              {notLastPage && needsPagination && (
                <button
                  onClick={() => {
                    const newPageAmount = page + 1;
                    const newCurrentLevels = levels.filter(
                      (level: any) =>
                        level.level <= newPageAmount * 9 &&
                        level.level > page * 9
                    );
                    setCurrentLevels(newCurrentLevels);
                    setPage(page + 1);
                  }}
                  className="bg-white/90 py-1 px-2 rounded-md hover:bg-white m-2 h-8"
                >
                  {">"}
                </button>
              )}
            </div>
            <Link
              onClick={() => handleLogout()}
              className="bg-white/90 py-4 px-6 rounded-md text-black hover:bg-white"
              href="/"
            >
              Log out
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
