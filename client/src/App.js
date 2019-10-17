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
import Tags from './components/Frontend/ArticleTags/TagsContainer'
import Spinner from './components/Widgets/Spinner/spinner'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import userRepository from './services/users.service'
import axios from 'axios'
export const TemplateFiles = React.createContext();


const repository = userRepository(axios);
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
    this.getImage()
  }
  getImage = async () => {
    const data = await repository.getAdminAvatar(1)
    this.setState({ admin: data })
  }
  render() {
    //set default url for axios
    axios.defaults.baseURL = this.backendurl;
    const { admin, siteData } = this.state
    if (admin === undefined || admin.length === 0 || siteData === undefined || Object.keys(siteData).length === 0) {
      return <Spinner />
    } else {
      return (
        <TemplateFiles.Provider value={this.state}>
          <Router>
            <Switch>
              <Route exact strict path="/admin/login" component={AdminLogin} />
              <Route exact path="/posts/:articleUrl" component={SinglePostView} />
              <Route exact path="/tag/:tag" component={Tags} />
              <Route path="/admin/dashboard" render={(props) => <Dashboard backendurl={this.backendurl} />} />
              <Route path="/404" component={NotFound} />
              <Route path="/" component={Frontend} />
              <Route path="" component={NotFound} />
            </Switch>
          </Router>
        </TemplateFiles.Provider>
      );
    }
  }
}

const Frontend = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact strict path="/" component={Articles} />
        <Route exact strict path="/about" component={About} />
        <Route exact strict path="/contact" component={Contact} />
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;
