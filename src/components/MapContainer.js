import React from 'react'
import { useState, useRef, useCallback } from 'react'
import MapGL, { Source, Layer, Marker, Popup } from 'react-map-gl'
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from '../utils/Layers'
import Geocoder from 'react-map-gl-geocoder'
import { useAuth0 } from '@auth0/auth0-react'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmx5bm50ZXMiLCJhIjoiY2tneDAwZ2ZkMDE2azJ0bzM1MG15N3d1cyJ9.LHpIlA-UNOCFXjFucg2AQg'

const MapContainer = ({ initialLocation, markers }) => {
  const { isAuthenticated } = useAuth0()
  let lat = -32.924
  let long = 150.104
  let zoom = 4.5


  if (initialLocation?.lat && initialLocation?.long) {
    lat = initialLocation.lat
    long = initialLocation.long
    zoom = 12
  }

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    zoom: zoom,
    bearing: 0,
    pitch: 0
  })

  const mapRef = useRef(null)
  const [popupInfo, setPopupInfo] = useState(null)

  // mapRef.on('mouseenter', 'unclustered-point', function (e) {
  //   console.log(e)
  // })

  // TODO: Implement onclick handler
  const onClick = event => {
    const feature = event.features[0]
    if (feature) {
      if (feature.properties.cluster) {
        // User clicked on a cluster
        setViewport({
          ...viewport,
          longitude: event.lngLat[0],
          latitude: event.lngLat[1],
          zoom: viewport.zoom + 3,
          transitionDuration: 500
        })
      } else {
        // User clicked on a station
        setPopupInfo({
          longitude: feature.properties.longitude,
          latitude: feature.properties.latitude
        })

        setViewport({
          ...viewport,
          longitude: feature.properties.longitude,
          latitude: feature.properties.latitude,
          zoom: 15,
          transitionDuration: 1000
        })
      }
    } else {
      setPopupInfo(null)
    }
  }

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  )


  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="stations"
          type="geojson"
          data="/api/map/geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />

          {popupInfo && (
            <Popup
              tipSize={5}
              anchor="top"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeOnClick={false}
              onClose={setPopupInfo}
            >
              Station
            </Popup>
          )}

          {(isAuthenticated && (markers !== null) && (markers !== undefined)) ?
            (markers.fuelStations.map(station => (
              <Marker key={station.code} longitude={station.long} latitude={station.lat} >
                <img src="pin.png" />
              </Marker>)))

            : null

          }
        </Source>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-right"
        />
      </MapGL>
    </>
  )
}

export default MapContainer