require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // Adjust according to your frontend's origin for security
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

// Models
require('./models/User');
require('./models/Message');

// Routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);
app.use('/api/users', require('./routes/userRoutes'));
// Util functions
const { addUser, removeUser, getUser } = require('./utils/matchingAlgorithm');

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ userId, roomId }, callback) => {
    const { error, user } = addUser({ id: socket.id, userId, roomId });

    if(error) return callback(error);

    socket.join(user.roomId);

    // Welcome current user
    socket.emit('message', { user: 'admin', text: `${user.userId}, welcome to the room ${user.roomId}` });

    // Broadcast when a user connects
    socket.broadcast.to(user.roomId).emit('message', { user: 'admin', text: `${user.userId} has joined!` });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.roomId).emit('message', { user: user.userId, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.roomId).emit('message', { user: 'admin', text: `${user.userId} has left.` });
    }
  });
});

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
