import React from 'react';
import './style.css'
import { NavLink } from 'react-router-dom'
const img = require('../../../assets/img/logo.png');


const SinglePostView = (props) => {

  return (
    <>
      <Nav />
      <Post />
    </>
  );

}

const Post = (props) => {
  return (
    <>
      <div className="container post">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="mt-4">{props.title}</h1>
            <p className="lead">
              by
        <p>{props.author}</p>
            </p>

            <hr />
            <p>{props.time}</p>
            <hr />

            {/* <!-- Preview Image --> */}
            <img className="img-fluid rounded" src="https://placeimg.com/640/480/any" alt="" />
            <hr />
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>

            <blockquote className="blockquote">
              <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer className="blockquote-footer">Someone famous in
          <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>

            <hr />
            <CommentForm />

            <SingleComment />
          </div>
          <SideBar />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
const CommentForm = (props) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Leave a Comment:</h5>
      <div className="card-body">
        <form>
          <div className="form-group">
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
const SideBar = (props) => {
  return (
    <div className="col-md-4">
      <Categories />
    </div>
  );
}
const Categories = (props) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Categories</h5>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6">
            <ul className="list-unstyled mb-0">
              <li>
                <a className="color-android" href="/tag/android">#Android</a>
              </li>
              <li>
                <a className="color-css" href="/tag/java">#Java</a>
              </li>
              <li>
                <a className="color-javascript" href="/tag/javascript">#JavaScript</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <ul className="list-unstyled mb-0">
              <li>
                <a className="color-node" href="/tag/node">#Node</a>
              </li>
              <li>
                <a className="color-react" href="/tag/react">#React</a>
              </li>
              <li>
                <a className="color-angular" href="tag/projects">#Projects</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
const SingleComment = (props) => {
  return (
    <div className="media mb-4">
      <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
      <div className="media-body">
        <h5 className="mt-0">Commenter Name</h5>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
    </div>
  );
}

const Nav = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a href="/"><img src={img} alt="logo" height="40px" width="40px" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" href="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" href="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" href="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
const Footer = (props) => {
  return (
    <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">Copyright &copy; Jaycodes 2019</p>
      </div>
    </footer>
  );
}
export default SinglePostView;