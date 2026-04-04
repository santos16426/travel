/** Featured marquee / travel grids: Drive file id + how to render it in the browser. */
export interface DriveShowcaseItem {
  /** Stable unique key for list items (duplicated in the marquee loop). */
  id: number;
  fileId: string;
  /** Static photo uses a thumbnail; GIF uses full view URL so it can animate; video uses the Drive preview embed. */
  kind: "image" | "gif" | "video";
  /** Shown under the image in the full-screen viewer when set. */
  caption?: string;
}

/**
 * One expedition / album: copy plus Drive file entries as the showcase.
 * `caption` is used as the frame “story” on hover and in the lightbox.
 * Each file needs “Anyone with the link”.
 */
export interface Travel {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  items: DriveShowcaseItem[];
}

export interface TravelPhoto {
  id: string;
  /** Full HTTPS URL (e.g. from `googleDriveImageUrl(fileId)` or lh3.googleusercontent.com). */
  src: string;
  alt: string;
}

export interface TravelTrip {
  id: string;
  title: string;
  /** City, region, or country label used for grouping. */
  locationLabel: string;
  /** ISO date string for sorting and year grouping (trip start). */
  dateStart: string;
  dateEnd?: string;
  summary?: string;
  featured?: boolean;
  photos: TravelPhoto[];
}
