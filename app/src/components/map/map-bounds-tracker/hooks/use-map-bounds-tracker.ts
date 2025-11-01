import type { LatLngBounds, Map } from 'leaflet'
import { useEffect, useRef } from 'react'
import { useMapEvents } from 'react-leaflet'

import { DEBOUNCE_DELAY } from '../../../../constants/map.constants'

export function useMapBoundsTracker(onBoundsChange: (bounds: LatLngBounds) => void, map: Map) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasInitializedRef = useRef(false)

  const debouncedBoundsChange = (bounds: LatLngBounds) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onBoundsChange(bounds)
    }, DEBOUNCE_DELAY)
  }

  useMapEvents({
    moveend: () => {
      if (hasInitializedRef.current) {
        debouncedBoundsChange(map.getBounds())
      }
    },
    zoomend: () => {
      if (hasInitializedRef.current) {
        debouncedBoundsChange(map.getBounds())
      }
    },
  })

  useEffect(() => {
    if (!hasInitializedRef.current) {
      onBoundsChange(map.getBounds())
      hasInitializedRef.current = true
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [map, onBoundsChange])
}
