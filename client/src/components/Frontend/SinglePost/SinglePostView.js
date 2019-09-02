import React from 'react';
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types';
import './style.css'
import Nav from './NavBar'
import SideBar from './SideBar'
import CommentForm from './CommentForm'
import SingleComment from './SingleComment'
import CodeBlock from '../../Admin/Dashboard/Pages/NewPost/codeBlock'
const img = require('../../../assets/img/logo.png');



const SinglePostView = (props) => {

  return (
    <>
      <Nav img={img} />
      <Post {...props} />
    </>
  );

}
const Post = (props) => {
  return (
    <>
      <div className="container post">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="mt-4">{props.article.title}</h1>
            <p className="lead single_article">
              by {props.article.author}</p>
            <hr />
            <p className="single_article">Posted on {props.article.time}</p>
            <hr />

            {/* <!-- Preview Image --> */}
            <img className="img-fluid rounded" src={`${props.article.featured_img}`} alt="featured" height="500px" width="700px" />
            <hr />
            <ReactMarkdown
              source={props.article.body}
              renderers={{
                code: CodeBlock,
              }} />

            <hr />
            <CommentForm />

            <SingleComment />
          </div>
          <SideBar />
        </div>
      </div>
    </>
  );
}
SinglePostView.propTypes = {
  value: PropTypes.string.isRequired,
};
export default SinglePostView;