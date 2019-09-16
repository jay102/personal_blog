import React from 'react';
import ResponseChecker from '../../NewPost/ResponseChecker'
const NewTagsView = (props) => {
  return (
    <>
      <div className="col">
        <form onSubmit={props.submit} style={{ marginBottom: "10px" }}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Title" name="tag" onChange={props.handleInput} value={props.tag} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Url" name="url" onChange={props.handleInput} value={props.url} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Class" name="class" onChange={props.handleInput} value={props.class} />
          </div>
          <button className="btn btn-primary btn-block">Add</button>
        </form>
        <ResponseChecker {...props} caller={"Tag added!"} />
      </div>
    </>
  );
}

export default NewTagsView;