const items = require('../database/models/items')

const getItems = async () => {
    return await items.find({})
}

module.exports = getItems