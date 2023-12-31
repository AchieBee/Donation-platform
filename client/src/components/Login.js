import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './user.css';
import '../index.css'

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        user_type: 'Donor',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Login successful');
                
                if (formData.user_type === 'Donor') {
                    navigate('/'); 
                } else if (formData.user_type === 'Charity') {
                    navigate('/charityh');
                } else {
                    console.error('Invalid user type');
                }
            } else {
                console.error('Error logging in:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='loginmain'>
            
        
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
            <label className='label'>
                User Type:
                <select name="user_type" onChange={handleInputChange}>
                    <option value="Donor">Donor</option>
                    <option value="Charity">Charity</option>
                </select>
            </label>
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
        </div>
    );
};

export default Login;

