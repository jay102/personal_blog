import React from 'react';

const Table = (props) => {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="container">
        <h5>All blogposts</h5>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">AUTHOR</th>
              <th scope="col">DATE</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {props.Table}
        </table>
      </div>
    </main>
  );
}
export default Table;