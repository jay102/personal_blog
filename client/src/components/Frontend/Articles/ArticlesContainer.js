import React, { Component } from 'react';
import articlesRepository from '../../../services/articlesRepository'
import { TemplateFiles } from '../../../App'
import ArticleView from './ArticleView'
import Article from './Article'
import axios from 'axios'

const repository = articlesRepository(axios)
class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        this.getArticles(1);
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

    render() {
        const Posts = this.state.articles.map(articles => {
            return (
                <TemplateFiles.Consumer>
                    {data => (
                        <Article {...articles} admin={data.admin} key={articles.id} />
                    )}
                </TemplateFiles.Consumer>
            );
        })
        return (
            <TemplateFiles.Consumer>
                {value => (
                    <ArticleView
                        header_style="masthead"
                        Posts={Posts} mystyle={{
                            backgroundImage: "url(" + value.siteData.Main.bg + ")"
                        }} data={value.siteData.Main} />)}
            </TemplateFiles.Consumer>
        );
    }

}
export default Articles;