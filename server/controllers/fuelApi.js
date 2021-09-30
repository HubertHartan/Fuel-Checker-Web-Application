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

    samplePriceData = [
        {
            stationcode: 14,
            state: 'NSW',
            fueltype: 'U91',
            price: 160.9,
            lastupdated: '27/09/2021 23:30:55'
        },
        {
            stationcode: 15,
            state: 'NSW',
            fueltype: 'P95',
            price: 172.9,
            lastupdated: '27/09/2021 23:07:39'
        },
        {
            stationcode: 15,
            state: 'NSW',
            fueltype: 'P98',
            price: 181.9,
            lastupdated: '27/09/2021 23:07:39'
        },
        {
            stationcode: 15,
            state: 'NSW',
            fueltype: 'PDL',
            price: 160.9,
            lastupdated: '25/09/2021 03:37:30'
        },
        {
            stationcode: 15,
            state: 'NSW',
            fueltype: 'U91',
            price: 158.9,
            lastupdated: '27/09/2021 23:07:39'
        },
        {
            stationcode: 16,
            state: 'NSW',
            fueltype: 'E10',
            price: 147.9,
            lastupdated: '22/09/2021 21:07:50'
        },
        {
            stationcode: 16,
            state: 'NSW',
            fueltype: 'P98',
            price: 172.9,
            lastupdated: '22/09/2021 21:07:50'
        },
        {
            stationcode: 16,
            state: 'NSW',
            fueltype: 'PDL',
            price: 156.9,
            lastupdated: '20/09/2021 23:52:34'
        },
        {
            stationcode: 16,
            state: 'NSW',
            fueltype: 'U91',
            price: 149.9,
            lastupdated: '22/09/2021 21:07:50'
        },
        {
            stationcode: 17,
            state: 'NSW',
            fueltype: 'P95',
            price: 156.9,
            lastupdated: '29/09/2021 05:47:51'
        },
        {
            stationcode: 17,
            state: 'NSW',
            fueltype: 'P98',
            price: 165.9,
            lastupdated: '29/09/2021 05:47:51'
        },
        {
            stationcode: 17,
            state: 'NSW',
            fueltype: 'PDL',
            price: 157.9,
            lastupdated: '20/09/2021 23:52:34'
        },
        {
            stationcode: 17,
            state: 'NSW',
            fueltype: 'U91',
            price: 142.9,
            lastupdated: '29/09/2021 05:47:51'
        },
        {
            stationcode: 18,
            state: 'NSW',
            fueltype: 'DL',
            price: 153.9,
            lastupdated: '30/09/2021 00:00:47'
        },
        {
            stationcode: 18,
            state: 'NSW',
            fueltype: 'P95',
            price: 158.9,
            lastupdated: '29/09/2021 23:00:56'
        },
        {
            stationcode: 18,
            state: 'NSW',
            fueltype: 'P98',
            price: 166.9,
            lastupdated: '29/09/2021 23:00:56'
        },
        {
            stationcode: 18,
            state: 'NSW',
            fueltype: 'U91',
            price: 143.9,
            lastupdated: '29/09/2021 23:00:56'
        },
        {
            stationcode: 19,
            state: 'NSW',
            fueltype: 'DL',
            price: 153.9,
            lastupdated: '22/09/2021 08:30:43'
        },
        {
            stationcode: 19,
            state: 'NSW',
            fueltype: 'E10',
            price: 145.9,
            lastupdated: '29/08/2021 04:30:38'
        },
        {
            stationcode: 19,
            state: 'NSW',
            fueltype: 'P95',
            price: 162.9,
            lastupdated: '29/08/2021 04:30:38'
        },
        {
            stationcode: 19,
            state: 'NSW',
            fueltype: 'P98',
            price: 170.9,
            lastupdated: '29/08/2021 04:30:38'
        },
        {
            stationcode: 19,
            state: 'NSW',
            fueltype: 'U91',
            price: 147.9,
            lastupdated: '29/08/2021 04:30:38'
        },
        {
            stationcode: 20,
            state: 'NSW',
            fueltype: 'P98',
            price: 187.9,
            lastupdated: '28/09/2021 21:30:46'
        },
        {
            stationcode: 20,
            state: 'NSW',
            fueltype: 'U91',
            price: 164.9,
            lastupdated: '28/09/2021 21:30:46'
        },
        {
            stationcode: 21,
            state: 'NSW',
            fueltype: 'DL',
            price: 155.9,
            lastupdated: '29/09/2021 22:00:51'
        },
        {
            stationcode: 21,
            state: 'NSW',
            fueltype: 'E10',
            price: 147.9,
            lastupdated: '19/09/2021 22:50:32'
        },
        {
            stationcode: 21,
            state: 'NSW',
            fueltype: 'P95',
            price: 164.9,
            lastupdated: '19/09/2021 22:50:32'
        },
        {
            stationcode: 21,
            state: 'NSW',
            fueltype: 'P98',
            price: 172.9,
            lastupdated: '19/09/2021 22:50:32'
        },
        {
            stationcode: 21,
            state: 'NSW',
            fueltype: 'U91',
            price: 149.9,
            lastupdated: '19/09/2021 22:50:32'
        },
        {
            stationcode: 22,
            state: 'NSW',
            fueltype: 'DL',
            price: 158.9,
            lastupdated: '30/09/2021 01:45:44'
        },
        {
            stationcode: 22,
            state: 'NSW',
            fueltype: 'P95',
            price: 161.9,
            lastupdated: '29/09/2021 02:35:40'
        },
        {
            stationcode: 22,
            state: 'NSW',
            fueltype: 'P98',
            price: 169.9,
            lastupdated: '29/09/2021 02:30:50'
        },
        {
            stationcode: 22,
            state: 'NSW',
            fueltype: 'U91',
            price: 146.9,
            lastupdated: '29/09/2021 02:30:50'
        },
        {
            stationcode: 23,
            state: 'NSW',
            fueltype: 'DL',
            price: 159.9,
            lastupdated: '29/09/2021 22:30:45'
        },
        {
            stationcode: 23,
            state: 'NSW',
            fueltype: 'E10',
            price: 144.9,
            lastupdated: '29/09/2021 23:30:54'
        },
        {
            stationcode: 23,
            state: 'NSW',
            fueltype: 'P95',
            price: 161.9,
            lastupdated: '29/09/2021 23:30:54'
        },
        {
            stationcode: 23,
            state: 'NSW',
            fueltype: 'P98',
            price: 169.9,
            lastupdated: '29/09/2021 23:30:54'
        },
        {
            stationcode: 24,
            state: 'NSW',
            fueltype: 'DL',
            price: 160.9,
            lastupdated: '30/09/2021 05:30:46'
        },
        {
            stationcode: 24,
            state: 'NSW',
            fueltype: 'E10',
            price: 153.9,
            lastupdated: '29/09/2021 02:30:50'
        },
        {
            stationcode: 24,
            state: 'NSW',
            fueltype: 'P95',
            price: 170.9,
            lastupdated: '29/09/2021 02:30:50'
        }
    ]

    sampleStationData = [
        {
            brandid: '',
            stationid: '',
            brand: 'Independent',
            code: '2276',
            name: 'Telarah Fuels',
            address: '17 South St, TELARAH NSW 2320',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Puma Energy',
            code: '2277',
            name: 'Lawrence General & Liquor Store',
            address: '1 Richmond St, LAWRENCE NSW 2460',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Independent',
            code: '2280',
            name: 'Emmdale Roadhouse',
            address: '15891 Barrier Highway, COBAR NSW 2835',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Independent',
            code: '2281',
            name: 'Gingers Creek Bush Resort',
            address: '10366 Oxley Highway, MOUNT SEAVIEW NSW 2446',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Independent',
            code: '2282',
            name: 'Townsend General Store',
            address: '1 Scullin St, TOWNSEND NSW 2463',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Caltex Woolworths',
            code: '2283',
            name: 'Caltex Woolworths Bateau Bay',
            address: '9 Bay Village Rd, BATEAU BAY NSW 2261',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: '7-Eleven',
            code: '2286',
            name: '7-Eleven Gateshead',
            address: '13-15 Pacific Highway, GATESHEAD NSW 2290',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Metro Fuel',
            code: '2290',
            name: 'The Gullie Roadhouse',
            address: 'The Gullie Store 2356 Sturt Hwy, COLLINGULLIE NSW 2650',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Caltex',
            code: '2292',
            name: 'Caltex Mittagong',
            address: '115 Main St, MITTAGONG NSW 2575',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Independent',
            code: '2295',
            name: 'Tabulam Rural Agents',
            address: '8611 Bruxner Hwy, TABULAM NSW 2469',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'BP',
            code: '2296',
            name: 'BP Glen Innes',
            address: '205 Ferguson St, GLEN INNES NSW 2370',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Independent',
            code: '2298',
            name: 'Nicholson Petroleum',
            address: '11 Lower Rankin St, FORBES NSW 2871',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Liberty',
            code: '2299',
            name: 'Casino Roadhouse',
            address: '86 Johnston St, CASINO NSW 2470',
            location: [Object],
            state: 'NSW'
        },
        {
            brandid: '',
            stationid: '',
            brand: 'Caltex',
            code: '2300',
            name: 'Reel (Taralga) Pty Ltd',
            address: '58 Bunnaby St, TARALGA NSW 2580',
            location: [Object],
            state: 'NSW'
        },
    ]
}