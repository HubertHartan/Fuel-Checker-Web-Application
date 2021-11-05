/**
 * @jest-environment node
 */

const mongoose = require('mongoose') 
const supertest = require('supertest')
const fs = require('fs')
const app = require('../app')
const users = require('../models/users')
 
const api = supertest(app)

describe('api', () => {

  test('The Prices API is reachable', async () => {
      await api.get('/api/prices')
      .expect(200);
  })

  
  test('The Station API is reachable', async () => {
    await api.get('/api/stations')
    .expect(200);
})

  test('Simple test expecting page to be JSON', async () => {
    await api.get('/')
      .expect('Content-Type', 'application/json; charset=utf-8')
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    mongoose.connection.close()
  });
  

})
