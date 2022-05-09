const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('books', bookSchema)