 const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// AsyncHandler is a utility middleware for handling exceptions inside of async express routes and passing them to your express error handlers

// Controller to handle sending a message
exports.sendMessage = asyncHandler(async (req, res) => {
    const { chatRoom, message } = req.body;

    if (!message) {
        res.status(400);
        throw new Error('Message content cannot be empty');
    }

    const msg = await Message.create({
        chatRoom,
        author: req.user._id, // Assuming you store the user's ID in req.user
        message
    });

    res.status(201).json(msg);
});

// Controller to retrieve messages for a chat room
exports.getMessages = asyncHandler(async (req, res) => {
    const { chatRoom } = req.params;

    const messages = await Message.find({ chatRoom }).populate('author', 'username');

    res.json(messages);
});
