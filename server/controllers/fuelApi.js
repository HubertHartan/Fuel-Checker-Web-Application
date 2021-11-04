require('dotenv').config()

const axios = require('axios')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');

const Price = require("../models/prices")
const Station = require("../models/stations")

module.exports = class FuelAPIClient {
    updateFuelData = async () => {
        const accessToken = await this.getAccessToken();
        const fuelData = await this.getFuelData(accessToken);

        // Format price data
        const prices = fuelData.prices.map(data => {
            data.lastupdated = moment(data.lastupdated, 'DD/MM/yyyy hh:mm:ss').toDate()
            return data
        })

        // Format station data
        const stations = fuelData.stations.map(data => {
            data.lat = data.location.latitude
            data.long = data.location.longitude
            delete data.location

            return data
        })

        return Price.deleteMany({})
            .then(() => {
                return Station.deleteMany({})
            })
            .then(() => {
                return Price.insertMany(prices)
            })
            .then(() => {
                return Station.insertMany(stations)
            })
            .then(() => {
                console.log('Updated prices');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAccessToken = async () => {
        return axios.get('https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials', {
            auth: {
                username: process.env.FUEL_API_KEY,
                password: process.env.FUEL_API_SECRET
            }
        })
            .then(response => {
                return response.data.access_token
            })
            .catch(error => {
                console.log(error);
                return false;
            })
    }

    getFuelData = async (token) => {
        const UTCTimestamp = moment.utc().format('DD/MM/yyyy hh:mm:ss A')
        const transactionID = uuidv4()

        return axios.get('https://api.onegov.nsw.gov.au/FuelPriceCheck/v2/fuel/prices', {
            headers: {
                Authorization: `Bearer ${token}`,
                apikey: process.env.FUEL_API_KEY,
                transactionid: transactionID,
                requesttimestamp: UTCTimestamp,
            }
        })
            .then(response => {
                return {
                    stations: response.data.stations,
                    prices: response.data.prices,
                }
            })
            .catch(error => {
                console.log(error);
                return false;
            })
    }
}