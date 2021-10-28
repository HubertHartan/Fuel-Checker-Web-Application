import React from 'react'
import {
  ListGroup
} from 'react-bootstrap'

import StationListItem from './StationListItem'

const StationList = ({ stations }) => {
  const stationListItems = stations?.map((station) => {
    return (
      <StationListItem key={station.code} station={station} />
    )
  })

  return (
    <>
      <ListGroup as="ol" numbered variant="flush">
        {stationListItems}
      </ListGroup>
    </>
  )
}

export default StationList