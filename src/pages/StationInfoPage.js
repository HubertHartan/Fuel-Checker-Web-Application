import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import stationService from '../services/stations'
import MetricCard from '../components/MetricCard'

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'

const StationInfoPage = () => {
  const [station, setStation] = useState()
  const { code } = useParams()

  useEffect(() => {
    stationService.getStation(code)
      .then(response => {
        console.log(response)
        setStation(response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const stationFuelPrices = station?.prices?.map((priceData) => {
    return (
      <Col lg="3" className="mb-3" key={priceData._id}>
        <MetricCard title={priceData.fueltype} figure={priceData.price} />
      </Col>
    )
  })

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="fw-bold mb-4">{station?.name}</h2>
        </Col>
      </Row>

      <Row>
        {stationFuelPrices}
      </Row>
    </Container>
  )
}

export default StationInfoPage