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
apiRouter.get('/api/prices/station/:stationcode', (req, res) => {
    Price.find({
        stationcode: req.params.stationcode
    }).then(result => {
        res.json(result)
    })
})

// Get prices for fuel type
apiRouter.get('/api/prices/fuel/:fueltype', (req, res) => {
    Price.find({
        fueltype: req.params.fueltype
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

// Get station
apiRouter.get('/api/stations/:stationcode', (req, res) => {
    Station.find({
        code: req.params.stationcode
    }).then(result => {
        res.json(result[0])
    })
})

// Get fuel price metrics
apiRouter.get('/api/metrics/fuel/:fueltype', (req, res) => {
    Price.find({
        fueltype: req.params.fueltype
    }).then(prices => {
        const average = prices.reduce((total, next) => total + next.price, 0) / prices.length;
        const min = prices.reduce((prev, current) => (prev.price < current.price) ? prev : current);
        const max = prices.reduce((prev, current) => (prev.price > current.price) ? prev : current);

        res.json({
            average,
            min,
            max,
            range: max.price - min.price,
        })
    })
})

module.exports = apiRouter
