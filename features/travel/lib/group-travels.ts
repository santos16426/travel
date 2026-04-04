import type { TravelTrip } from "@/features/travel/types";

export interface LocationGroup {
  locationLabel: string;
  trips: TravelTrip[];
}

export interface YearGroup {
  year: number;
  trips: TravelTrip[];
}

function sortTripsByDateDesc(trips: TravelTrip[]): TravelTrip[] {
  return [...trips].sort(
    (a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime(),
  );
}

export function groupTravelsByLocation(trips: TravelTrip[]): LocationGroup[] {
  const map = new Map<string, TravelTrip[]>();
  for (const trip of trips) {
    const key = trip.locationLabel;
    const list = map.get(key) ?? [];
    list.push(trip);
    map.set(key, list);
  }
  return [...map.entries()]
    .map(([locationLabel, groupTrips]) => ({
      locationLabel,
      trips: sortTripsByDateDesc(groupTrips),
    }))
    .sort((a, b) => a.locationLabel.localeCompare(b.locationLabel));
}

export function groupTravelsByYear(trips: TravelTrip[]): YearGroup[] {
  const map = new Map<number, TravelTrip[]>();
  for (const trip of trips) {
    const year = new Date(trip.dateStart).getFullYear();
    const list = map.get(year) ?? [];
    list.push(trip);
    map.set(year, list);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, groupTrips]) => ({
      year,
      trips: sortTripsByDateDesc(groupTrips),
    }));
}

export function getFeaturedTrips(trips: TravelTrip[]): TravelTrip[] {
  return sortTripsByDateDesc(trips.filter((t) => t.featured));
}

export function getCoverSrc(trip: TravelTrip): string | undefined {
  const first = trip.photos.find((p) => p.src.trim().length > 0);
  return first?.src;
}
