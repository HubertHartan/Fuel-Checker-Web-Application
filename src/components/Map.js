import React from 'react'
import { Container } from 'react-bootstrap'
import MapContainer from './MapContainer'
import { useHistory, useLocation } from "react-router-dom"

const Map = ({ title, figure }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Container className="g-0 full-height" fluid>
        <MapContainer initialLocation={location?.state} />
      </Container>
    </>
  )
}

export default Map