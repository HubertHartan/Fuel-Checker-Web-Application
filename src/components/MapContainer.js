import React from 'react'
import { useState, useRef, useCallback } from 'react'
import MapGL, { Source, Layer, Marker, Popup } from 'react-map-gl'
import { clusterLayer, clusterCountLayer, stationLayer } from '../utils/Layers'
import Geocoder from 'react-map-gl-geocoder'
import { useAuth0 } from '@auth0/auth0-react'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmx5bm50ZXMiLCJhIjoiY2tneDAwZ2ZkMDE2azJ0bzM1MG15N3d1cyJ9.LHpIlA-UNOCFXjFucg2AQg'

const MapContainer = ({ initialLocation, markers, setVisibleStations }) => {
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

  const handleViewChange = async () => {
    let clusters = []
    let features = []
    let pointCount = 0

    const mapboxSource = mapRef.current.getMap()
    const elementsInFrame = mapboxSource.queryRenderedFeatures({ layers: ['station', 'clusters'] })
    const clusterSource = mapboxSource.getSource('stations')

    // Loop through each feature in the frame
    for (let i = 0; i < elementsInFrame.length; i++) {
      const f = elementsInFrame[i]
      if (f.properties.cluster) {
        // If the feature is a cluster, add it to the cluster list for processing later
        const clusterID = f.properties.cluster_id
        pointCount += f.properties.point_count

        if (!clusters.includes(clusterID)) {
          clusters.push(clusterID)
        }
      } else {
        // If the feature is a station, add it to the list
        const feature = f.properties
        if (!features.some(f => f.code === feature.code)) {
          features.push(feature)
        }
      }
    }

    // Exit if there are too many points
    if (pointCount > 500) {
      setVisibleStations(null)
      return
    }

    // Loop through each cluster and get the features contained within
    for (let i = 0; i < clusters.length; i++) {
      const clusterFeatures = await getClusterLeaves(clusterSource, clusters[i])
      for (let i = 0; i < clusterFeatures.length; i++) {
        const cf = clusterFeatures[i].properties
        if (!features.some(f => f.code === cf.code)) {
          features.push(cf)
        }
      }
    }

    setVisibleStations(features)
  }

  // Get the features inside a cluster
  // Wrapped in a promise
  const getClusterLeaves = async (clusterSource, clusterID) => {
    return new Promise((resolve, reject) => {
      clusterSource.getClusterLeaves(clusterID, 10000, 0, (err, clusterFeatures) => {
        if (err) reject(err)
        else resolve(clusterFeatures)
      })
    })
  }
  
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
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id, stationLayer.id]}
        onViewportChange={setViewport}
        onClick={onClick}
        onMouseUp={handleViewChange}
        onTransitionEnd={handleViewChange}
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
          <Layer {...stationLayer} />

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