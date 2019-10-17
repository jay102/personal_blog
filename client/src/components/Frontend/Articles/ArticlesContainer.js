import React, { Component } from 'react';
import articlesRepository from '../../../services/articles.service'
import { TemplateFiles } from '../../../App'
import ArticleView from './ArticleView'
import Article from './Article'
import axios from 'axios'

const repository = articlesRepository(axios)
class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pageNumber: 1
        }
    }
    componentDidMount() {
        this.getArticles(this.state.pageNumber);
    }
    getArticles = async (page) => {
        try {
            const posts = await repository.getArticles(page)
            this.setState({
                articles: posts
            })
        } catch (err) {
            console.log(err)
        }
    }
    increment = (e) => {
        e.preventDefault();
        this.setState((prevState, props) => ({
            pageNumber: ++prevState.pageNumber
        }));
        this.getArticles(this.state.pageNumber);
    }
    decrement = (e) => {
        e.preventDefault();
        this.setState((prevState, props) => ({
            pageNumber: --prevState.pageNumber
        }));
        this.getArticles(this.state.pageNumber);
    }

    render() {
        const Posts = this.state.articles.map(articles => {
            return (
                <TemplateFiles.Consumer key={articles.id}>
                    {data => (
                        <Article {...articles} admin={data.admin} />
                    )}
                </TemplateFiles.Consumer>
            );
        })
        return (
            <TemplateFiles.Consumer>
                {value => (
                    <ArticleView
                        paginate={{ increment: this.increment, decrement: this.decrement }}
                        pageNumber={this.state.pageNumber}
                        header_style="masthead"
                        Posts={Posts} mystyle={{
                            backgroundImage: "url(" + value.siteData.Main.bg + ")"
                        }} data={value.siteData.Main} />)}
            </TemplateFiles.Consumer>
        );
    }

}
export default Articles;