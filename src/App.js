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
    <Row className="mx-0">
  <Button as={Col} variant="primary">Button #1</Button>
  <Button as={Col} variant="secondary" className="mx-2">Button #2</Button>
  <Button as={Col} variant="success">Button #3</Button>
</Row>
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
