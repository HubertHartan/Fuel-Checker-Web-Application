const express = require('express') 

const Price = require("../models/prices")
const Station = require("../models/stations")

const apiRouter = express.Router()

// Get list of all prices
apiRouter.get('/api/prices', (req, res) => {
    Price.find({}).then(result => {
        res.json(result)
    })
})

// Get prices for station
apiRouter.get('/api/prices/:stationcode', (req, res) => {
    Price.find({
        stationcode: req.params.stationcode
    }).then(result => {
        res.json(result)
    })
})

// Get list of all stations
apiRouter.get('/api/stations', (req, res) => {
    Station.find({}).then(result => {
        res.json(result)
    })
})

module.exports = apiRouter
