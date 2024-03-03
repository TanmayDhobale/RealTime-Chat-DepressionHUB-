import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';

let socket;

function ChatRoom() {
  const { user } = useContext(AuthContext); // Assume your AuthContext provides this
  const [room, setRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Configure this URL as needed
    socket = io('http://localhost:5000');

    // Use optional chaining to safely access user.name
    socket.emit('join', { name: user?.name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [room, user?.name]); // Depend on user?.name to automatically handle null users

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []); // Removed `messages` from the dependency array

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, i) => <div key={i}>{message.text}</div>)}
      </div>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
