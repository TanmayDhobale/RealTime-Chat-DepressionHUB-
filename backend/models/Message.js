const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatRoom: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    // Add any other relevant fields
});

module.exports = mongoose.model('Message', messageSchema);
