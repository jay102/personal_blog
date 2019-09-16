import React from 'react';
import ResponseChecker from '../../Admin/Dashboard/Pages/NewPost/ResponseChecker';

const Modal = (props) => {
  return (
    <>
      <div className="modal" tabIndex="-1" role="dialog" id={props.modalId}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.modalTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Tag name</label>
                  <input type="text" className="form-control" placeholder="Title" name="tag" onChange={props.handleInput} value={props.tag} />
                </div>
                <div className="form-group">
                  <label>Tag url</label>
                  <input type="text" className="form-control" placeholder="Url" name="url" onChange={props.handleInput} value={props.url} />
                </div>
                <div className="form-group">
                  <label>Tag class (color)</label>
                  <input type="text" className="form-control" placeholder="Class" name="class" onChange={props.handleInput} value={props.class} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-block" onClick={props.submit}>Edit</button>
            </div>
            <ResponseChecker {...props} caller={"Tag Edited Successfully"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;