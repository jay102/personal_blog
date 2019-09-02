import React, { Component } from 'react';
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import slugify from '@sindresorhus/slugify'
import moment from 'moment'
import NewPostView from './NewPostView'


export class NewPost extends Component {
    state = {
        url: "",
        postTitle: "",
        postContent: "",
        delay: 1000,
        error: false,
        success: false,
        tags: [],
        checked: [],
        featured_img: null
    }

    componentDidMount() {
        this.getTags();
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
    handleTagSelection = (e) => {
        const { name, checked } = e.target
        if (checked) {
            this.setState({ checked: this.state.checked.concat(name) })
        } else {
            this.setState({ checked: this.state.checked.filter((item) => item !== name) })
        }
    }
    getTags = () => {
        axios.get('/tags').then(res => {
            this.setState({ tags: res.data.tags })
        })
    }
    setImage = (file) => {
        this.setState({ featured_img: URL.createObjectURL(file) })
    }
    makeRequest = e => {
        e.preventDefault()
        const time = moment().format("llll");
        const data = new FormData()
        data.append('post_url', `${slugify(this.state.url)}`)
        data.append('title', this.state.postTitle)
        data.append('body', this.state.postContent)
        data.append('time', time)
        data.append('author', "Admin")
        data.append('tags', this.state.checked.toString())
        data.append('image_url', this.state.featured_img)
        axios.post('/posts/new-post', data)
            .then(res => {
                //successful post
                console.log(res.data)
                this.setState(
                    {
                        postContent: "",
                        url: "",
                        postTitle: "",
                        success: !this.state.success,
                        featured_img: null
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
        return (
            <NewPostView
                state={this.state}
                handleSlugChange={this.handleSlugChange}
                handlePostTitleChange={this.handlePostTitleChange}
                handlePostChange={this.handlePostChange}
                makeRequest={this.makeRequest}
                handleTagSelection={this.handleTagSelection}
                setImage={this.setImage} />
        );
    }
}

export default NewPost;