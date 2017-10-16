import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css'
import Header from '../Header/Header.js'
import Location from '../Location/location.js'
import HomePage from '../HomePage/home.js'
import Signup from '../Signup/signup.js'
import Login from '../Login/login.js'



import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import './App.css';

class App extends Component {
  render() {
    return (

      <Router>

        <div className="App">

          <Header />

          <Route exact path="/" component={HomePage} />
          <Route path='/locations/:locationID' component={Location} />
          <Route path="/signup" component={Signup} />
          {/*<Route path="/login" component={Login} />*/}

          {/*<Route path="/reviewList" component={() => <ReviewList reviews={this.state.reviews} />} />
        <Route path="/topics" component={About} />*/}
        </div>
      </Router>
    );
  }
}

export default CSSModules(App, styles);

