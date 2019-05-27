import React from 'react';

let About = (props) => {
    let about = require('../assets/img/about-bg.jpg')
    let mystyle = {
        backgroundImage: "url(" + about + ")"
    }
    return (
        <React.Fragment>
            <header className="masthead" style={mystyle}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h1>About Me</h1>
                                <span className="subheading">Wanna know some about me? Here you go.!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>About</div>
        </React.Fragment>
    );
}

export default About