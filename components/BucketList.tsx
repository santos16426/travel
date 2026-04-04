"use client";

import {
  bucketAdventures,
  bucketDestinations,
  type BucketAdventureDef,
} from "@/features/travel/data/bucket-list";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Flame,
  Globe,
  MapPin,
  RectangleGoggles,
  Wind,
  Zap,
} from "lucide-react";
import { Playfair_Display } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700"],
});

const adventureIcons: Record<BucketAdventureDef["icon"], LucideIcon> = {
  wind: Wind,
  zap: Zap,
  flame: Flame,
  goggles: RectangleGoggles,
};

export interface BucketListProps {
  /** Section anchor (e.g. matches `#horizon` nav link). */
  sectionId?: string;
}

export function BucketList({ sectionId = "horizon" }: BucketListProps) {
  return (
    <section id={sectionId}>
      <div className="mx-auto max-w-7xl px-6 md:px-20 mb-20">
        <div className="mb-18 md:mb-32 flex items-center gap-4 w-full justify-center">
          <div className="w-8 h-[1px] bg-white/20" />

          <h2
            className={`text-6xl font-normal tracking-tighter text-white uppercase italic md:text-8xl ${playfair.className}`}
          >
            Bucket List
          </h2>
          <div className="w-8 h-[1px] bg-white/20" />
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
          <div className="space-y-12 lg:w-1/2">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4 text-white/20">
              <Globe size={16} aria-hidden />
              <span className="text-[10px] font-black tracking-widest uppercase">
                Countries
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {bucketDestinations.map((dest, i) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-48 cursor-pointer overflow-hidden border border-white/5 bg-stone-900 md:h-64"
                >
                  <Image
                    width={100}
                    height={100}
                    src={dest.img}
                    alt={dest.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="flex items-end justify-between overflow-hidden">
                      <div className="translate-y-10 transition-transform duration-500 ease-out group-hover:translate-y-0">
                        <h3 className={`text-4xl leading-none font-normal`}>
                          {dest.name}
                        </h3>
                      </div>
                      <motion.div className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <ArrowUpRight
                          size={24}
                          className="text-white"
                          aria-hidden
                        />
                      </motion.div>
                    </div>
                    {dest.description ? (
                      <p className="mt-4 text-[10px] font-light tracking-[0.2em] text-stone-400 uppercase opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        {dest.description}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12 lg:w-1/2">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4 text-white/20">
              <MapPin size={16} aria-hidden />
              <span className="text-[10px] font-black tracking-widest uppercase">
                Activities
              </span>
            </div>

            <div className="space-y-4">
              {bucketAdventures.map((adv, i) => {
                const Icon = adventureIcons[adv.icon];
                return (
                  <motion.div
                    key={adv.activity}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center justify-between border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04] md:p-8"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-white/20 transition-colors group-hover:text-white">
                        <Icon size={20} aria-hidden />
                      </div>
                      <h3
                        className={`text-3xl tracking-tighter text-white uppercase md:text-4xl ${playfair.className}`}
                      >
                        {adv.activity}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-white/10 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                      aria-hidden
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
