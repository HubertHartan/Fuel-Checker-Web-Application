import React from 'react'
import {
  ListGroup,
  Badge
} from 'react-bootstrap'

const StationListItem = ({ station }) => {

  return (
    <>
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start bg-transparent">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{station.name}</div>
        </div>
        <Badge variant="primary" pill>
          $1.34
        </Badge>
      </ListGroup.Item>
    </>
  )
}

export default StationListItem