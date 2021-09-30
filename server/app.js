require('dotenv').config()

const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')

const apiRouter = require("./controllers/api")
const fuelApiController = require("./controllers/fuelApi")
const middleware = require("./utils/middleware")

const app = express()
const fuelAPI = new fuelApiController()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static('build'))
app.use(apiRouter)
app.use(middleware.errorMiddleware)

const mongoURL = process.env.MONGODB_URI

const doConnect = async () => {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB:', error.message)
        })
}

doConnect()

// fuelAPI.updateFuelData();

module.exports = app
