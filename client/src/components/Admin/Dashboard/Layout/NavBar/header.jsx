import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://jaycodes.com">JayCodes Admin</a>
      <a href={`${window.location.origin}`} style={{ float: "right", padding: "10px", color: "white" }}>Home</a>
    </nav>
  );
}

export default NavBar;
