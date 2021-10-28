import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getPrice = () => {
    const request = axios.get(`${baseUrl}/prices`)
    return request.then(response => response.data)
  }

  const fuelService = {getPrice};
  export default fuelService;
