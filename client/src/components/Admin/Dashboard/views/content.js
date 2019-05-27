import React, { Component } from "react";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">

                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-header">
                                    <span style={{ marginRight: "5px" }}><i className="fa fa-poll-h"></i></span>{" "}All posts
  </div>
                                <div className="card-body">
                                    <h5 className="card-title">12</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-header">
                                    <span style={{ marginRight: "5px" }}><i className="fa fa-globe-europe"></i></span>{" "}Page Visits
  </div>
                                <div className="card-body">
                                    <h5 className="card-title">12,345</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-header">
                                    <span style={{ marginRight: "5px" }}><i className="fa fa-comments"></i></span>{" "}All Comments
  </div>
                                <div className="card-body">
                                    <h5 className="card-title">15</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Content;
