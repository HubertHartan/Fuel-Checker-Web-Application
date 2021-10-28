import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import stationService from "./services/stations"


//Customisation
import './sass/App.scss';

// Components
import Navigation from './components/Navigation'
import Map from './components/Map'
import Dashboard from './components/Dashboard'
import StationTable from './components/StationTable'

// Pages
import GraphPage from './pages/GraphPage';

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

 
  const sampleData = [
    {
      stationcode: 14,
      state: 'NSW',
      fueltype: 'U91',
      price: 160.9,
      lastupdated: '27/09/2021 23:30:55'
  },
  {
      stationcode: 15,
      state: 'NSW',
      fueltype: 'P95',
      price: 172.9,
      lastupdated: '27/09/2021 23:07:39'
  },
  {
      stationcode: 15,
      state: 'NSW',
      fueltype: 'P98',
      price: 181.9,
      lastupdated: '27/09/2021 23:07:39'
  },
  {
      stationcode: 15,
      state: 'NSW',
      fueltype: 'PDL',
      price: 160.9,
      lastupdated: '25/09/2021 03:37:30'
  },
  {
      stationcode: 15,
      state: 'NSW',
      fueltype: 'U91',
      price: 158.9,
      lastupdated: '27/09/2021 23:07:39'
  },
  {
      stationcode: 16,
      state: 'NSW',
      fueltype: 'E10',
      price: 147.9,
      lastupdated: '22/09/2021 21:07:50'
  },
  {
      stationcode: 16,
      state: 'NSW',
      fueltype: 'P98',
      price: 172.9,
      lastupdated: '22/09/2021 21:07:50'
  },
  {
      stationcode: 16,
      state: 'NSW',
      fueltype: 'PDL',
      price: 156.9,
      lastupdated: '20/09/2021 23:52:34'
  },
  {
      stationcode: 16,
      state: 'NSW',
      fueltype: 'U91',
      price: 149.9,
      lastupdated: '22/09/2021 21:07:50'
  },
  {
      stationcode: 17,
      state: 'NSW',
      fueltype: 'P95',
      price: 156.9,
      lastupdated: '29/09/2021 05:47:51'
  },
  {
      stationcode: 17,
      state: 'NSW',
      fueltype: 'P98',
      price: 165.9,
      lastupdated: '29/09/2021 05:47:51'
  },
  {
      stationcode: 17,
      state: 'NSW',
      fueltype: 'PDL',
      price: 157.9,
      lastupdated: '20/09/2021 23:52:34'
  },
  {
      stationcode: 17,
      state: 'NSW',
      fueltype: 'U91',
      price: 142.9,
      lastupdated: '29/09/2021 05:47:51'
  },
  {
      stationcode: 18,
      state: 'NSW',
      fueltype: 'DL',
      price: 153.9,
      lastupdated: '30/09/2021 00:00:47'
  },
  {
      stationcode: 18,
      state: 'NSW',
      fueltype: 'P95',
      price: 158.9,
      lastupdated: '29/09/2021 23:00:56'
  },
  {
      stationcode: 18,
      state: 'NSW',
      fueltype: 'P98',
      price: 166.9,
      lastupdated: '29/09/2021 23:00:56'
  },
  {
      stationcode: 18,
      state: 'NSW',
      fueltype: 'U91',
      price: 143.9,
      lastupdated: '29/09/2021 23:00:56'
  },
  {
      stationcode: 19,
      state: 'NSW',
      fueltype: 'DL',
      price: 153.9,
      lastupdated: '22/09/2021 08:30:43'
  },
  {
      stationcode: 19,
      state: 'NSW',
      fueltype: 'E10',
      price: 145.9,
      lastupdated: '29/08/2021 04:30:38'
  },
  {
      stationcode: 19,
      state: 'NSW',
      fueltype: 'P95',
      price: 162.9,
      lastupdated: '29/08/2021 04:30:38'
  },
  {
      stationcode: 19,
      state: 'NSW',
      fueltype: 'P98',
      price: 170.9,
      lastupdated: '29/08/2021 04:30:38'
  },
  {
      stationcode: 19,
      state: 'NSW',
      fueltype: 'U91',
      price: 147.9,
      lastupdated: '29/08/2021 04:30:38'
  },
  {
      stationcode: 20,
      state: 'NSW',
      fueltype: 'P98',
      price: 187.9,
      lastupdated: '28/09/2021 21:30:46'
  },
  {
      stationcode: 20,
      state: 'NSW',
      fueltype: 'U91',
      price: 164.9,
      lastupdated: '28/09/2021 21:30:46'
  },
  {
      stationcode: 21,
      state: 'NSW',
      fueltype: 'DL',
      price: 155.9,
      lastupdated: '29/09/2021 22:00:51'
  },
  {
      stationcode: 21,
      state: 'NSW',
      fueltype: 'E10',
      price: 147.9,
      lastupdated: '19/09/2021 22:50:32'
  },
  {
      stationcode: 21,
      state: 'NSW',
      fueltype: 'P95',
      price: 164.9,
      lastupdated: '19/09/2021 22:50:32'
  },
  {
      stationcode: 21,
      state: 'NSW',
      fueltype: 'P98',
      price: 172.9,
      lastupdated: '19/09/2021 22:50:32'
  },
  {
      stationcode: 21,
      state: 'NSW',
      fueltype: 'U91',
      price: 149.9,
      lastupdated: '19/09/2021 22:50:32'
  },
  {
      stationcode: 22,
      state: 'NSW',
      fueltype: 'DL',
      price: 158.9,
      lastupdated: '30/09/2021 01:45:44'
  },
  {
      stationcode: 22,
      state: 'NSW',
      fueltype: 'P95',
      price: 161.9,
      lastupdated: '29/09/2021 02:35:40'
  },
  {
      stationcode: 22,
      state: 'NSW',
      fueltype: 'P98',
      price: 169.9,
      lastupdated: '29/09/2021 02:30:50'
  },
  {
      stationcode: 22,
      state: 'NSW',
      fueltype: 'U91',
      price: 146.9,
      lastupdated: '29/09/2021 02:30:50'
  },
  {
      stationcode: 23,
      state: 'NSW',
      fueltype: 'DL',
      price: 159.9,
      lastupdated: '29/09/2021 22:30:45'
  },
  {
      stationcode: 23,
      state: 'NSW',
      fueltype: 'E10',
      price: 144.9,
      lastupdated: '29/09/2021 23:30:54'
  },
  {
      stationcode: 23,
      state: 'NSW',
      fueltype: 'P95',
      price: 161.9,
      lastupdated: '29/09/2021 23:30:54'
  },
  {
      stationcode: 23,
      state: 'NSW',
      fueltype: 'P98',
      price: 169.9,
      lastupdated: '29/09/2021 23:30:54'
  },
  {
      stationcode: 24,
      state: 'NSW',
      fueltype: 'DL',
      price: 160.9,
      lastupdated: '30/09/2021 05:30:46'
  },
  {
      stationcode: 24,
      state: 'NSW',
      fueltype: 'E10',
      price: 153.9,
      lastupdated: '29/09/2021 02:30:50'
  },
  {
      stationcode: 24,
      state: 'NSW',
      fueltype: 'P95',
      price: 170.9,
      lastupdated: '29/09/2021 02:30:50'
  }
]
  console.log(metrics)

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
        
        <Route path="/trends">
            <GraphPage data={sampleData}/>   
        </Route>

        <Route path="/">
            <Dashboard fuelType={fuelType} metrics={metrics}/>
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
