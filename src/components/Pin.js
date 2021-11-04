import React from 'react'
import { Icon } from 'semantic-ui-react'
import  { Marker } from 'react-map-gl'

export default function Pin({ markers, setpopupMarkerInfo ,changeViewport, viewport}) {
  const handleOnclick = (station) => {
    changeViewport({
      ...viewport,
      longitude: station.long,
      latitude: station.lat,
      zoom: 15,
      transitionDuration: 1000
    })
  }

  return (
    (markers) ?
      (markers.fuelStations.map(station => (
        <Marker
          key={station.code}
          longitude={station.long}
          latitude={station.lat}
          onClick={() => handleOnclick(station)}
          offsetLeft={-15}
        >              
          <Icon name='map pin'
            color='red' size='big'
            onMouseEnter={() => setpopupMarkerInfo(station)}
            style={{cursor:'pointer'}}
          />
        </Marker>)))
      : null
    
  )
}
