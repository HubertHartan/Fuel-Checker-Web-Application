import React,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import MapContainer from './MapContainer'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import userService from '../services/user'

const Map = ({ title, figure }) => {
  const history = useHistory()
  const location = useLocation()
  const { user ,isAuthenticated} = useAuth0()
  const [markers, setMarkers] = useState()

  useEffect(() => {
    if (isAuthenticated) { 
      userService.getUser(user.email)
        .then((data) => {
          setMarkers(data)
        })
    }
  }, [])
  return (
    <>
      <Container className="g-0 full-height" fluid>
        <MapContainer initialLocation={location?.state} markers={markers}/>
      </Container>
    </>
  )
}

export default Map