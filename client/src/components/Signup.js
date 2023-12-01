import React, { useState } from 'react';

function Signup(){
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [userType, setUserType] = useState('');

    const handleSignup = () => {
        fetch('http://127.0.0.1:5555/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: fullName,
                username,
                email,
                password,
                image_url: imageUrl,
                user_type: userType,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Check for success and redirect
                if (data.message === 'Signup successful') {
                    window.location.href = '/login'; // Adjust the path as needed
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className='signup'>
            <h2>Sign Up</h2>
            <label>
                Full Name:
                <input type="text" name="fullName" onChange={(e) => setFullName(e.target.value)} />
            </label>
            <label>
                Username:
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Image URL:
                <input type="text" name="imageUrl" onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                User Type:
                <select name="userType" onChange={(e) => setUserType(e.target.value)}>
                    <option value="Donor">Donor</option>
                    <option value="Charity">Charity</option>
                </select>
            </label>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default Signup;