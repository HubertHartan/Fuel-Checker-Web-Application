const express = require('express')

const User = require("../models/users")

const userRouter = express.Router()

// Get user and saved station
userRouter.get('/api/user/:id', (req, res) => {
    User.findOne({
        id: req.params.id
    }).then(result => {
        res.json(result)
    })
})

userRouter.post('/api/user/add/:id', async(req, res) => {
    try {
        const user = await User.find({ id: req.params.id })
        if (user) {
            user.fuelStations.push(req.body.fuelStations)
            await user.save();
            return res.json("Added fuel station");
        } else {
            const newUser = new User({
                id: req.body.id,
                name: req.body.name,
                fuelStations: req.body.fuelStations,
            });
            newUser
              .save()
              .then(() => res.json("new user added"))
              .catch((err) => res.status(400).json("Error" + err));
        }
    } catch (error) {
        res.status(400).json("Error" + err)
    }
})

userRouter.delete('/api/user/delete/:id', async(req, res) => {
    try {
        const fuelStaion = req.body.fuelStation
        const user = await User.find({id: req.params.id })
        if (user) {
            user.fuelStations.filter(station => station.stationcode != fuelStaion)
            await user.save();
            return res.json("Deleted fuel station");
        }
    } catch (error) {
        res.status(400).json("Error" + err)
    }
})

module.exports = userRouter