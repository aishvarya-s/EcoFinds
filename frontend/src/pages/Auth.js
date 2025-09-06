import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
                localStorage.setItem('token', res.data.token);
                navigate('/products'); // Redirect to products feed on success
            } else {
                await axios.post('http://localhost:5000/api/users/register', { username, email, password });
                alert('Registration successful! You can now log in.');
                navigate('/login');
            }
        } catch (error) {
            console.error(error.response.data);
            alert('Error: ' + error.response.data.msg);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
};

export default Auth;