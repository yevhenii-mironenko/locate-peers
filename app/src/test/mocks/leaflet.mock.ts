import { type Mock, vi } from 'vitest'

type MockMarker = {
  bindPopup: Mock
  addTo: Mock
}

type MockMarkerClusterGroup = {
  addLayer: Mock
  addLayers: Mock
  clearLayers: Mock
  addTo: Mock
  remove: Mock
}

export const mockMarker: MockMarker = {
  bindPopup: vi.fn().mockReturnThis(),
  addTo: vi.fn().mockReturnThis(),
}

export const mockMarkerClusterGroup: MockMarkerClusterGroup = {
  addLayer: vi.fn(),
  addLayers: vi.fn(),
  clearLayers: vi.fn(),
  addTo: vi.fn(),
  remove: vi.fn(),
}

const mockBounds = {
  contains: vi.fn(() => true),
}

vi.mock('leaflet', () => ({
  default: {
    marker: vi.fn(() => mockMarker),
    markerClusterGroup: vi.fn(() => mockMarkerClusterGroup),
    icon: vi.fn(() => ({})),
    divIcon: vi.fn(() => ({})),
    latLngBounds: vi.fn(() => mockBounds),
  },
}))

vi.mock('leaflet.markercluster', () => ({}))
