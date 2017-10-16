import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import styles from './login.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { email: '', password: '' }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleLogin(e) {
        e.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            axios.post('/api/users/login', { email, password })
                .then(res => {
                    const token = res.data.token;
                    localStorage.token = token;
                    axios.defaults.headers.common['Authorization'] = token;
                    this.setState({ loggedIn: true })

                })
                .catch(err => {
                    alert('wrong username or password')
                    console.log(err);
                })
        }
    }
    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value })
    }


    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/' />
        }
        const { email, password } = this.state;
        return (
        <div styleName='background' onClick={this.props.onClick}>
            <div styleName='signup' onClick={e => { e.stopPropagation() }}>
                <h4 styleName='title'>Login </h4>
                <form styleName='form'>
                    <input name='email' type='text' placeholder='Email address' styleName='input' value={email} onChange={this.handleInputChange} />
                    <input name='password' type='text' placeholder='Password' styleName='input' value={password} onChange={this.handleInputChange} />


                    <label styleName='checkbox'>
                        <input type='checkbox' /> Remember me
                    </label>
                    <button onClick={this.handleLogin} styleName='button'><h3>Log in</h3></button>
                </form>

                <Link to='/signup' onClick={this.props.onClick}>Don't have an account? Sign Up!</Link>
            </div>
        </div>
        );
    }
}





export default CSSModules(Login, styles);