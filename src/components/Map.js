import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import userService from '../services/user'
import stationService from '../services/stations'

import MapContainer from './MapContainer'
import StationList from './StationList'
import StationInfoCard from './StationInfoCard'

const Map = () => {
  const location = useLocation()
  const { user, isAuthenticated } = useAuth0()
  const [markers, setMarkers] = useState()
  const [visibleStations, setVisibleStations] = useState()
  const [stationInfo, setStationInfo] = useState()

  useEffect(() => {
    if (isAuthenticated) {
      userService.getUser(user.email)
        .then((data) => {
          setMarkers(data)
        })
    }
  }, [])

  const changeStationInfo = (code) => {
    if (stationInfo?.code == code) return

    stationService.getStation(code)
      .then(response => {
        setStationInfo(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Container className="g-0 full-height" fluid>
        <Row className="g-0 full-height">
          <Col className="full-height overflow-scroll" md="3" xl="2">
            <StationList stations={visibleStations} />
          </Col>
          <Col>
            {stationInfo &&
              <StationInfoCard stationInfo={stationInfo} />
            }
            <MapContainer initialLocation={location?.state} markers={markers} setVisibleStations={setVisibleStations} changeStationInfo={changeStationInfo} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Map