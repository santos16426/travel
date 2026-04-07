import type { DriveShowcaseItem } from "@/features/travel/types";

/**
 * Drive **file** ids only (not folder ids). Folder location does not matter — ids are global;
 * each file still needs **General access → Anyone with the link** (Viewer). If the `/view`
 * page asks you to sign in while logged out / in a private window, the site cannot load it either.
 * Each marquee row duplicates this list after an independent shuffle (see `FeaturedGallery`).
 *
 * - `image` — stills via thumbnail (fast).
 * - `gif` — native `<img>` with Drive view URLs (falls back to thumbnail = static frame if needed).
 * - `video` — iframe preview (file must be “Anyone with the link”).
 */
export const showcaseDriveItems: DriveShowcaseItem[] = [
  { id:1,  fileId: "1AYqfsoyvoZAQ6Uhf5Cc9eAl-AzrCCYwI", kind: "image" },
  { id:2, fileId: "1m5TGBvWozT_3zOvhhpS8EBNxg7WROIc6", kind: "image"},
  { id:3, fileId: "1V7mxQ5XWN767c95h_CXUH07Chtt6-S85", kind: "image" },
  { id:4, fileId: "13t3hLvdm4dRrs3zfk4edF7YyvFHVNoHR", kind: "image" },
  { id:5, fileId: "1VUWQQoxRWfjyuQtAXW1K0JHtFDddr9sR", kind: "image" },
  { id:6, fileId: "1FaFQxj5l026xw1g1mHlXZ--5xX8eHEzq", kind: "image" },
  { id:7, fileId: "1tMcv5H0r4JaD6-srtY_upHEk-S3ClXQR", kind: "image" },
  { id:8, fileId: "1aelAKnEJLsNRmUU5odJGzKVJtyvhZu1w", kind: "image"},
  { id:9, fileId: "18m7XMLj0OauVNZYjvwo7jn4M8lYdXde0", kind: "image" },
  { id:10, fileId: "1YsSHLM6WlfO_NFFxWVVamniJpTiBYzoE", kind: "gif" },
  { id:11, fileId: "16L8sAtJ6rGSbhA_9dT8vniOD-Zx_xl6d", kind: "image" },
  { id:12, fileId: "1DUH4iy6P_z366HI2nh2-x5vo3EuD8czA", kind: "image" },
  { id:13, fileId: "1r5mTJ86z97DhzljuyohUEECEyw6totA4", kind: "image" },
  { id:14, fileId: "1SCmVYvypQxWdx7oDonhhOI5Ce7_eGBxq", kind: "image" },
  { id:15, fileId: "119RdMoQeoWVHyrWacsQ7X5O3ZR4WWpuk", kind: "image" },
  { id:16, fileId: "1KjYUT5QYf8Tvx187jPLsew7aB621ZPgz", kind: "image" },
  { id:17, fileId: "1KdAtaKN_wwaGXtRx4KGahMfl7j_NVO_t", kind: "image" },
  { id:18, fileId: "149DvMjD6Rl8lhIxMwQ5IIiWQ9bpRui9G", kind: "image" },
  { id:19, fileId: "1Rg3uNVcYyyrIi9QbeXeQ92QNcoDqCgcW", kind: "image" },
  { id:20, fileId: "1eNrGhK0gBNyF_LfhYP_TH_BZIMo_vY8V", kind: "image" },
  { id:21, fileId: "10F09zs9tc6b4JUMmdilY2WGRko6UtHIR", kind: "image" },
  // { id:22, fileId: "11tuwMWok_HBlshF6tZhE5MXutaHdLrbg", kind: "image" }
  // { id:21, fileId: "1X4O_C0IIfoTHVUa7l-3rMEraOjm-RV5G", kind: "video" },

];
