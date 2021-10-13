import React from 'react'
import { Container } from 'react-bootstrap'
import MapContainer from './MapContainer'

const Map = ({ title, figure }) => {


  return (
    <>
      <Container className="g-0 full-height" fluid>
        <MapContainer />
      </Container>
    </>
  )
}

export default Map