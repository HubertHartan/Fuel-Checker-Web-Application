import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Row,
  Container,
  Col,
  Dropdown
} from 'react-bootstrap'

import './sass/App.scss';

import Navigation from './components/Navigation'
import StationTable from './components/StationTable'
import MetricCard from './components/MetricCard'

function App() {
  const baseUrl = 'http://localhost:3001/api'
  const [stations, setStations] = useState([])
  const [metrics, setMetrics] = useState()
  const [fuelType, setFuelType] = useState('E10')

  useEffect(() => {
    axios.get(`${baseUrl}/stations`)
      .then(response => {
        setStations([...response.data])
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    axios.get(`${baseUrl}/metrics/fuel/${fuelType}`)
      .then(response => {
        setMetrics(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [fuelType])

  return (
    <>
      <Navigation />
      <Container className="py-4 mt-2">
        <Row className="pb-3">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fw-bold">Dashboard</h2>
              <Dropdown>
                <Dropdown.Toggle variant="text" id="fuelSelect">
                  <b>Fuel:</b> {fuelType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>E10</Dropdown.Item>
                  <Dropdown.Item>91</Dropdown.Item>
                  <Dropdown.Item>95</Dropdown.Item>
                  <Dropdown.Item>98</Dropdown.Item>
                  <Dropdown.Item>Diesel</Dropdown.Item>
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
        <Row>
          <Col>
            <StationTable stations={stations} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
