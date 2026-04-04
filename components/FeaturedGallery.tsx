"use client";

import type { DriveShowcaseItem } from "@/features/travel/types";
import {
  googleDriveFileEmbedPreviewUrl,
  googleDriveImageUrl,
  googleDriveThumbnailUrl,
  googleDriveUserContentViewUrl,
} from "@/lib/images/google-drive";
import { SHOWCASE_SHUFFLE_EVENT } from "@/lib/showcase-shuffle-event";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

function shuffleCopy<T>(source: readonly T[]): T[] {
  const next = [...source];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = next[i];
    next[i] = next[j];
    next[j] = t;
  }
  return next;
}

function duplicateLoop(
  items: readonly DriveShowcaseItem[],
): DriveShowcaseItem[] {
  return [...items, ...items];
}

export interface FeaturedGalleryProps {
  items: DriveShowcaseItem[];
  /** Section `id` for anchors (default: showcase). */
  sectionId?: string;
  /** Eyebrow label (default: The Showcase). */
  title?: string;
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

function ShowcaseFullMedia({ item }: { item: DriveShowcaseItem }) {
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
      key={fileId}
      sources={imageSources}
      alt={item.caption ?? "Gallery photo"}
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

function ShowcaseLightbox({
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

  const easeOut = [0.22, 1, 0.36, 1] as const;
  const springMedia = {
    type: "spring" as const,
    damping: 32,
    stiffness: 320,
    mass: 0.85,
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery media"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-12"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: easeOut, delay: 0.12 }}
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
          transition={{ ...springMedia, delay: 0.04 }}
        >
          <ShowcaseFullMedia item={item} />
        </motion.div>

        {item.caption ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{
              duration: 0.45,
              ease: easeOut,
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
    </motion.div>
  );
}

function ShowcaseTile({
  item,
  imageSizes,
  cardClassName,
  onSelect,
}: {
  item: DriveShowcaseItem;
  imageSizes: string;
  cardClassName: string;
  onSelect: (item: DriveShowcaseItem) => void;
}) {
  const { fileId, kind } = item;

  function handleActivate() {
    onSelect(item);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={
        item.caption
          ? `Open gallery: ${item.caption}`
          : "Open media in full screen"
      }
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      className={`${cardClassName} group/tile relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d]`}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover/tile:opacity-100">
        <div className="scale-50 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md transition-transform group-hover/tile:scale-100">
          <ArrowUpRight size={18} className="text-white" />
        </div>
      </div>
      {kind === "video" ? (
        <iframe
          title=""
          src={googleDriveFileEmbedPreviewUrl(fileId, { autoplayMuted: true })}
          className="pointer-events-none absolute inset-0 h-full w-full min-h-full min-w-full scale-[1.02] border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="eager"
        />
      ) : null}

      {kind === "gif" ? <DriveGifImg fileId={fileId} /> : null}

      {kind === "image" ? (
        <div className="relative h-full w-full">
          <Image
            src={googleDriveThumbnailUrl(fileId, 900)}
            alt=""
            fill
            className="object-cover"
            sizes={imageSizes}
            unoptimized
          />
        </div>
      ) : null}
    </div>
  );
}

export function FeaturedGallery({
  items,
  sectionId = "showcase",
}: FeaturedGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<DriveShowcaseItem | null>(
    null,
  );
  const handleSelectItem = useCallback((item: DriveShowcaseItem) => {
    setSelectedItem(item);
  }, []);

  const [rowA, setRowA] = useState<DriveShowcaseItem[]>(() =>
    duplicateLoop(items),
  );
  const [rowB, setRowB] = useState<DriveShowcaseItem[]>(() =>
    duplicateLoop(items),
  );
  const [rowC, setRowC] = useState<DriveShowcaseItem[]>(() =>
    duplicateLoop(items),
  );

  const reshuffleRows = useCallback(() => {
    if (items.length === 0) {
      setRowA([]);
      setRowB([]);
      setRowC([]);
      return;
    }
    setRowA(duplicateLoop(shuffleCopy(items)));
    setRowB(duplicateLoop(shuffleCopy(items)));
    setRowC(duplicateLoop(shuffleCopy(items)));
  }, [items]);

  useEffect(() => {
    const id = window.setTimeout(reshuffleRows, 0);
    return () => window.clearTimeout(id);
  }, [reshuffleRows]);

  useEffect(() => {
    function onShuffle() {
      reshuffleRows();
    }
    window.addEventListener(SHOWCASE_SHUFFLE_EVENT, onShuffle);
    return () => window.removeEventListener(SHOWCASE_SHUFFLE_EVENT, onShuffle);
  }, [reshuffleRows]);

  if (items.length === 0) return null;

  const rowACard =
    "aspect-[4/3] w-[300px] flex-shrink-0 cursor-pointer overflow-hidden border border-white/5 grayscale transition-all duration-700 hover:grayscale-0 md:w-[450px]";
  const rowBCard =
    "aspect-square w-[250px] flex-shrink-0 cursor-pointer overflow-hidden border border-white/5 grayscale transition-all duration-700 hover:grayscale-0 md:w-[350px]";

  return (
    <section
      id={sectionId}
      className="relative border-y border-white/5 bg-[#08090d]"
    >
      <div className="flex flex-col">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex min-w-full whitespace-nowrap"
          >
            {rowA.map((item, idx) => (
              <ShowcaseTile
                key={`row-a-${item.id}-${idx}`}
                item={item}
                imageSizes="(max-width: 768px) 300px, 450px"
                cardClassName={`relative ${rowACard}`}
                onSelect={handleSelectItem}
              />
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            className="flex min-w-full whitespace-nowrap"
          >
            {rowB.map((item, idx) => (
              <ShowcaseTile
                key={`row-b-${item.id}-${idx}`}
                item={item}
                imageSizes="(max-width: 768px) 250px, 350px"
                cardClassName={`relative ${rowBCard}`}
                onSelect={handleSelectItem}
              />
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex min-w-full whitespace-nowrap"
          >
            {rowC.map((item, idx) => (
              <ShowcaseTile
                key={`row-c-${item.id}-${idx}`}
                item={item}
                imageSizes="(max-width: 768px) 250px, 350px"
                cardClassName={`relative ${rowACard}`}
                onSelect={handleSelectItem}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <ShowcaseLightbox
            key={selectedItem.fileId}
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
