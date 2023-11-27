import React from "react";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "../App.css";
import logo from '../Assets/logo.png';

function Navbar() {

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <nav className="nav" >
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div id="nav-div">
                <div class="row" className="nav-links">
                    <Link to={selectedUser === 'Donor' ? user1HomePage : selectedUser === 'Charity' ? user2HomePage : '/'} className="nav1">Homepage</Link>
                    <Link to="/aboutus">Aboutus</Link>
                    <Link to="/vision">Vision</Link>
                    <Link to="/news">News</Link>
                    <Link to="/pages">Pages</Link>
                    <button onClick={() => handleClick()}>Donate</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;