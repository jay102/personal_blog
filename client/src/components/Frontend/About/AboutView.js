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
                <span className="subheading subheading__about">{props.subTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="wrapper"><p>{props.text}</p></div></div>

    </React.Fragment>
  );
}
export default AboutView;
