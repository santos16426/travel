/**
 * Your Drive “root” for travel media (folders are not directly usable as image
 * URLs in `<img>` / `next/image`). This id is only a reference for you or for
 * a future Google Drive API integration — not something the browser can fetch.
 *
 * Folder: https://drive.google.com/drive/u/0/folders/1l-ssSkEJopDs-qN6oF_tzot4JIaMEgpq
 */
export const travelMediaDriveFolderId = "15PykKsmIFkUxO8TPI4lMgGreIPtsZliR";

export function googleDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Second hotlink pattern; occasionally behaves differently from {@link googleDriveImageUrl}.
 * Does **not** bypass auth: if the file is “Restricted”, both URLs fail until you set
 * General access to **Anyone with the link** (Viewer).
 */
export function googleDriveUserContentViewUrl(fileId: string): string {
  return `https://drive.usercontent.google.com/uc?id=${fileId}&export=view`;
}

export function googleDriveThumbnailUrl(
  fileId: string,
  maxWidth = 1920,
): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${maxWidth}`;
}

export interface GoogleDriveEmbedPreviewOptions {
  /**
   * Appends `autoplay=1` and `mute=1` to the preview URL. Muted playback is what
   * browsers allow for autoplay; Drive’s player may still ignore these params.
   */
  autoplayMuted?: boolean;
}

/** Public embed player (file must be shared: “Anyone with the link”). */
export function googleDriveFileEmbedPreviewUrl(
  fileId: string,
  options?: GoogleDriveEmbedPreviewOptions,
): string {
  const base = `https://drive.google.com/file/d/${fileId}/preview`;
  if (!options?.autoplayMuted) return base;
  const q = new URLSearchParams({ autoplay: "1", mute: "1" });
  return `${base}?${q}`;
}
// export const heroBackgroundDriveFileId = "10F09zs9tc6b4JUMmdilY2WGRko6UtHIR";
// export const heroBackgroundDriveFileId = "1d7m5GST3ucd5rxytMlSGcHk1I9vX3uvJ";
export const heroBackgroundDriveFileId = "1HeGj7SbEbFcAHqlPpIJDP1p_GCY_mkyT"; // dubai
