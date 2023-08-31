"use client";
import React from "react";
import { useGame } from "@/contexts/game-context";
import Link from "next/link";
import { useUser } from "@/contexts/user-context";
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const { setGameState } = useGame();
  const { loading } = useUser();
  const router = useRouter();

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center bg-black/60 fixed inset-0 z-[999] gap-5"></div>
      ) : (
        <div className="w-full h-screen flex flex-col gap-10 items-center sm:justify-center bg-zinc-800 fixed inset-0 z-[999]">
          <div className="flex flex-col gap-10 justify-center items-center w-10/12 mt-[40%] sm:mt-0  max-w-[40rem] h-[20rem] bg-zinc-950 rounded-md">
            <h1 className="text-white text-5xl text-center font-semibold">
              NIHONGO ATTACK
            </h1>
            <div className="flex gap-5">
              <button
                className="bg-white/90 py-4 px-6 rounded-md  hover:bg-white"
                onClick={() => router.push("/level-intro")}
              >
                Play
              </button>
              <Link
                href="/login"
                className="bg-white/90 py-4 px-6 rounded-md  hover:bg-white"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
