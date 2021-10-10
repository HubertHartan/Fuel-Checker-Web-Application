import { useState, useRef } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from '../utils/Layers';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

const MapContainer = () => {
  const [viewport, setViewport] = useState({
    latitude: -32.924,
    longitude: 150.104,
    zoom: 4.5,
    bearing: 0,
    pitch: 0
  });

  const mapRef = useRef(null);

  // TODO: Implement onclick handler
  const onClick = event => {
    const feature = event.features[0];
    const stationCode = feature.properties.code;
    const mapboxSource = mapRef.current.getMap().getSource('stations');

    mapboxSource.getClusterExpansionZoom(stationCode, (err, zoom) => {
      if (err) {
        return;
      }

      setViewport({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500
      });
    });
  };

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="stations"
          type="geojson"
          data="http://localhost:3001/api/map/geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </MapGL>
    </>
  );
}

export default MapContainer