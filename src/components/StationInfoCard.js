import React from 'react'
import {
  ListGroup,
  Button
} from 'react-bootstrap'

import { useHistory } from 'react-router-dom'
import Bookmark from './Bookmark.js'

const StationInfoCard = ({ stationInfo }) => {
  const history = useHistory()

  const stationFuelPrices = stationInfo?.prices?.map((priceData) => {
    return (
      <ListGroup.Item className="px-0" key={priceData._id}>
        {priceData.fueltype}
        <span className="float-end">${priceData.price}</span>
      </ListGroup.Item>
    )
  })

  return (
    <>
      <div className="station-info-card p-3">
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="fw-bold">{stationInfo?.name}</h5>
          <Bookmark station={stationInfo}/>
          
          <p className="text-muted small">{stationInfo?.address}</p>

          <ListGroup variant="flush">
            {stationFuelPrices}
          </ListGroup>

          <div className="d-grid mt-3">
            <Button onClick={() => history.push(`/stations/${stationInfo.code}`)} variant="primary">View station</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StationInfoCard