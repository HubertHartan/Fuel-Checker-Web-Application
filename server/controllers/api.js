const express = require('express') 

const Price = require("../models/prices")
const Station = require("../models/stations")

const apiRouter = express.Router()

apiRouter.get('/api/prices', (req, res) => {
    Price.find({}).then(result => {
        res.json(result)
    })
})

apiRouter.get('/api/stations', (req, res) => {
    Station.find({}).then(result => {
        res.json(result)
    })
})

module.exports = apiRouter
