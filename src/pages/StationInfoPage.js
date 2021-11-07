import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import stationService from '../services/stations'
import MetricCard from '../components/MetricCard'
import Bookmark from '../components/Bookmark'

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
        <Col md="auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0">{station?.name}</h5>
            {station && <Bookmark station={station} />}
          </div>
          <p className="text-muted mb-4">{station?.address}</p>
        </Col>
      </Row>

      <Row>
        {stationFuelPrices}
      </Row>
    </Container>
  )
}

export default StationInfoPage