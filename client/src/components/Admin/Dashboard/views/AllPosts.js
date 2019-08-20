import React, { Component } from 'react';
import axios from 'axios'
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import uuid from 'uuidv4'
import slugify from '@sindresorhus/slugify'

class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            edit_state: false,
            delay: 1000,
            editPosts: []
        }
    }
    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        axios.get('/posts')
            .then(res => {
                let result = res.data.Posts
                console.log(result)
                this.setState({
                    posts: result
                })
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                }
            })
    }
    toggleEdit = (e, postsEdits) => {
        e.preventDefault();
        this.setState({
            editPosts: postsEdits
        })
    }

    render() {
        const Table = this.state.posts.map(posts => {
            return (
                <tbody key={posts.id}>
                    <tr scope="row">
                        <td>{posts.id}</td>
                        <td>{posts.title}</td>
                        <td>{posts.author}</td>
                        <td>{posts.time}</td>
                        <td style={{ fontSize: "0.72rem" }}><button onClick={e => this.toggleEdit(e, posts)} className="mybutton" style={{ marginRight: "5px" }} data-toggle="modal" data-target="#edit">Edit</button>{" "}<button className="mybutton">Delete</button></td>
                        <EditModal {...this.state.editPosts} />
                    </tr>
                </tbody>
            );
        })
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
                        {Table}
                    </table>
                </div>
            </main>
        );
    }
}

let EditModal = (props) => {

    return <div className="modal" tabIndex="-1" role="dialog" id="edit">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Post</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                        <span className="input-group-text" id="basic-addon3">http://localhost:3000/posts/</span>
                                    </div>
                                    <input type="text" className="form-control" id="url" name="url" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Title <span className="require">*</span></label>
                                <input type="text" className="form-control" name="postTitle" value={props.title} />
                            </div>

                            <div className="form-group">
                                <SimpleMDEReact
                                    className={""}
                                    label="Description"
                                    value={props.body}
                                    options={
                                        {
                                            spellChecker: true,
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
                                <button type="submit" className="btn btn-primary" style={{ marginBottom: "10px" }}>
                                    Submit
    		        </button>
                            </div>

                        </form>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
}

export default AllPosts;