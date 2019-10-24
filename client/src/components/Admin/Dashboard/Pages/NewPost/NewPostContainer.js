import React, { Component } from 'react';
import "easymde/dist/easymde.min.css";
import articlesRepository from '../../../../../services/articles.service'
import axios from 'axios'
import slugify from '@sindresorhus/slugify'
import moment from 'moment'
import NewPostView from './NewPostView'

const repository = articlesRepository(axios)
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
        featured_img: null,
        file: null
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
    getTags = async () => {
        try {
            const data = await repository.getTags();
            this.setState({ tags: data })
        } catch (err) {
            console.log(err)
        }
    }
    imageUploadFunction = (file, onSuccess, onError) => {
        const data = new FormData();
        data.append('image', file)
        axios.post('/posts/images', data)
            .then(res => {
                onSuccess(res.data.data.url)
            }).catch(err => {
                if (err.response) {
                    onError(err.response.data.error)
                }
            })
    };
    setImage = (file) => {
        this.setState({ featured_img: URL.createObjectURL(file), file: file })
    }
    makeRequest = e => {
        e.preventDefault()
        const time = moment().format("llll");
        const data = new FormData();
        data.append('post_url', `${slugify(this.state.url)}`)
        data.append('title', this.state.postTitle)
        data.append('body', this.state.postContent)
        data.append('time', time)
        data.append('author', "Admin")
        data.append('tags', this.state.checked.toString())
        data.append('image_url', this.state.file)
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
                setImage={this.setImage}
                backendurl={this.props.backendurl}
                imageUploadFunction={this.imageUploadFunction} />
        );
    }
}

export default NewPost;