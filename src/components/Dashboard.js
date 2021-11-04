import React, { useState, useEffect } from 'react'
import {
  Row,
  Container,
  Col,
  Dropdown,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

// Components
import MetricCard from './MetricCard'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmx5bm50ZXMiLCJhIjoiY2tneDAwZ2ZkMDE2azJ0bzM1MG15N3d1cyJ9.LHpIlA-UNOCFXjFucg2AQg'

const Dashboard = ({ metrics, setFuelType }) => {
  const history = useHistory()

  const [fuelName, setFuelName] = useState('E10')

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        history.push('/map', {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        })
      })
    } else {
      console.log('Couldn\'t get browser geolocation')
    }
  }

  const handleFuelChange = (fuel, name) => {
    setFuelType(fuel)
    setFuelName(name)
  }

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      types: 'country,region,place,postcode,locality,neighborhood',
      countries: 'au',
    })
    geocoder.addTo('.hero-search-container')

    // Add geocoder result to container.
    geocoder.on('result', (e) => {
      const { center } = e.result
      const [longitude, latitude] = center
      history.push('/map', {
        lat: latitude,
        long: longitude,
      })
    })
  }, [])


  return (
    <>
      <Container fluid className="welcome-hero">
        <Row className="pb-3 justify-content-center align-items-center">
          <Col xl="4" lg="5" sm="8" className="py-5">
            <div className="rounded text-center text-white py-5">
              <h1 className="fw-bold">Find the cheapest fuel for your vehicle.</h1>
              <span>Use your location or enter your suburb below.</span>

              <div className="hero-search-container mt-3"></div>

              <button onClick={() => getGeoLocation()} className="btn btn-transparent text-white">Use my location</button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="py-4 mt-2">
        <Row className="pb-3">
		  <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fw-bold">Dashboard</h2>

              <Dropdown>
                <Dropdown.Toggle variant="text" id="fuelSelect">
                  <b>Fuel:</b> {fuelName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleFuelChange('E10', 'E10')}>E10</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFuelChange('U91', '91')}>91</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFuelChange('P95', '95')}>95</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFuelChange('P98', '98')}>98</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFuelChange('DL', 'Diesel')}>Diesel</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row className="pb-3">
          <Col>
            <MetricCard title="Average Price" figure={metrics?.average} />
          </Col>
          <Col>
            <MetricCard title="Lowest Price" figure={metrics?.min?.price} />
          </Col>
          <Col>
            <MetricCard title="Highest Price" figure={metrics?.max?.price} />
          </Col>
          <Col>
            <MetricCard title="Range" figure={metrics?.range} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard