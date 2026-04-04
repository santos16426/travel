"use client";

import {
  googleDriveThumbnailUrl,
  heroBackgroundDriveFileId,
} from "@/lib/images/google-drive";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Camera, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundSrc = googleDriveThumbnailUrl(
    heroBackgroundDriveFileId,
    1920,
  );
  const [backgroundFailed, setBackgroundFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yHeroImg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[110vh] w-full items-center justify-center overflow-hidden bg-black"
    >
      <motion.div style={{ y: yHeroImg }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/90"
          aria-hidden
        />
        {!backgroundFailed ? (
          <Image
            src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
            unoptimized
            aria-hidden
            onError={() => setBackgroundFailed(true)}
          />
        ) : null}
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity, y: yHeroText }}
        className="relative z-20 max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          {/* <MapPin size={12} className="text-white/40" /> */}
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/50">
            Carpe Diem
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
        </motion.div>

        <div className="relative inline-block">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-[12vw] font-black leading-[0.85] tracking-tighter md:text-[8vw]"
          >
            Where&apos;s Lucas?
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-12 flex flex-col items-center gap-12"
        >
          <p className="max-w-md text-sm md:text-lg font-light text-white/50 leading-relaxed tracking-tight uppercase">
            Not the destinations—just everything in between. Where I go when I’m
            offline.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-px bg-gradient-to-b from-white to-transparent" />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
            >
              <ArrowDown size={18} className="text-white/30" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-12 hidden flex-col gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 lg:flex">
        <div className="flex items-center gap-3">
          <Camera size={14} /> <span>Iphone 14 Pro Max</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={14} /> <span>Dubai Safari</span>
        </div>
      </div>
    </section>
  );
}
