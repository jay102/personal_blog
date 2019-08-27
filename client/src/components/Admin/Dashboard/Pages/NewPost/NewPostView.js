import React from 'react';
import SimpleMDEReact from "react-simplemde-editor";
import ResponseChecker from './ResponseChecker'
import uuid from 'uuidv4'

const NewPostView = (props) => {
    let { delay } = props.state;
    return (

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="col-md-8 col-md-offset-2">
                <ResponseChecker data={props.state} />
                <form>
                    <div className="form-group has-error">
                        <label htmlFor="slug">Slug <span className="require">*</span> <small>(This field use in url path.)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon3">{`${window.location.origin}`}</span>
                            </div>
                            <input type="text" className="form-control" id="url" name="url" value={props.state.url} onChange={props.handleSlugChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Title <span className="require">*</span></label>
                        <input type="text" className="form-control" name="postTitle" value={props.state.postTitle} onChange={props.handlePostTitleChange} />
                    </div>

                    <div className="form-group">
                        <SimpleMDEReact
                            className={""}
                            label="Description"
                            onChange={props.handlePostChange}
                            value={props.state.postContent}
                            options={
                                {
                                    spellChecker: true,
                                    autosave: {
                                        enabled: true,
                                        uniqueId: uuid(),
                                        delay
                                    },

                                }
                            }
                        />
                    </div>

                    <div className="form-group">
                        <p><span className="require">*</span> - required fields</p>
                    </div>

                    <div className="form-group">
                        <button type="submit" onClick={props.makeRequest} className="btn btn-primary" style={{ marginBottom: "10px" }}>
                            Submit
                            </button>
                        <ResponseChecker {...props.state} caller={"Post added!"} />
                    </div>

                </form>


            </div>
        </main>
    );
}
export default NewPostView