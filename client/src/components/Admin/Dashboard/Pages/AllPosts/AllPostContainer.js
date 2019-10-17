import React, { Component } from 'react';
import articles_service from '../../../../../services/articles.service'
import axios from 'axios'
import EditModal from './EditModal'
import AllPostsTable from '../../../../Widgets/Table/Table'
import slugify from '@sindresorhus/slugify'
import Toolbar from '../NewPost/ToolBar'
import moment from 'moment'


const repository = articles_service(axios)
class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            tags: [],
            checked: [],
            edit_state: false,
            delay: 1000,
            editPosts: [],
            new_url: "",
            new_postTitle: "",
            new_postContent: "",
            post_id: "",
            featured_img: null,
            file: null,
            success: false,
            error: false
        }
    }
    componentDidMount() {
        this.getPosts(1)
        this.getTags()
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
    handleTagSelection = (e) => {
        const { name, checked } = e.target
        console.log(name, checked)
        if (checked) {
            this.setState({ checked: this.state.checked.concat(name) })
        } else {
            this.setState({ checked: this.state.checked.filter((item) => item !== name) })
        }
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
    getTags = async () => {
        try {
            const data = await repository.getTags();
            this.setState({ tags: data })
        } catch (err) {
            console.log(err)
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
    emptyTags = (e) => {
        e.preventDefault()
        this.setState({
            checked: []
        })
    }
    setImage = (file) => {
        this.setState({
            featured_img: URL.createObjectURL(file),
            file
        })
        console.log(this.state.file)
    }
    toggleEdit = (e, postsEdits) => {
        e.preventDefault();
        this.setState({
            new_postTitle: postsEdits.title,
            new_postContent: postsEdits.body,
            new_url: postsEdits.post_url,
            post_id: postsEdits.id,
        })
    }
    // formatToObject = (tags) => {
    //     return tags.split(',').reduce((obj, item) => {
    //         if (!obj[item]) {
    //             obj[item] = true;
    //         }
    //         return obj;
    //     }, {});
    // }
    makeRequest = (e, postid) => {
        e.preventDefault()
        const data = new FormData();
        data.append('post_url', `${slugify(this.state.new_url)}`)
        data.append('title', this.state.new_postTitle)
        data.append('body', this.state.new_postContent)
        data.append('time', moment().format("llll"))
        data.append('author', "Admin")
        data.append('tags', this.state.checked.toString())
        data.append('image_url', this.state.file)

        axios.put(`/posts/${postid}`, data)
            .then(res => {
                //successful post
                console.log(res.data)
                this.setState(
                    {
                        new_postContent: "",
                        new_url: "",
                        new_postTitle: "",
                        success: !this.state.success,
                        post_tags: {},
                        checked: [],
                        featured_img: null
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
                            <button onClick={(e) => this.toggleEdit(e, posts)} className="mybutton" style={{ marginRight: "5px" }} data-toggle="modal" data-target="#edit" data-backdrop="static" data-keyboard="false">Edit</button>{" "}
                            <button onClick={(e) => this.deletePost(e, posts.id)} className="mybutton">Delete</button></td>
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
                    handleSelection={this.handleTagSelection}
                    makeRequest={this.makeRequest}
                    emptyTags={this.emptyTags}
                    state={this.state}
                    setImage={this.setImage}
                    toolbar={Toolbar}
                    backendurl={this.props.backendurl} />
            </>
        );
    }
}

export default AllPosts;