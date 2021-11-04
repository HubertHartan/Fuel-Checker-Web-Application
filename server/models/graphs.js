const mongoose = require('mongoose')

const graphSchema = new mongoose.Schema({
  fueltype: String,
  price: Number,
},{
	timestamps:true
})

graphSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Graph = mongoose.model('Graph', graphSchema)

module.exports = Graph

