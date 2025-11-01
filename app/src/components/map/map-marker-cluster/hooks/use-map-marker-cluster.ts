import 'leaflet.markercluster'

import type { Map } from 'leaflet'
import L from 'leaflet'
import { useEffect, useMemo, useRef } from 'react'

import markerIconUrl from '../../../../assets/marker-icon.svg?url'
import type { User } from '../../../../types/user'
import { createClusterIconHtml } from '../../../../utils/create-cluster-icon-html/create-cluster-icon-html'
import { createPopupHtml } from '../../../../utils/create-popup-html/create-popup-html'
import { getClusterSize } from '../../../../utils/get-cluster-size/get-cluster-size'

type MarkerClusterGroup = ReturnType<typeof L.markerClusterGroup>

type MarkerConfig = {
  iconUrl: string
  iconSize: [number, number]
  iconAnchor: [number, number]
  popupAnchor: [number, number]
}

const MARKER_CONFIG: MarkerConfig = {
  iconUrl: markerIconUrl,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
}

type PopupConfig = {
  maxWidth: number
  className: string
  closeOnClick: boolean
}

const POPUP_CONFIG: PopupConfig = {
  maxWidth: 300,
  className: 'custom-popup',
  closeOnClick: false,
}

const customIcon = L.icon(MARKER_CONFIG)

export function useMapMarkerCluster(users: User[], map: Map) {
  const clusterRef = useRef<MarkerClusterGroup | null>(null)
  const usersHashRef = useRef<string>('')
  const openPopupLatLngRef = useRef<L.LatLng | null>(null)

  const clusterGroup = useMemo(() => {
    return L.markerClusterGroup({
      chunkedLoading: true,
      chunkDelay: 50,
      chunkInterval: 200,
      animate: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: cluster => {
        const count = cluster.getChildCount()
        const html = createClusterIconHtml(count)
        const size = getClusterSize(count)

        return L.divIcon({
          html,
          className: 'custom-cluster-marker',
          iconSize: [size, size],
        })
      },
    })
  }, [])

  useEffect(() => {
    if (!clusterRef.current) {
      clusterRef.current = clusterGroup
      map.addLayer(clusterRef.current)
    }

    const usersHash = `${users.length}-${users[0]?.id || ''}-${users[users.length - 1]?.id || ''}`

    if (usersHashRef.current === usersHash) {
      return
    }

    usersHashRef.current = usersHash

    const cluster = clusterRef.current
    cluster.clearLayers()

    if (users.length === 0) return

    const markers: L.Marker[] = []

    for (const user of users) {
      const marker = L.marker([user.lat, user.lon], { icon: customIcon })
      marker.bindPopup(createPopupHtml(user), POPUP_CONFIG)

      marker.on('click', () => {
        openPopupLatLngRef.current = marker.getLatLng()
        map.setView([user.lat, user.lon], map.getZoom(), {
          animate: true,
          duration: 0.5,
        })
      })

      marker.on('popupclose', () => {
        openPopupLatLngRef.current = null
      })

      markers.push(marker)
    }

    if (markers.length > 0) {
      cluster.addLayers(markers)
    }

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current)
        clusterRef.current = null
      }
    }
  }, [users, map, clusterGroup])
}
