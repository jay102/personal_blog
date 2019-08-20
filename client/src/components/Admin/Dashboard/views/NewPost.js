import React, { Component } from 'react';
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import slugify from '@sindresorhus/slugify'
import moment from 'moment'
import uuid from 'uuidv4'

class NewPost extends Component {
    state = {
        url: "",
        postTitle: "",
        postContent: "",
        delay: 1000,
        error: false,
        success: false
    }

    handlePostChange = (value) => {
        this.setState({
            postContent: value
        })
    }
    handlePostTitleChange = (e) => {
        const slug = slugify(e.target.value)
        this.setState({
            url: slug,
            postTitle: e.target.value
        })
    }
    handleSlugChange = (e) => {
        this.setState({
            url: e.target.value
        })

    }
    makeRequest = e => {
        e.preventDefault()
        const time = moment().format("llll");
        let postData = {
            post_url: "http://localhost:3000/posts/" + slugify(this.state.url),
            title: this.state.postTitle,
            body: this.state.postContent,
            time: time,
            author: "Admin"
        }
        axios.post('/posts/new-post', postData)
            .then(res => {
                //successful post
                console.log(res.data)
                this.setState(
                    {
                        postContent: "",
                        url: "",
                        postTitle: "",
                        success: !this.state.success
                    }
                )
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                    this.setState({
                        error: !this.state.error
                    })
                }
            });
    }

    render() {
        let { delay } = this.state;
        return (

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="col-md-8 col-md-offset-2">
                    <ResponseChecker data={this.state} />
                    <form>
                        <div className="form-group has-error">
                            <label htmlFor="slug">Slug <span className="require">*</span> <small>(This field use in url path.)</small></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">http://localhost:3000/posts/</span>
                                </div>
                                <input type="text" className="form-control" id="url" name="url" value={this.state.url} onChange={this.handleSlugChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title <span className="require">*</span></label>
                            <input type="text" className="form-control" name="postTitle" value={this.state.postTitle} onChange={this.handlePostTitleChange} />
                        </div>

                        <div className="form-group">
                            <SimpleMDEReact
                                className={""}
                                label="Description"
                                onChange={this.handlePostChange}
                                value={this.state.postContent}
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
                            <button type="submit" onClick={this.makeRequest} className="btn btn-primary" style={{ marginBottom: "10px" }}>
                                Submit
    		        </button>
                            <ResponseChecker {...this.state} />
                        </div>

                    </form>


                </div>
            </main>
        );
    }
}

let ResponseChecker = (props) => {
    const { error, success } = props;
    if (error) {
        return (
            <div class="alert alert-success" role="alert">
                An Error occured </div>
        );
    } else if (success) {
        return (
            <div class="alert alert-success" role="alert">
                Post added!
</div>
        );
    } else {
        return null
    }
}

export default NewPost;