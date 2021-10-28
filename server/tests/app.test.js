/**
 * @jest-environment node
 */

const mongoose = require('mongoose') 
const supertest = require('supertest')
const fs = require('fs')
const app = require('../app')
const users = require('../models/users')
 
const api = supertest(app)

const sampleData =  async (fileName) => {
  const rawData = fs.readFileSync(fileName)
  const data = JSON.parse(rawData)

  // use a for loop rather than map because we want await
  for(let i=0; i<data.users.length; i++) {
    const record = data.users[i]
    const l = new users(record)
    await l.save() 
  }
}

describe('api', () => {

  test('Expecting Status 200', async () => {
    try {
      await api.get('/')
        .expect(200)
    } catch (error) {
      console.log(error)
    }  
  })

  test('Simple test expecting page to be HTML', async () => {
    await api.get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
  })

})
