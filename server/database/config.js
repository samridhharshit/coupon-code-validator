const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

const open = (uri = url) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, err => {
            if (err) return reject(err)
            console.log('connected to db!')
            resolve()
        })
    })
}


const close = () => mongoose.disconnect()

module.exports = { open, close }
