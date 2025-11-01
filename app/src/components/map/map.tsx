import { MapContainer, TileLayer } from 'react-leaflet'

import { MAP_CONFIG, MAP_CONTAINER_STYLE } from '../../constants/map.constants'
import { ErrorScreen } from '../error-screen/error-screen'
import { InterestFilter } from '../interest-filter/interest-filter'
import { LoadingScreen } from '../loading-screen/loading-screen'
import { useMap } from './hooks/use-map'
import { MapBoundsTracker } from './map-bounds-tracker/map-bounds-tracker'
import { MapMarkerCluster } from './map-marker-cluster/map-marker-cluster'

export function Map() {
  const { state, actions } = useMap()

  if (state.loading) {
    return <LoadingScreen />
  }

  if (state.error) {
    return <ErrorScreen error={state.error} />
  }

  return (
    <div className="map-container">
      <InterestFilter
        value={state.interestFilter}
        onChange={actions.setInterestFilter}
        onClear={actions.clearFilter}
        resultsCount={state.visibleUsers.length}
      />
      <MapContainer
        center={MAP_CONFIG.CENTER}
        zoom={MAP_CONFIG.INITIAL_ZOOM}
        scrollWheelZoom={true}
        worldCopyJump={true}
        maxZoom={MAP_CONFIG.MAX_ZOOM}
        minZoom={MAP_CONFIG.MIN_ZOOM}
        style={MAP_CONTAINER_STYLE}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBoundsTracker onBoundsChange={actions.setBounds} />
        <MapMarkerCluster users={state.visibleUsers} />
      </MapContainer>
    </div>
  )
}
