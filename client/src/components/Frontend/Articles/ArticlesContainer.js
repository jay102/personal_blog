import React, { Component } from 'react';
import { TemplateFiles } from '../../../App'
import ArticleView from './ArticleView'
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
    render() {
        const Posts = this.state.articles.map(articles => {
            const { id, title, author, post_url, time, body } = articles;
            return (
                <ul key={id}>
                    <li style={{ listStyle: "none" }}>
                        <div className="post-preview">
                            <a href={post_url}>
                                <h2 className="post-title">
                                    {title}</h2>
                                <h3 className="post-subtitle">
                                    {body.split(" ", 30)} </h3>
                            </a>
                            <p className="post-meta">Posted by <a>{author}</a>{` on ${time}`}</p>
                        </div>
                    </li>
                </ul>
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