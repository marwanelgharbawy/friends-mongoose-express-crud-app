const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 20
    },
    date: {
        type: Number,
        min: 200, // These numbers will be changed later
        max: 2070,
        required: true
    },
    note: {
        type: String,
        required: false,
        max: 100
    }
})

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;