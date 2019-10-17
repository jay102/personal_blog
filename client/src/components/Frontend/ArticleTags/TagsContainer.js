import React, { Component } from 'react';
import TagsView from './TagsView'
import axios from 'axios'
import Articles from '../Articles/Article'
import { TemplateFiles } from '../../../App'
import articles_service from '../../../services/articles.service'

const repository = articles_service(axios)
class TagsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      pageNumber: 1
    }
    this.tag = this.props.match.params.tag
  }


  componentDidMount() {
    this.getArticle(this.tag, this.state.pageNumber);
  }
  increment = (e) => {
    e.preventDefault();
    this.setState((prevState, props) => ({
      pageNumber: ++prevState.pageNumber
    }));
    this.getArticle(this.tag, this.state.pageNumber);
  }
  decrement = (e) => {
    e.preventDefault();
    this.setState((prevState, props) => ({
      pageNumber: --prevState.pageNumber
    }));
    this.getArticle(this.tag, this.state.pageNumber);
  }

  getArticle = async (tag, pageNumber) => {
    try {
      const articles = await repository.getArticlesByTag(tag, pageNumber)
      this.setState({ articles })
    } catch (err) {
      if (err.response) {
        console.log(err.response)
      }
    }
  }

  render() {
    const Posts = this.state.articles.map(articles => {
      return (
        <TemplateFiles.Consumer key={articles.id}>
          {data => (
            <Articles {...articles} admin={data.admin} />
          )}
        </TemplateFiles.Consumer>
      );
    })
    return (
      <TagsView
        paginate={{ increment: this.increment, decrement: this.decrement }}
        pageNumber={this.state.pageNumber}
        Posts={Posts}
        tag={this.tag}
        {...this.state} />
    );
  }
}

export default TagsContainer;