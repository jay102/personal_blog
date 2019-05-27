import React from 'react';
let PageHeader = (props) => {
    let mystyle = {
        backgroundImage: "url(" + props.PageHeader + ")"
    }

    return (
        <header className="masthead" style={mystyle}>
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading">
                            <h1>James's Blog</h1>
                            <span className="subheading">Welcome to my Blog!</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default PageHeader