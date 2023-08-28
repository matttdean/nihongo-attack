import React, { useState } from "react";
import { useUser } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { useGame } from "@/contexts/game-context";
import { account, ID } from "@/appwrite";
import Link from "next/link";

export default function SignupForm() {
  const { user, setUser } = useUser();
  const { setGameState, level } = useGame();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = e.currentTarget;
    try {
      setLoading(true);
      const response = await account.create(
        ID.unique(),
        email.value,
        password.value,
        username.value
      );

      const userAccount = await account.createEmailSession(
        email.value,
        password.value
      );
      if (userAccount) {
        const user = await account.get();
        const prefs = await account.updatePrefs({ unLockedLevels: level });

        setUser({
          id: user.$id,
          email: user.email,
          name: user.name,
          prefs: prefs.prefs,
        });
        setGameState("main-menu");
        router.push("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-11/12">
      <form
        className="sm:w-[30rem] w-full flex flex-col bg-zinc-200 py-6 px-4 gap-2 rounded-md"
        onSubmit={handleSignup}
      >
        <label className="text-sm" htmlFor="username">
          Name
        </label>
        <input
          className="rounded-sm p-2 mb-4"
          type="text"
          name="username"
          id="username"
          placeholder="Name"
        />
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-sm p-2 mb-4"
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-sm p-2 mb-4"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button
          className="rounded-full bg-zinc-700 p-2 text-white flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {!loading ? (
            "Sign Up"
          ) : (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </form>
      <Link href="/login">Back to login</Link>
    </div>
  );
}
