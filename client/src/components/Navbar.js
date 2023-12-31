import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "../App.css";
import logo from '../Assets/logo.png';

function Navbar() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    const handleDonateClick = () => {
        if (authenticated) {
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    function PagesDropdown(props) {
        const [isOpen, setIsOpen] = useState(false);

        const handleDropdownOpen = () => setIsOpen(true);
        const handleDropdownClose = () => setIsOpen(false);

        return (
            <div className="dropdown">
                <div
                    role="button"
                    tabIndex="0"
                    onClick={handleDropdownOpen}
                    onBlur={handleDropdownClose}
                    className="dropdown-toggle"
                >
                    {props.title}
                </div>
                {isOpen && (
                    <ul className="dropdown-content">
                        {props.children}
                    </ul>
                )}
            </div>
        );
    }

    return (
        <nav className="nav">
            <div className="logo">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div id="nav-div">
                <div className="nav-links">
                    <Link to="/">Homepage</Link>
                    <Link to="/aboutus">Aboutus</Link>
                    <Link to="/vision">Vision</Link>
                    <Link to="/news">News</Link>
                    <PagesDropdown title="Pages">
                        <Link to="/aboutus">Aboutus</Link>
                        <Link to="/vision">Vision</Link>
                        <Link to="/gallery">Gallery</Link>
                    </PagesDropdown>
                </div>
                <div className="btn">
                    <button onClick={handleDonateClick}>Donate</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
