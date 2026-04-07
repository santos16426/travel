"use client";

import type { DriveShowcaseItem, Travel } from "@/features/travel/types";
import {
  googleDriveFileEmbedPreviewUrl,
  googleDriveImageUrl,
  googleDriveThumbnailUrl,
  googleDriveUserContentViewUrl,
} from "@/lib/images/google-drive";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface TravelsProps {
  items: Travel[];
}

const easeOutLightbox = [0.22, 1, 0.36, 1] as const;
const springLightboxMedia = {
  type: "spring" as const,
  damping: 32,
  stiffness: 320,
  mass: 0.85,
};

function expeditionCodeFromId(id: string): string {
  const segment = id.split("-")[1];
  return segment ?? id;
}

function DriveGifImg({
  fileId,
  className = "h-full w-full object-cover",
}: {
  fileId: string;
  className?: string;
}) {
  const sources = [
    googleDriveImageUrl(fileId),
    googleDriveUserContentViewUrl(fileId),
    googleDriveThumbnailUrl(fileId, 900),
  ] as const;
  const [index, setIndex] = useState(0);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- GIF animation; Drive URLs
    <img
      src={sources[index]}
      alt=""
      className={className}
      onError={() => {
        setIndex((i) => (i < sources.length - 1 ? i + 1 : i));
      }}
    />
  );
}

function DriveLightboxStill({
  sources,
  alt,
}: {
  sources: readonly string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Drive full-size URLs; fallback chain
    <img
      src={sources[index]}
      alt={alt}
      className="max-h-[80vh] max-w-full rounded-lg object-contain"
      onError={() => {
        setIndex((i) => (i < sources.length - 1 ? i + 1 : i));
      }}
    />
  );
}

function ExpeditionFullMedia({ item }: { item: DriveShowcaseItem }) {
  const { fileId, kind } = item;

  if (kind === "video") {
    return (
      <iframe
        title=""
        src={googleDriveFileEmbedPreviewUrl(fileId)}
        className="aspect-video h-auto max-h-[80vh] w-full max-w-5xl rounded-lg border-0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; muted:true "
        allowFullScreen
      />
    );
  }

  if (kind === "gif") {
    return (
      <DriveGifImg
        fileId={fileId}
        className="max-h-[80vh] max-w-full object-contain"
      />
    );
  }

  const imageSources = [
    googleDriveImageUrl(fileId),
    googleDriveUserContentViewUrl(fileId),
    googleDriveThumbnailUrl(fileId, 1920),
  ] as const;

  return (
    <DriveLightboxStill
      sources={imageSources}
      alt={item.caption ?? "Gallery photo"}
    />
  );
}

function ExpeditionLightboxPanel({
  item,
  onClose,
}: {
  item: DriveShowcaseItem;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <>
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: easeOutLightbox, delay: 0.12 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-[210] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white hover:text-black md:top-10 md:right-10"
      >
        <X size={20} aria-hidden />
        <span className="sr-only">Close</span>
      </motion.button>

      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <motion.div
          className="flex max-h-[80vh] w-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ ...springLightboxMedia, delay: 0.04 }}
        >
          <ExpeditionFullMedia item={item} />
        </motion.div>

        {item.caption ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{
              duration: 0.45,
              ease: easeOutLightbox,
              delay: 0.14,
            }}
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent px-6 pt-32 pb-12 text-center"
          >
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/80 italic md:text-base">
              {item.caption}
            </p>
          </motion.div>
        ) : null}
      </div>
    </>
  );
}

function ExpeditionScrollCard({
  item,
  onOpen,
}: {
  item: DriveShowcaseItem;
  onOpen: (item: DriveShowcaseItem) => void;
}) {
  const { fileId, kind } = item;
  const story = item.caption ?? "";

  function handleActivate() {
    onOpen(item);
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={story ? `Open frame: ${story}` : "Open frame"}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      whileHover={{ y: -10 }}
      className="group relative aspect-[4/5] w-[320px] shrink-0 cursor-pointer snap-center overflow-hidden rounded-sm bg-[#111] md:w-[500px]"
    >
      {kind === "video" ? (
        <iframe
          title=""
          src={googleDriveFileEmbedPreviewUrl(fileId, { autoplayMuted: true })}
          className="pointer-events-none absolute inset-0 h-full w-full min-h-full min-w-full scale-[1.02] border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      ) : null}

      {kind === "gif" ? <DriveGifImg fileId={fileId} /> : null}

      {kind === "image" ? (
        <div className="relative h-full w-full">
          <Image
            src={googleDriveThumbnailUrl(fileId, 1600)}
            alt={story || "Frame"}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 320px, 500px"
            unoptimized
          />
        </div>
      ) : null}

      <div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-8 opacity-0 transition-all group-hover:opacity-100">
        <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
          {story ? (
            <p className="text-sm leading-relaxed font-light text-white/90 italic">
              {story}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function ExpeditionGroup({
  expedition,
  index,
  onOpenMedia,
}: {
  expedition: Travel;
  index: number;
  onOpenMedia: (item: DriveShowcaseItem) => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <section className="overflow-hidden border-b border-white/5 px-6 py-24 last:border-0 md:px-12">
      <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div
          className={`space-y-8 lg:col-span-4 ${isEven ? "order-1" : "order-1 flex flex-col lg:order-2 lg:items-end lg:text-right"}`}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl leading-none font-light tracking-tighter md:text-6xl"
          >
            {expedition.title}
          </motion.h2>

          <div
            className={`flex flex-wrap gap-6 text-[10px] font-bold tracking-widest text-white/40 uppercase ${isEven ? "" : "lg:justify-end"}`}
          >
            <span className="flex items-center gap-2">
              <MapPin size={12} aria-hidden />
              {expedition.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={12} aria-hidden />
              {expedition.date}
            </span>
          </div>

          <p
            className={`max-w-sm leading-relaxed font-light text-white/60 ${isEven ? "" : "lg:text-right"}`}
          >
            {expedition.description}
          </p>
        </div>

        <div
          className={`lg:col-span-8 ${isEven ? "order-2" : "order-2 lg:order-1"}`}
        >
          {expedition.items.length === 0 ? (
            <p className="text-sm text-white/35">
              Add Drive file entries to `items` for this expedition in
              `travels.ts`.
            </p>
          ) : (
            <div
              className={`flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar ${isEven ? "" : "lg:flex-row-reverse"}`}
            >
              {expedition.items.map((item) => (
                <ExpeditionScrollCard
                  key={`${expedition.id}-${item.fileId}-${item.id}`}
                  item={item}
                  onOpen={onOpenMedia}
                />
              ))}
              <div className="w-12 shrink-0" aria-hidden />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Travels({ items }: TravelsProps) {
  const [selectedMedia, setSelectedMedia] = useState<DriveShowcaseItem | null>(
    null,
  );

  const handleClose = useCallback(() => setSelectedMedia(null), []);

  if (items.length === 0) return null;

  return (
    <div aria-label="Travels" className="bg-[#08090d] text-white">
      {items.map((expedition, index) => (
        <ExpeditionGroup
          key={expedition.id}
          expedition={expedition}
          index={index}
          onOpenMedia={setSelectedMedia}
        />
      ))}

      <AnimatePresence mode="wait">
        {selectedMedia ? (
          <motion.div
            key={`${selectedMedia.fileId}-${selectedMedia.id}`}
            role="dialog"
            aria-modal="true"
            aria-label="Expedition media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutLightbox }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-12"
          >
            <ExpeditionLightboxPanel
              item={selectedMedia}
              onClose={handleClose}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
