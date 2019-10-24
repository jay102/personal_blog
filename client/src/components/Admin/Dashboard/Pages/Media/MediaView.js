import React from 'react';

const MediaView = (props) => {
  console.log(props.media)
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="container">
        <div className="row">
          {/* {props.media} */}
        </div>

      </div>
      <div>This is the media page</div>
    </main>

  );
}

export default MediaView;