import React, { Component } from 'react';
import articlesRepository from '../../../../../services/articlesRepository'
import axios from 'axios'
import EditModal from './EditModal'
import AllPostsTable from '../../../../Widgets/Table/Table'
import slugify from '@sindresorhus/slugify'
import moment from 'moment'


const repository = articlesRepository(axios)
class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            edit_state: false,
            delay: 1000,
            editPosts: [],
            new_url: "",
            new_postTitle: "",
            new_postContent: "",
            post_id: "",
            success: false,
            error: false
        }
    }
    componentDidMount() {
        this.getPosts(1)
    }
    handlePostChange = (value) => {
        this.setState({
            new_postContent: value
        })
    }
    handlePostTitleChange = (e) => {
        const slug = slugify(e.target.value)
        this.setState({
            new_url: slug,
            new_postTitle: e.target.value
        })
    }
    handleSlugChange = (e) => {
        this.setState({
            new_url: e.target.value
        })

    }
    getPosts = async (page) => {
        try {
            const posts = await repository.getArticles(page)
            this.setState({
                posts: posts
            })
        } catch (err) {
            if (err.response) {
                console.log(err.response)
            }
        }
    }
    deletePost = (e, postId) => {
        e.preventDefault();
        console.log(postId)
        const del = window.confirm('Are you sure you want to delete post?');
        if (del) {
            this.deleteFunc(postId)
        } else {
            return;
        }
    }
    deleteFunc = (postId) => {
        axios.delete(`/posts/${postId}`)
            .then(res => {
                alert(res.data.message)
                this.getPosts()
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
            new_postTitle: postsEdits.title,
            new_postContent: postsEdits.body,
            new_url: postsEdits.post_url,
            post_id: postsEdits.id
        })
    }
    makeRequest = (e, postId) => {
        e.preventDefault()
        console.log(postId)
        const time = moment().format("llll");
        let postData = {
            post_url: `${slugify(this.state.new_url)}`,
            title: this.state.new_postTitle,
            body: this.state.new_postContent,
            time: time,
            author: "Admin"
        }
        axios.put(`/posts/${postId}`, postData)
            .then(res => {
                //successful post
                console.log(res.data)
                this.setState(
                    {
                        new_postContent: "",
                        new_url: "",
                        new_postTitle: "",
                        success: !this.state.success
                    }
                )
                this.getPosts();
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
        const Table = this.state.posts.map(posts => {
            return (
                <tbody key={posts.id}>
                    <tr>
                        <td>{posts.id}</td>
                        <td>{posts.title}</td>
                        <td>{posts.author}</td>
                        <td>{posts.time}</td>
                        <td style={{ fontSize: "0.72rem" }}>
                            <button onClick={e => this.toggleEdit(e, posts)} className="mybutton" style={{ marginRight: "5px" }} data-toggle="modal" data-target="#edit">Edit</button>{" "}
                            <button onClick={e => this.deletePost(e, posts.id)} className="mybutton">Delete</button></td>
                    </tr>
                </tbody>
            );
        })
        return (
            <>
                <AllPostsTable Table={Table} />
                <EditModal
                    handleSlugChange={this.handleSlugChange}
                    handlePostTitleChange={this.handlePostTitleChange}
                    handlePostChange={this.handlePostChange}
                    makeRequest={this.makeRequest}
                    state={this.state} />
            </>
        );
    }
}

export default AllPosts;