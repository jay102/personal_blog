import React from 'react';
import { Link } from 'react-router-dom'

const Nav = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a href="/"><img src={props.img} alt="logo" height="40px" width="40px" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Nav;