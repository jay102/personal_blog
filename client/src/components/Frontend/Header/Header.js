import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
const img = require('../../../assets/img/logo.png');

class Header extends Component {

    render() {
        const user_id = localStorage.getItem('user_id');
        const admin = () => {
            if (user_id) {
                return (
                    <li className="nav-item">
                        <NavLink to="/admin/dashboard" className="nav-link" href="/dashboard">Dashboard</NavLink>
                    </li>
                );
            }
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="" href="/"><img src={img} alt="logo" /></a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                    <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" href="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link" href="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link" href="/contact">Contact</NavLink>
                            </li>
                            {/* {admin} */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;