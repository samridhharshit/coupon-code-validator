const mongoose = require('mongoose')
const schema = mongoose.Schema

const itemsSchema = schema({
    name: String,
    desc: String,
    price: Number
})

const items = mongoose.model("items", itemsSchema)

module.exports = items