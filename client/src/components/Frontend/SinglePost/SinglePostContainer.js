import React, { Component } from 'react';
import SinglePostView from './SinglePostView'
import axios from 'axios';


class SinglePostContainer extends Component {
  state = {
    article: "",
    tags: ""
  }
  componentDidMount() {
    const { articleUrl } = this.props.match.params
    this.getArticle(articleUrl);
    this.getTags();
  }

  getArticle = (articleUrl) => {
    axios.get(`/posts/tag/${articleUrl}`)
      .then(res => this.setState({ article: res.data.article }))
      .catch(err => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
  getTags = () => {
    axios.get('/tags').then(res => {
      this.setState({ tags: res.data.tags })
    })
  }
  render() {
    return (
      <SinglePostView {...this.state} />
    );
  }
}

export default SinglePostContainer;