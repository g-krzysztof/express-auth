const mongoose = require('mongoose');

const memoryGameSchema = new mongoose.Schema({
    score: {
        type: Array,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('MemoryGame', memoryGameSchema);