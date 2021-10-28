import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import userService from '../services/user'

import MapContainer from './MapContainer'
import StationList from './StationList'

const Map = ({ stations }) => {
  const location = useLocation()
  const { user, isAuthenticated } = useAuth0()
  const [markers, setMarkers] = useState()

  useEffect(() => {
    if (isAuthenticated) {
      userService.getUser(user.email)
        .then((data) => {
          setMarkers(data)
        })
    }
  }, [])
  return (
    <>
      <Container className="g-0 full-height" fluid>
        <Row className="g-0 full-height">
          <Col className="full-height overflow-scroll" md="3" xl="2">
            <StationList stations={stations} />
          </Col>
          <Col>
            <MapContainer initialLocation={location?.state} markers={markers} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Map