import React from 'react'
import {
  ListGroup,
  Badge
} from 'react-bootstrap'

const StationListItem = ({ station }) => {

  return (
    <>
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          {station.name}
        </div>
        <Badge variant="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
    </>
  )
}

export default StationListItem