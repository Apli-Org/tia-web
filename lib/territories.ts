type Bounds = { minLat: number; maxLat: number; minLon: number; maxLon: number }

export type StoreTerritory = "RE" | "MU"

/** Mirrors the RE and MU boxes of public.territory_for_coordinates in the mobile repo. */
const STORE_TERRITORY_BOUNDS: Record<StoreTerritory, Bounds> = {
  RE: { minLat: -21.5, maxLat: -20.8, minLon: 55.1, maxLon: 55.9 },
  MU: { minLat: -20.6, maxLat: -19.9, minLon: 57.2, maxLon: 57.9 },
}

export const STORE_TERRITORY_CURRENCY: Record<StoreTerritory, string> = {
  RE: "EUR",
  MU: "USD",
}

export function storeTerritoryForCoordinates(
  latitude: number | null,
  longitude: number | null
): StoreTerritory | null {
  if (latitude === null || longitude === null) return null
  const match = (Object.entries(STORE_TERRITORY_BOUNDS) as [StoreTerritory, Bounds][]).find(
    ([, bounds]) =>
      latitude >= bounds.minLat &&
      latitude <= bounds.maxLat &&
      longitude >= bounds.minLon &&
      longitude <= bounds.maxLon
  )
  return match?.[0] ?? null
}
