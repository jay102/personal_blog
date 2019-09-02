import React, { Component } from 'react';
import Header from './components/Frontend/Header/Header'
import SinglePostView from './components/Frontend/SinglePost/SinglePostContainer'
import Articles from './components/Frontend/Articles/ArticlesContainer'
import Footer from './components/Frontend/Footer/Footer'
import NotFound from './components/Frontend/404/NotFound'
import '../src/assets/css/clean-blog.css'
import FrontendFiles from './assets/TemplateFiles'
import About from './components/Frontend/About/AboutContainer'
import Contact from './components/Frontend/Contact/ContactContainer'
import AdminLogin from './components/Admin/auth/AdminLogin'
import Dashboard from './components/Admin/Dashboard/Layout/Dash/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
export const TemplateFiles = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteData: FrontendFiles,
      admin: ""
    }
    this.backendurl = "http://localhost:4000";
    localStorage.setItem('backend_url', this.backendurl);
  }
  componentDidMount() {
    this.getAdminImage(1)
  }
  getAdminImage = (id) => {
    axios.get(`/admin/${id}`)
      .then(res => this.setState({ admin: res.data }))
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      })

  }

  render() {
    // if (!this.state.admin.length)
    //   return null;
    //set default url for axios
    axios.defaults.baseURL = this.backendurl;
    return (
      <TemplateFiles.Provider value={this.state}>
        <Router>
          <Switch>
            <Route exact strict path="/admin/login" component={AdminLogin} />
            <Route path="/admin/dashboard" render={(props) => <Dashboard />} />
            <Route path="/" component={Frontend} />
          </Switch>
        </Router>
      </TemplateFiles.Provider>
    );
  }
}

const Frontend = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact strict path="/" component={Articles} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/:articleUrl" component={SinglePostView} />
        <Route path="" component={NotFound} />
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;
