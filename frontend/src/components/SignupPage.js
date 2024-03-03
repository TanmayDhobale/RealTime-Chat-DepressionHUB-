import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleSignUpRedirect = () => {
        navigate('/login'); // Redirect to signup page
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      setLoading(false);
      // Redirect to chat after successful signup
      navigate('/chat');
    } catch (err) {
    // Check if the error message is about an existing user
    if (err.response && err.response.data && err.response.data.message === 'User already exists') {
        setError('User already exists. Please login or use a different username.');
    } else {
        // Handle other errors
        setError('Failed to signup. Please try again.');
    }
    setLoading(false);
}

  };

  return (
    <div style={{ width: '300px', margin: 'auto', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        
        <button type="submit" disabled={loading} style={{ padding: '8px' }}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <button type="button" onClick={handleSignUpRedirect} style={{ padding: '8px' }}>
                    log in 
                </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
