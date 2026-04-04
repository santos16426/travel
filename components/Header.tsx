"use client";

import { SHOWCASE_SHUFFLE_EVENT } from "@/lib/showcase-shuffle-event";
import { Zap } from "lucide-react";

function CompassLogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx={12} cy={12} r={10} />
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
    </svg>
  );
}

export function Header() {
  function handleShuffle() {
    window.dispatchEvent(new Event(SHOWCASE_SHUFFLE_EVENT));
  }

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-[100] flex w-full items-center justify-between p-6 mix-blend-difference md:p-10">
      <div className="pointer-events-auto flex items-center gap-4">
        <div
          className="flex shrink-0 items-center justify-center rounded-md border border-white bg-black p-2 mix-blend-normal"
          aria-hidden
        >
          <CompassLogoMark className="size-5 text-white md:size-6" />
        </div>
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
