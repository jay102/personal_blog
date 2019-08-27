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
            post_url: `${slugify(this.state.url)}`,
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
        return (
            <NewPostView
                state={this.state}
                handleSlugChange={this.handleSlugChange}
                handlePostTitleChange={this.handlePostTitleChange}
                handlePostChange={this.handlePostChange}
                makeRequest={this.makeRequest} />
        );
    }
}

export default NewPost;