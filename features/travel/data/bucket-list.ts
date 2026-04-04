export interface BucketDestination {
  name: string;
  img: string;
  /** Optional line shown on hover under the territory name. */
  description?: string;
}

export const bucketDestinations: BucketDestination[] = [
  {
    name: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Greenland",
    img: "https://res.cloudinary.com/enchanting/q_70,f_auto,w_1024,h_683,c_fit/quark-web/2024/09/Northern-lights-over-the-Ilulissat-Icefjord-area-in-Greenland.jpg",
  },
  {
    name: "Kazakhstan",
    img: "https://lp-cms-production.imgix.net/2023-03/kazakhstan-GettyImages-961506872-rfc.jpeg?auto=format,compress&q=72&w=1095&fit=crop&crop=faces,edges",
  },
];

export type BucketAdventureIconId = "wind" | "zap" | "flame" | "goggles";

export interface BucketAdventureDef {
  activity: string;
  icon: BucketAdventureIconId;
}

export const bucketAdventures: BucketAdventureDef[] = [
  { activity: "Skydiving", icon: "wind" },
  { activity: "Cliff Jumping", icon: "zap" },
  { activity: "Hot Air Balloon", icon: "flame" },
  { activity: "Parasailing", icon: "wind" },
  { activity: "Scuba Diving", icon: "goggles" },
];
