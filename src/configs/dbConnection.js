"use strict"

// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function () {
    // Connect:
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

module.exports = {
    mongoose,
    dbConnection
} 