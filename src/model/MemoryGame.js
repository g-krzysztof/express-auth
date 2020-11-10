const mongoose = require('mongoose');

const memoryGameSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('MemoryGame', memoryGameSchema);