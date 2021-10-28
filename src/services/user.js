import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/user'

const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


const addNew = (place) => {
  const request = axios.post(`${baseUrl}/add/${place.email}`, place)
  return request.then(response => response.data)
}


const deletePlace= (id) => {
  const request = axios.get(`${baseUrl}/delele/${id}`)
  return request.then(response => response.data)
}

const userService = {getUser,addNew, deletePlace}
export default userService