import React from 'react';
import uuid from 'uuidv4'
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ResponseChecker from '../NewPost/ResponseChecker'
import CheckBox from '../../../../Widgets/CheckBox/CheckBox';
import Card from '../../../../Widgets/Card/Card'
import FeaturedImg from '../../Pages/NewPost/FeaturedImg'
const EditPost = (props) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" id="edit">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Post</h5>
            <button onClick={props.emptyTags} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <form>
                <div className="form-group has-error">
                  <label htmlFor="slug">Slug <span className="require">*</span> <small>(This field use in url path.)</small></label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">{`${window.location.origin}`}</span>
                    </div>
                    <input type="text" className="form-control" id="url" name="new_url" onChange={props.handleSlugChange} defaultValue={props.state.new_url} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Title <span className="require">*</span></label>
                  <input type="text" className="form-control" onChange={props.handlePostTitleChange} name="new_postTitle" defaultValue={props.state.new_postTitle} />
                </div>
                <div className="form-group" style={{ display: "flex", flexWrap: "wrap" }}>
                  {props.state.tags.map(item => {
                    return <CheckBox title={item.tag} key={item.id} checked={props.state.post_tags} handleSelection={props.handleSelection} />
                  })}
                </div>
                <div className="form-group">
                  <Card
                    title={"Featured Image"}
                    view={<FeaturedImg {...props.state} setImage={props.setImage} />} />
                </div>
                <div className="form-group">
                  <SimpleMDEReact
                    className={""}
                    label="Description"
                    value={props.state.new_postContent}
                    onChange={props.handlePostChange}
                    options={
                      {
                        spellChecker: true,
                        toolbar: props.toolbar,
                        imageUploadFunction: props.imageUploadFunction,
                        uploadImage: true,
                        autosave: {
                          enabled: true,
                          uniqueId: uuid(),

                        },
                      }
                    }
                  />
                </div>

                <div className="form-group">
                  <p><span className="require">*</span> - required fields</p>
                </div>

                <div className="form-group">
                  <ResponseChecker {...props.state} caller={"Post Edited!"} />
                </div>

              </form>
            </div>

          </div>
          <div className="modal-footer">
            <button onClick={props.emptyTags} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={e => props.makeRequest(e, props.state.post_id)} type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPost;