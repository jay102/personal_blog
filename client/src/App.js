import React, { Component } from 'react';
import Header from './components/Header/Header'
import Articles from './components/Articles/Articles'
import Footer from './components/Footer/Footer'
import '../src/assets/css/clean-blog.css'
import About from './components/About'
import Contact from './components/Contact'
import AdminLogin from './components/Admin/auth/AdminLogin'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" render={props => { return <Blog /> }} exact />
          <Route path="/admin/login" component={AdminLogin} exact />
          <Route path="/admin/dashboard" component={Dashboard} exact />
        </Switch>
      </Router>
    );
  }
}

function Blog() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Articles} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />

        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
