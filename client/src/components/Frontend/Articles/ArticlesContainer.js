import React, { Component } from 'react';
import { TemplateFiles } from '../../../App'
import ArticleView from './ArticleView'
import Article from './Article'
import axios from 'axios'

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        this.getArticles();
    }
    getArticles = () => {
        axios.get('/posts')
            .then(res => {
                //successful return of posts
                this.setState({
                    articles: res.data.Posts
                })
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                }
            })
    }
    clickedPost = (e, article) => {
        e.preventDefault()
        console.log('clicked')
        this.props.article(article);
    }
    render() {
        const Posts = this.state.articles.map(articles => {
            return (
                <Article {...articles} key={articles.id} clicked={this.clickedPost} />
            );
        })
        return (
            <TemplateFiles.Consumer>
                {value => (
                    <ArticleView Posts={Posts} mystyle={{
                        backgroundImage: "url(" + value.Main.bg + ")"
                    }} data={value.Main} />)}
            </TemplateFiles.Consumer>
        );
    }

}
export default Articles;