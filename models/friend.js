const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [20, "name is too long"]
    },
    date: {
        type: Number,
        min: 200, // These numbers will be changed later
        max: [2024, "We didn't meet in the future"],
        required: true
    },
    note: {
        type: String,
        required: false,
    }
})

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;