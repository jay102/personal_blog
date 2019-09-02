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

    render() {
        const Posts = this.state.articles.map(articles => {
            return (
                <TemplateFiles.Consumer>
                    {data => (
                        <Article {...articles} key={articles.id} clicked={this.clickedPost} admin={data.admin} />
                    )}
                </TemplateFiles.Consumer>
            );
        })
        return (
            <TemplateFiles.Consumer>
                {value => (
                    <ArticleView Posts={Posts} mystyle={{
                        backgroundImage: "url(" + value.siteData.Main.bg + ")"
                    }} data={value.siteData.Main} />)}
            </TemplateFiles.Consumer>
        );
    }

}
export default Articles;