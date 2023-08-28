"use client";

import React from "react";
import { useUser } from "@/contexts/user-context";

export default function Account() {
  const { user, loading } = useUser();
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-5 p-6">
          <h1>Account</h1>
          <p className="w-full">Name: {user?.name}</p>
          <p className="w-full">Email: {user?.email}</p>
          <p className="w-full">
            Levels Unlocked: {user?.prefs.unLockedLevels}
          </p>
          <button className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32">
            Logout
          </button>
          <button className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32">
            Main Menu
          </button>
          <button className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32">
            Change Password
          </button>
          <button className="bg-white/90 py-4 px-6 rounded-md hover:bg-white m-2 w-32">
            Delete Account
          </button>
        </div>
      )}
    </>
  );
}
