import React from 'react';
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown'
import SimpleMDEReact from "react-simplemde-editor";
import ResponseChecker from './ResponseChecker'
import uuid from 'uuidv4'
import CodeBlock from './codeBlock';
import Card from '../../../../Widgets/Card/Card';
import CheckBox from '../../../../Widgets/CheckBox/CheckBox'
import FeaturedImg from './FeaturedImg'

const NewPostView = (props) => {
    let { delay } = props.state;
    const toolbar = [
        {
            name: "bold",
            action: function customFunction(editor) {
                editor.toggleBold();
            },
            className: "fa fa-bold",
            title: "Bold"
        }
    ];
    return (

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="container fluid">
                <div className="row">
                    <div className="col-9">
                        <ResponseChecker data={props.state} />
                        <Form {...props} delay={delay} />
                    </div>
                    <div className="col-3">
                        <aside>
                            <Card
                                title={"Tags"}
                                view={<Tags {...props.state}
                                    handleSelection={props.handleTagSelection} />} />
                            <Card
                                title={"Featured Image"}
                                view={<FeaturedImg {...props.state} setImage={props.setImage} />} />
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
let formStyle = {
    height: "100px",
    overflowY: "auto",
    overflowX: "hidden"
}
const Form = (props) => {
    return (
        <form>
            <div className="form-group has-error" style={formStyle}>
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
                                delay: props.delay
                            },
                            previewRender(postContent) {
                                return ReactDOMServer.renderToString(
                                    <ReactMarkdown
                                        source={postContent}
                                        renderers={{
                                            Code: CodeBlock
                                        }}
                                    />
                                );
                            }
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
    );
}

const Tags = (props) => {
    return (
        <div className="col-lg-6">
            {props.tags.map(item => {
                return <CheckBox title={item.tag} handleSelection={props.handleSelection} key={item.id} />
            })}
        </div>
    );
}

export default NewPostView;