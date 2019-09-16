import React from 'react';

const AllTagsView = (props) => {
  return (
    <>
      <div className="col">
        <ul className="list-group">
          {props.tags}
        </ul>
      </div>
    </>
  );
}

export default AllTagsView;