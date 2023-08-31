"use client";

import React, { useEffect } from "react";
import { useUser, checkUser,  logout } from "@/contexts/user-context";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/contexts/game-context";

export default function Account() {
  const { user, setUser, loading, setLoading } = useUser();
  const { setGameState } = useGame();
    const router = useRouter();

  useEffect(() => {
    checkUser()
      .then((user) => {
        if (user === null) {
          setLoading(false);
          return;
        }
        setUser({
          id: user.$id,
          email: user.email,
          name: user.name,
          prefs: user.prefs,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setGameState("main-menu");
    router.push("/");
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-full flex justify-center items-center bg-black/60 text-white text-3xl"
        ></motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-wrap gap-5 p-6"
        >
          <h1>Account</h1>
          <p className="w-full">Name: {user?.name}</p>
          <p className="w-full">Email: {user?.email}</p>
          <p className="w-full">
            Levels Unlocked: {user?.prefs.unLockedLevels}
          </p>
          <button 
          onClick={handleLogout}
          className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32 flex justify-center items-center">
            Logout
          </button>
          <Link
            href="/levels"
            className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32 text-center"
          >
            Level Select
          </Link>
          <button className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32">
            Change Password
          </button>
          <button className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32">
            Delete Account
          </button>
        </motion.div>
      )}
    </>
  );
}
