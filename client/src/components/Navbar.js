import { Link } from "react-router-dom";
import React from 'react';
import "../App.css";
import logo from '../Assets/logo.png';

function Navbar() {

    return (
        <nav className="nav" >
            <div className="logo">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div id="nav-div">
                <div className="nav-links">
                    <Link to="/donorh">Homepage</Link>
                    <Link to="/aboutus">Aboutus</Link>
                    <Link to="/vision">Vision</Link>
                    <Link to="/news">News</Link>
                    <Link to="/pages">Pages</Link>
                </div>
                <div className="btn">
                    <button>Donate</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;