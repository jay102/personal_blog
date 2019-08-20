import React from 'react';

const ArticleView = (props) => {
  return (
    <React.Fragment>
      <header className="masthead" style={props.mystyle}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>{props.data.header}</h1>
                <span className="subheading">{props.data.subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {props.Posts}

            <div className="clearfix">
              <button className="btn btn-primary float-right" href="#">Older Posts &rarr;</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default ArticleView;