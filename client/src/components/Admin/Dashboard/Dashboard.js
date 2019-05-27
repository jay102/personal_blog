import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header'
import Footer from './footer'
import SideBar from './sidebar'
import '../../../assets/css/dashboard_css.css'


//import body contents from views
import AllPosts from './views/AllPosts'
import NewPost from './views/NewPost'
import DashboardBody from './views/content'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Router>
                <div className="container-fluid custom">

                    <Header />
                    <SideBar />
                    <div className="container-fluid" id="content-wrap">
                        <main role="main" className="col">
                            <Route exact strict path="/admin/dashboard" component={DashboardBody} />
                            <Route exact strict path="/admin/dashboard/new-post" component={NewPost} />
                            <Route exact strict path="/admin/dashboard/all-posts" component={AllPosts} />
                        </main>
                    </div>
                    <Footer />

                </div>
            </Router>
        );
    }
}

export default Dashboard;