import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Navbar.css';
import Login from '../Login/login.js';

import { Link } from 'react-router-dom'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = { showLoginForm: false, loggedIn: localStorage.token ? true : false }
        this.toggleLoginMode = this.toggleLoginMode.bind(this);
        this.logout = this.logout.bind(this); 
    }

    toggleLoginMode(e) {
        this.setState({ showLoginForm: !this.state.showLoginForm});
    }
    logout() { 
        delete localStorage.token; 
        this.setState({loggedin: false})
        
    }

    render() {

        return (
            <div>

                <nav styleName='top-navbar'>
                    <ul styleName='ul'>
                        <li><a> Become a Host </a></li>
                        <li>Help</li>

                        {
                            localStorage.token ?
                                <li onClick={this.logout}> Logout</li> :
                                <li onClick={this.toggleLoginMode}>Login</li>
                        }

                        {
                            localStorage.token ? null : 
                            <li><Link to='/signup'>Sign Up</Link></li>
                        }
                       

                    </ul>
                </nav>

                {this.state.showLoginForm && <Login onClick={this.toggleLoginMode} />}
            </div>
        );
    }
}
export default CSSModules(Navbar, styles, true);