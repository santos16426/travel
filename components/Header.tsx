"use client";

import { SHOWCASE_SHUFFLE_EVENT } from "@/lib/showcase-shuffle-event";
import { Compass, Zap } from "lucide-react";

export function Header() {
  function handleShuffle() {
    window.dispatchEvent(new Event(SHOWCASE_SHUFFLE_EVENT));
  }

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-[100] flex w-full items-center justify-between p-6 mix-blend-difference md:p-10">
      <div className="pointer-events-auto flex items-center gap-4">
        <Compass size={20} className="text-white/60" />
        <div className="flex flex-col">
          <p className="text-xs font-black uppercase tracking-[0.4em]">
            Where&apos;s Lucas?
          </p>
          <span className="mt-0.5 text-[8px] font-medium tracking-widest text-white/40 italic">
            The World According to Lucas
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Shuffle showcase order"
        onClick={handleShuffle}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-90"
      >
        <Zap size={14} className="fill-current" />
      </button>
    </header>
  );
}
