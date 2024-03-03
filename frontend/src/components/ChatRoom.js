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
    // You should configure this URL
    socket = io('http://localhost:5000');

    socket.emit('join', { name: user.name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [room, user.name]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [messages]);

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
