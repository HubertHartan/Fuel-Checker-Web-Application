import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import stationService from "./services/stations"

import './sass/App.scss';

// Components
import Navigation from './components/Navigation'
import Map from './components/Map'
import Dashboard from './components/Dashboard'
import StationTable from './components/StationTable'
function App() {
  
  const [stations, setStations] = useState([])
  const [metrics, setMetrics] = useState()
  const [fuelType, setFuelType] = useState('E10')

  useEffect(() => {
    stationService.getStations()
      .then(response => {
        setStations([...response])
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    stationService.getMetric(fuelType)
      .then(response => {
        setMetrics(response)
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
          <StationTable stations={stations} />
        </Route>
        <Route path="/">
          <Dashboard fuelType={fuelType} metrics={metrics} stations={stations} />
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
