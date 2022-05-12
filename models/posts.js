const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    body: {
        type: String,
        required: true,
        lowercase: true,
    },
    userId: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Posts', PostsSchema)