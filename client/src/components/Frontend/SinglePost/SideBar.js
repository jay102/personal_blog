import React from 'react';
import Card from '../../Widgets/Card/Card'

const Sidebar = () => {
  return (
    <div className="col-md-4">
      <Card title={"Categories"} bg_style={"single_post"} view={<Category />} />
    </div>
  );
}

const Category = () => {
  return (
    <>
      <div className="col-lg-6">
        <ul className="list-unstyled mb-0">
          <li>
            <a className="color-android" href="/tag/android">#Android</a>
          </li>
          <li>
            <a className="color-css" href="/tag/java">#Java</a>
          </li>
          <li>
            <a className="color-javascript" href="/tag/javascript">#JavaScript</a>
          </li>
        </ul>
      </div>
      <div className="col-lg-6">
        <ul className="list-unstyled mb-0">
          <li>
            <a className="color-node" href="/tag/node">#Node</a>
          </li>
          <li>
            <a className="color-react" href="/tag/react">#React</a>
          </li>
          <li>
            <a className="color-angular" href="tag/projects">#Projects</a>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Sidebar;