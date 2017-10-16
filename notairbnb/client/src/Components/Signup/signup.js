import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import styles from './signup.css'
import axios from 'axios';
import { Redirect } from 'react-router'
class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { email: '', firstname: '', lastname: '', password: '', loggedIn: false }
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSignUp(e) {
        e.preventDefault();
        const { email, firstname, lastname, password } = this.state;
        if (email && firstname && lastname && password) {
            axios.post('/api/users', this.state)
                .then(res => {
                    const token = res.data.token;
                    localStorage.token = token;
                    localStorage.username = firstname; 
                    axios.defaults.headers.common['Authorization'] = token;
                    this.setState({ loggedIn: true })

                })
                .catch(err => {
                    alert('email exists')
                    console.log(err);
                })
        }

    }

    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value })
    }



    render() {
        const { email, firstname, lastname, password } = this.state;
        if (this.state.loggedIn) {
            return <Redirect to='/' />
        }
        return (


            <div styleName='signup'>
                <h4 styleName='title'>Sign up - please fill up the form </h4>
                <form styleName='form'>
                    <input name='email' type='text' placeholder='Email address' styleName='input' value={email} onChange={this.handleInputChange} />
                    <input name='firstname' type='text' placeholder='First name' styleName='input' value={firstname} onChange={this.handleInputChange} />
                    <input name='lastname' type='text' placeholder='Last name' styleName='input' value={lastname} onChange={this.handleInputChange} />
                    <input name='password' type='text' placeholder='Password' styleName='input' value={password} onChange={this.handleInputChange} />

                    <label styleName='checkbox'>
                        <input type='checkbox' />
                        I’d like to receive marketing and policy communications from Airbnb and its partners.
                    </label>
                    <p style={{ fontWeight: 600 }}> By clicking Sign up or Continue with, I agree to Airbnb’s Terms of Service, Payments Terms of Service, Privacy Policy, and Nondiscrimination Policy.</p>
                    <button styleName='button' onClick={this.handleSignUp} ><h3>Sign up</h3></button>
                </form>

            </div>
        );
    }
}





export default CSSModules(Signup, styles);