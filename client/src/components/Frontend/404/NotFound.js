import React from 'react';
import './styles.css'

const NotFound = (props) => {
  return (

    <section className="body-404 error-wrapper">
      <i className="icon-404"></i>
      <h1>404</h1>
      <h2>page not found</h2>
      <p className="page-404">Something went wrong or that page doesn’t exist yet. <a href="/">Return Home</a></p>
    </section>

  );
}
export default NotFound;