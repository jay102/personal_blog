import React, { Component } from 'react';
import SinglePostView from './SinglePostView'
import articles_service from '../../../services/articles.service'
import axios from 'axios';

const repository = articles_service(axios)
class SinglePostContainer extends Component {
  state = {
    article: "",
    tags: ""
  }
  componentDidMount() {
    const { articleUrl } = this.props.match.params
    this.getTags();
    this.getArticle(articleUrl);
  }

  getArticle = async (articleUrl) => {
    try {
      const article = await repository.getArticle(articleUrl);
      !!article ? this.setState({ article }) : this.props.history.push('/404');
    } catch (err) {
      console.log(err.response)
    }
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