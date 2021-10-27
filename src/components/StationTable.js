import React from 'react'
import {
  Table,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import userService from "../services/user"
import { useAuth0 } from "@auth0/auth0-react"

const Navigation = ({ stations }) => {
  const { user, isAuthenticated } = useAuth0()
  const listOfStations = stations.map((station) => {
    return (
      <tr key={station.code}>
        <td>{station.brand}</td>
        <td>{station.name}</td>
        <td>{station.state}</td>
        <td>{<button onClick={() => {
          if (isAuthenticated) {
            const newPlace = {
              email: user.email,
              name: user.name,
              fuelStations: station
            }
            console.log(newPlace)
            userService.addNew(newPlace).catch("error")
          }
        }}>Add</button>}</td>
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
                  <th>Add</th>
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