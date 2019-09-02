import React from 'react';
const CommentForm = (props) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Leave a Comment:</h5>
      <div className="card-body">
        <form>
          <div className="form-group">
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default CommentForm;