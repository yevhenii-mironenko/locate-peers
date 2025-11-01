import { useMap } from 'react-leaflet'

import type { User } from '../../../types/user'
import { useMapMarkerCluster } from './hooks/use-map-marker-cluster'

type MapMarkerClusterProps = {
  users: User[]
}

export function MapMarkerCluster({ users }: MapMarkerClusterProps) {
  const map = useMap()
  useMapMarkerCluster(users, map)
  return null
}
