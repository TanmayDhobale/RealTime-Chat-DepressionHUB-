import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
// Import any other contexts or setup you need

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
