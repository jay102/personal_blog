import React from 'react';
import { Link } from 'react-router-dom';


const Article = (props) => {
  console.log(props.admin.admin ? props.admin.admin : null)
  // const image = props.admin.admin.image ? props.admin.admin.image : null
  const backend_url = localStorage.getItem('backend_url');
  return (
    <div className="blog-roll_card">
      <div className="post-preview">
        <Title title={props.title} post_url={props.post_url} />
        <Author author={props.author} time={props.time} backend_url={backend_url} />
        <Subtitle body={props.body} />
        <ReadMore post_url={props.post_url} id={props.id} />
      </div>
    </div>
  );
}
// Title
const Title = (props) => <a href={props.post_url}> <h2 className="post-title">{props.title}</h2></a>
// Subtitle
const Subtitle = (props) => <a><h3 className="post-subtitle">{escapeChar(props.body).split("", 200)}... </h3></a>;
// Author
const Author = (props) => {
  return <div className="author">
    <a><img src={`${props.backend_url}/${props.image}`} className="rounded-circle" alt="admin" height="40px" width="40px" /></a>
    <p style={{ paddingLeft: "10px" }}>Posted by <a>{props.author}</a>{` on ${props.time}`}</p>
  </div>
}
// Readmore
const ReadMore = (props) => <Link to={`/${props.post_url}`}>  <p className="read-more">Read More</p></Link>

const escapeChar = (str) => {
  if ((str === null) || (str === ''))
    return false;
  else
    str = str.toString();
  return str.replace(/[&<>"'`#*:,]/g, ' ');
}
export default Article;