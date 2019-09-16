import React from 'react';
import Card from '../../../Widgets/Card/Card'
import { Link } from 'react-router-dom'
import Spinner from '../../../Widgets/Spinner/spinner'

const Sidebar = (props) => {
  const { tags } = props;
  if (tags === undefined || tags.length === 0) {
    return <Spinner />
  } else {
    return (
      <div className="col-md-4">
        <Card title={"Categories"} bg_style={"single_post"} view={<Category {...props} />} />
      </div>
    );
  }
}

const Category = (props) => {
  const { tags } = props;
  const half = Math.floor(tags.length / 2);
  const left = tags.slice(0, half);
  const right = tags.slice(half, tags.length)
  return (
    <>
      <div className="col-lg-6">
        <ul className="list-unstyled mb-0">
          {left.map(tags => {

            return (
              <li key={tags.id}>
                <Link className={`${tags.class}`} to={`${tags.url}`}>#{tags.tag}</Link>
              </li>
            );
          })}

        </ul>
      </div>
      <div className="col-lg-6">
        <ul className="list-unstyled mb-0">
          {right.map(tags => {

            return (
              <li key={tags.id}>
                <Link className={`${tags.class}`} to={`${tags.url}`}>#{tags.tag}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Sidebar;