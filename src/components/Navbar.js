import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../carouselImages/logoripi.png';
import "../stylesmandaz.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} width="60" height="60" alt="RipipsaVista" />
                <span className="brand-title">RipipsaVista</span>
            </div>
            <div className="navbar-links">
                <ul>
                    <li className="navbar-links-button"><Link to="/Home">Inicio</Link></li>
                    <li className="navbar-links-button"><Link to="/menuAR">Realidad Aumentada</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
