import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            setLoading(false);
            localStorage.setItem('userToken', response.data.token); // Assuming the API response includes a token
            navigate('/chat'); // Redirect to chat page after successful login
        } catch (err) {
            setError('Failed to login. Please try again.');
            setLoading(false);
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirect to signup page
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
                <button type="submit" disabled={loading} style={{ padding: '8px', marginBottom: '10px' }}>
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
                <button type="button" onClick={handleSignUpRedirect} style={{ padding: '8px' }}>
                    Sign Up
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
