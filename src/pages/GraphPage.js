import React from 'react'


import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'

import FuelGraph from '../components/FuelGraph'
const GraphPage = ({data}) =>{
  return(
	  
    <Container className="main-graph py-4">
      <Row>
        <Col>
          <h2 className="fw-bold mb-4">Fuel Trends</h2>
        </Col>
      </Row>

      <Row>            
        <Col md="4" className="mb-4">
          <FuelGraph data={data} fuelType="E10" />
        </Col>

        <Col md="4" className="mb-4">
          <FuelGraph data={data} fuelType="91" />
        </Col>

        <Col md="4" className="mb-4">
          <FuelGraph data={data} fuelType="95" />
        </Col>

        <Col md="4" className="mb-4">
          <FuelGraph data={data} fuelType="98" />
        </Col>

        <Col md="4" className="mb-4">
          <FuelGraph data={data} fuelType="Diesel" />
        </Col>

      </Row>
    </Container>
  )

}

export default GraphPage