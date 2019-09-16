import React, { Component } from 'react';
import TagsView from './TagsView'
import axios from 'axios'
import Articles from '../Articles/Article'
import { TemplateFiles } from '../../../App'

class TagsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
    this.tag = this.props.match.params.tag
  }


  componentDidMount() {

    this.getArticle(this.tag);
  }

  getArticle = (tag) => {
    axios.get(`/tags/${tag}`)
      .then(res => {
        this.setState({ articles: res.data.articles });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }

  render() {
    const Posts = this.state.articles.map(articles => {
      return (
        <TemplateFiles.Consumer>
          {data => (
            <Articles {...articles} key={articles.id} admin={data.admin} />
          )}
        </TemplateFiles.Consumer>
      );
    })
    return (
      <TagsView
        Posts={Posts}
        tag={this.tag}
        {...this.state} />
    );
  }
}

export default TagsContainer;