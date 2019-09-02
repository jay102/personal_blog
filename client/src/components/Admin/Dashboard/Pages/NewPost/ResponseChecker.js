import React from 'react';

let ResponseChecker = (props) => {
  const { error, success } = props;
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        An Error occured
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  } else if (success) {
    return (
      <div className="alert alert-success" role="alert">
        {props.caller}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  } else {
    return null
  }
}
export default ResponseChecker;