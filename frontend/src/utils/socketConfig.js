import io from 'socket.io-client';

// You can export a configured socket instance or a function to initialize it
export const socket = io('http://localhost:5000');
