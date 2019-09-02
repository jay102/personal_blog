import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
const img = require('../../../assets/img/logo.png');

class Header extends Component {

    setRedirect = () => {
        this.props.history.push('/admin/dashboard')
    }

    render() {
        const user_id = localStorage.getItem('user_id');
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a href="/"><img src={img} alt="logo" height="40px" width="40px" /></a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
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
                            {user_id == 1 ? <li className="nav-item">
                                <NavLink onClick={this.setRedirect} to="/admin/dashboard" className="nav-link">Dashboard</NavLink>
                            </li> : null}
                        </ul>
                    </div>
                </div>
            </nav >
        );
    }
}

export default Header;