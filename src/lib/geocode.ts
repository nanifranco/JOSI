export type Coordinates = { lat: number; lon: number }

/**
 * Punto de referencia aproximado de la zona de trabajo (centro general de la
 * colonia Ajusco, Coyoacán) — nunca la dirección exacta. Se usa solo para
 * calcular distancias, no se muestra en ningún lugar del sitio.
 */
export const WORK_ZONE_CENTER: Coordinates = { lat: 19.2965, lon: -99.1354 }
export const WORK_ZONE_RADIUS_KM = 20

const EARTH_RADIUS_KM = 6371

export function distanceKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}

/** Geocodifica una dirección con Nominatim (OpenStreetMap). Devuelve null si no se encuentra o falla la red. */
export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  const params = new URLSearchParams({
    format: 'json',
    q: address,
    countrycodes: 'mx',
    limit: '1',
  })

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return null

    const results = (await response.json()) as Array<{ lat: string; lon: string }>
    if (results.length === 0) return null

    const lat = Number.parseFloat(results[0].lat)
    const lon = Number.parseFloat(results[0].lon)
    if (Number.isNaN(lat) || Number.isNaN(lon)) return null

    return { lat, lon }
  } catch {
    return null
  }
}
