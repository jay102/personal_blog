import React from 'react';

const AboutView = (props) => {

  return (
    <React.Fragment>
      <header className="masthead" style={props.bg}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>{props.Title}</h1>
                <span className="subheading">{props.subTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>About</div>
    </React.Fragment>
  );
}
export default AboutView;
