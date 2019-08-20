import React, { Component } from 'react';
import $ from 'jquery';
import Header from './components/Frontend/Header/Header'
import Articles from './components/Frontend/Articles/ArticlesContainer'
import Footer from './components/Frontend/Footer/Footer'
import '../src/assets/css/clean-blog.css'
import Files from './assets/TemplateFiles'
import About from './components/Frontend/About/AboutContainer'
import Contact from './components/Frontend/Contact/ContactContainer'
import AdminLogin from './components/Admin/auth/AdminLogin'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
export const TemplateFiles = React.createContext();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteData: Files
    }
  }

  render() {
    //set default url for axios
    axios.defaults.baseURL = 'http://localhost:4000';
    return (
      <TemplateFiles.Provider value={this.state.siteData}>
        <Router>
          <Switch>
            <Route path="/" component={Frontend} />
            <Route path="/admin/login" component={AdminLogin} exact />
            <Route path="/admin/dashboard" component={Dashboard} />
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
        <Route exact path="/" component={Articles} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;
