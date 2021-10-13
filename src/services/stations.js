import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getStations = () => {
  const request = axios.get(`${baseUrl}/stations`)
  return request.then(response => response.data)
}

const getMetric = (fuelType) => {
  const request = axios.get(`${baseUrl}/metrics/fuel/${fuelType}`)
  return request.then(response => response.data)
}


const service = {getStations, getMetric};
export default service