import type { LatLngTuple } from 'leaflet'

type MapConfig = {
  CENTER: LatLngTuple
  INITIAL_ZOOM: number
  MIN_ZOOM: number
  MAX_ZOOM: number
}

export const MAP_CONFIG: MapConfig = {
  CENTER: [50.4501, 30.5234],
  INITIAL_ZOOM: 0,
  MIN_ZOOM: 3,
  MAX_ZOOM: 19,
}

type InitialBounds = {
  LAT_MIN: number
  LAT_MAX: number
  LON_MIN: number
  LON_MAX: number
}

export const INITIAL_BOUNDS: InitialBounds = {
  LAT_MIN: 50.0,
  LAT_MAX: 51.0,
  LON_MIN: 30.0,
  LON_MAX: 31.0,
}

type ClusterSizeConfig = {
  size: number
  fontSize: number
}

type ClusterSizes = {
  FIVE_DIGITS: ClusterSizeConfig
  FOUR_DIGITS: ClusterSizeConfig
  THREE_DIGITS: ClusterSizeConfig
  TWO_DIGITS: ClusterSizeConfig
  ONE_DIGIT: ClusterSizeConfig
}

export const CLUSTER_SIZES: ClusterSizes = {
  FIVE_DIGITS: { size: 80, fontSize: 11 },
  FOUR_DIGITS: { size: 70, fontSize: 12 },
  THREE_DIGITS: { size: 60, fontSize: 14 },
  TWO_DIGITS: { size: 50, fontSize: 14 },
  ONE_DIGIT: { size: 40, fontSize: 12 },
}

export const DEBOUNCE_DELAY = 150

type Colors = {
  PRIMARY: string
  SECONDARY: string
  SPINNER: string
}

export const COLORS: Colors = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SPINNER: '#4A90E2',
}

type MapContainerStyle = {
  width: string
  height: string
}

export const MAP_CONTAINER_STYLE: MapContainerStyle = {
  width: '100%',
  height: '100%',
}
