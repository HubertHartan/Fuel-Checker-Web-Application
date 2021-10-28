/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'

import station from './stations.js'

 
jest.mock('axios')

describe('api', () => {

  test('Expecting Status 200', async () => {
    try {
      await api.get('/')
        .expect(200)
    } catch (error) {
      console.log(error)
    }  
  })

})
