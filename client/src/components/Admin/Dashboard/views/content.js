import React, { Component } from "react";
import axios from 'axios'

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            postNo: ""
        }
    }
    componentDidMount() {
        this.getPosts()
    }


    getPosts = () => {
        axios.all([this.getAllPosts(), this.getPostCount()])
            .then(axios.spread((posts, number) => {
                this.setState({
                    posts: posts.data.Posts,
                    postNo: number.data.Posts
                })
            }))
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                }
            })
    }
    getAllPosts = () => {
        return axios.get('/posts');
    }
    getPostCount = () => {
        return axios.get('/posts/posts-count');
    }

    render() {
        const recentPosts = this.state.posts.map(posts => {
            return (
                <tbody key={posts.id}>
                    <tr scope="row">
                        <td>{posts.id}</td>
                        <td>{posts.title}</td>
                        <td>{posts.author}</td>
                        <td>{posts.time}</td>
                    </tr>
                </tbody>
            );
        })
        return (
            <React.Fragment>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">

                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card">
                                    <div className="card-header">
                                        <span style={{ marginRight: "5px" }}><i className="fa fa-poll-h"></i></span>{" "}All posts
  </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{this.state.postNo}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card">
                                    <div className="card-header">
                                        <span style={{ marginRight: "5px" }}><i className="fa fa-globe-europe"></i></span>{" "}Page Visits
  </div>
                                    <div className="card-body">
                                        <h5 className="card-title">12,345</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card">
                                    <div className="card-header">
                                        <span style={{ marginRight: "5px" }}><i className="fa fa-comments"></i></span>{" "}All Comments
  </div>
                                    <div className="card-body">
                                        <h5 className="card-title">15</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-sm">
                            <p>Recent posts...</p>
                            <button style={{ float: "right", padding: "10px", margin: "5px", backgroundColor: "#444", color: "#fff" }} onClick={() => this.props.history.push('/admin/dashboard/all-posts')}>All Posts</button>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">TITLE</th>
                                        <th scope="col">AUTHOR</th>
                                        <th scope="col">DATE</th>
                                    </tr>
                                </thead>
                                {recentPosts}
                            </table>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Content;
