import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './sass/App.scss';

// Components
import Navigation from './components/Navigation'
import Map from './components/Map'
import Dashboard from './components/Dashboard'

function App() {
  const baseUrl = 'http://localhost:3001/api'
  
  const [stations, setStations] = useState([])
  const [metrics, setMetrics] = useState()
  const [fuelType, setFuelType] = useState('E10')

  useEffect(() => {
    axios.get(`${baseUrl}/stations`)
      .then(response => {
        setStations([...response.data])
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    axios.get(`${baseUrl}/metrics/fuel/${fuelType}`)
      .then(response => {
        setMetrics(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [fuelType])

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/stations">
          <Dashboard fuelType={fuelType} metrics={metrics} stations={stations} />
        </Route>
        <Route path="/">
          <div>home</div>
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
