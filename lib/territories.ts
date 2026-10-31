type Bounds = { minLat: number; maxLat: number; minLon: number; maxLon: number }

/** Mirrors the RE box of public.territory_for_coordinates in the mobile repo. */
const REUNION_BOUNDS: Bounds = { minLat: -21.5, maxLat: -20.8, minLon: 55.1, maxLon: 55.9 }

export function isInReunion(latitude: number | null, longitude: number | null): boolean {
  if (latitude === null || longitude === null) return false
  return (
    latitude >= REUNION_BOUNDS.minLat &&
    latitude <= REUNION_BOUNDS.maxLat &&
    longitude >= REUNION_BOUNDS.minLon &&
    longitude <= REUNION_BOUNDS.maxLon
  )
}
