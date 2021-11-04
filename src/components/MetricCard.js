import React from 'react'
import {
  Card
} from 'react-bootstrap'
import { formatPrice } from '../utils/Helpers'

const MetricCard = ({ title, figure }) => {
  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <span className="d-block text-uppercase fw-bold text-black-50 small">{title}</span>
          <span className="d-block h3 text-uppercase fw-bold pt-3 pb-0">${formatPrice(figure)}</span>
        </Card.Body>
      </Card>
    </>
  )
}

export default MetricCard