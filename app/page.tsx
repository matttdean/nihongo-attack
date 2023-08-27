import dynamic from "next/dynamic";
import GameContextProvider from "@/contexts/game-context";
import UI from "@/components/ui";
import Link from "next/link";
import GameSection from "@/components/game-section";
import UserContextProvider from "@/contexts/user-context";

const Cards = dynamic(() => import("@/components/game"), { ssr: false });

export default function Home() {
  return (
    <main className="w-[80rem] max-w-full min-h-screen max-h-screen relative overflow-hidden overscroll-none bg-zinc-600">
          <GameSection />
    </main>
  );
}
