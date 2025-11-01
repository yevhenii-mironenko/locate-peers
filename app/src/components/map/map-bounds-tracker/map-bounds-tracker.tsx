import type { LatLngBounds } from 'leaflet'
import { useMap } from 'react-leaflet'

import { useMapBoundsTracker } from './hooks/use-map-bounds-tracker'

type MapBoundsTrackerProps = {
  onBoundsChange: (bounds: LatLngBounds) => void
}

export function MapBoundsTracker({ onBoundsChange }: MapBoundsTrackerProps) {
  const map = useMap()
  useMapBoundsTracker(onBoundsChange, map)
  return null
}
