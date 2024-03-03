import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

let socket;

function ChatRoom() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    socket = io('http://localhost:5000');

    socket.emit('join', { name: user?.name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [room, user?.name]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  // Inline styles
  const styles = {
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
    },
    chatBox: {
      width: '90%',
      height: '400px',
      border: '1px solid #ddd',
      marginBottom: '20px',
      overflowY: 'auto',
      padding: '10px',
      backgroundColor: '#f9f9f9',
    },
    message: {
      backgroundColor: '#e7e7e7',
      marginBottom: '10px',
      padding: '8px',
      borderRadius: '8px',
    },
    messageForm: {
      display: 'flex',
      width: '90%',
    },
    messageInput: {
      flexGrow: 1,
      padding: '10px',
      marginRight: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    sendButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.chatContainer}>
      <h1>Chat Room: {room}</h1>
      <div style={styles.chatBox}>
        {messages.map((message, i) => (
          <div key={i} style={styles.message}>
            {message.text}
          </div>
        ))}
      </div>
      <form style={styles.messageForm} onSubmit={sendMessage}>
        <input
          style={styles.messageInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button type="submit" style={styles.sendButton}>Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
