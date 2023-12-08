import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './user.css';
import '../index.css'

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Login successful');
                navigate('/admin');
            } else {
                console.error('Error logging in:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='gen'>
        <div className='login'>
            <h2>Login</h2>
            <label>
                Email:
                <input type="email" name="email" onChange={handleInputChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={handleInputChange} />
            </label>
            <button onClick={handleLogin}>Login</button>

        </div>
        </div>
    );
};

export default Login;