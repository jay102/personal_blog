import React from 'react';
import ReactMarkdown from 'react-markdown'
import './style.css'
import Nav from './NavBar/NavBar'
import SideBar from './Sidebar/SideBar'
import DisQusForm from './Comments/DisQusForm'
import CodeBlock from '../../Admin/Dashboard/Pages/NewPost/codeBlock'
import Footer from './Footer/Footer';
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
  const featured_image = `${localStorage.getItem('backend_url')}/articles/imgs/${props.article.featured_img}`
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
            <img className="img-fluid rounded" src={`${featured_image}`} alt="featured" height="500px" width="700px" />
            <hr />
            <ReactMarkdown
              source={props.article.body}
              renderers={{
                code: CodeBlock,
              }} />

            <hr />
            {props.article ? <DisQusForm id={props.article.id} /> : null}
          </div>
          <SideBar tags={props.tags} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SinglePostView;