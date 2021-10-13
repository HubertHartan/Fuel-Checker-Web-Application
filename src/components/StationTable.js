import React from 'react'
import {
  Table
} from 'react-bootstrap'

const Navigation = ({ stations }) => {
  const listOfStations = stations.map((station) => {
    return (
      <tr key={station.code}>
        <td>{station.brand}</td>
        <td>{station.name}</td>
        <td>{station.state}</td>
      </tr>
    )
  })

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {listOfStations}
        </tbody>
      </Table>
    </>
  )
}

export default Navigation