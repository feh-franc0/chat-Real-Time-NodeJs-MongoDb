const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    message: String,
})

module.exports = Person