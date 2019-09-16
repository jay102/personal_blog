import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../NavBar/header'
import Footer from '../Footer/footer'
import SideBar from '../SideBar/sidebar'
import './dashboard_css.css'


//import body contents from views
import DashboardBody from '../../Pages/Main/content'
import NewPost from '../../Pages/NewPost/NewPostContainer'
import AllPosts from '../../Pages/AllPosts/AllPostContainer'
import Tags from '../../Pages/Tags/TagsContainer'

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
                            <Switch>
                                <Route exact strict path="/admin/dashboard" component={DashboardBody} />
                                <Route exact strict path="/admin/dashboard/new-post" component={NewPost} />
                                <Route exact strict path="/admin/dashboard/all-posts" component={AllPosts} />
                                <Route exact strict path="/admin/dashboard/tags" component={Tags} />
                            </Switch>
                        </main>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Dashboard;