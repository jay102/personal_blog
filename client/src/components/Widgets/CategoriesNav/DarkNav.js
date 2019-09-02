import React from 'react';

const DarkNav = () => {
  return (
    <nav id="tag-nav" className="wrapper navbar is-dark is-hidden-touch">
      <a className="navbar-item color-react" href="/tag/react">
        <span>#</span>react
</a>
      <a className="navbar-item color-android" href="/tag/vue">
        <span>#</span>android
</a>
      <a className="navbar-item color-angular" href="/tag/angular">
        <span>#</span>angular
</a>
      <a className="navbar-item color-javascript" href="/tag/javascript">
        <span>#</span>javascript
</a>
      <a className="navbar-item color-node" href="/tag/node">
        <span>#</span>node
</a>
      <a className="navbar-item color-css" href="/tag/css">
        <span>#</span>java
</a>
    </nav>
  );
}
export default DarkNav;