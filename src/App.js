import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Row,
  Container,
  Col,
  Button
} from 'react-bootstrap'

import './sass/App.scss';

import Navigation from './components/Navigation'
import StationTable from './components/StationTable'

function App() {
  const baseUrl = 'http://localhost:3001/api'
  const [stations, setStations] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/stations`)
      .then(response => {
        setStations([...response.data])
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Navigation />
      <Container>
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
