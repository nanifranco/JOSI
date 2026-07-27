import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { WORK_ZONE_CENTER, WORK_ZONE_RADIUS_KM, type Coordinates } from '../lib/geocode'

type Props = {
  addressCoords: Coordinates | null
  inZone: boolean | null
}

/** Punto de color para marcar la dirección escrita (verde si cae dentro del radio, rojo si no). */
function addressIcon(inZone: boolean | null) {
  const color = inZone === false ? '#a33' : '#3a7a4a'
  return L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.25)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

/** Mapa con el radio de trabajo de Josi (círculo, sin marcar su dirección exacta) y un punto en la dirección que escribe quien agenda. */
export function WorkZoneMap({ addressCoords, inZone }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const circleRef = useRef<L.Circle | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([WORK_ZONE_CENTER.lat, WORK_ZONE_CENTER.lon], 10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    circleRef.current = L.circle([WORK_ZONE_CENTER.lat, WORK_ZONE_CENTER.lon], {
      radius: WORK_ZONE_RADIUS_KM * 1000,
      color: '#3a2e2c',
      weight: 1.5,
      fillColor: '#c9a876',
      fillOpacity: 0.15,
    }).addTo(map)

    map.fitBounds(circleRef.current.getBounds())
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }

    if (addressCoords) {
      markerRef.current = L.marker([addressCoords.lat, addressCoords.lon], { icon: addressIcon(inZone) }).addTo(map)

      const bounds = L.latLngBounds([[addressCoords.lat, addressCoords.lon]])
      if (circleRef.current) bounds.extend(circleRef.current.getBounds())
      map.fitBounds(bounds, { padding: [30, 30] })
    } else if (circleRef.current) {
      map.fitBounds(circleRef.current.getBounds())
    }
  }, [addressCoords, inZone])

  return <div ref={containerRef} className="h-full w-full" />
}
