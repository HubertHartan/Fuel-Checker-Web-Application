import React from 'react'
import {
  Table,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Navigation = ({ stations }) => {
  const history = useHistory()
  const handleClick = (e,code) => {
    e.preventDefault()
    history.push(`/stations/${code}`)
  }

  const listOfStations = stations.map((station) => {
    return (
      <tr onClick={(e) => handleClick(e,station.code)} key={station.code}>
        <td>{station.brand}</td>
        <td>{station.name}</td>
        <td>{station.state}</td>
      </tr>
    )
  })

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col>
            <h2 className="fw-bold mb-4">Stations</h2>
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
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Navigation