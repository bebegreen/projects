import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar.js'
import CSSModules from 'react-css-modules';
import styles from './header.css'
import { Link } from 'react-router-dom'

class Header extends Component {



    render() {
        return (
            <header>
                {/*<div className='header-left'>*/}
                <div styleName='header-left'>


                    <Link to="/">
                        <img styleName='logo' src='http://logodatabases.com/wp-content/uploads/2017/06/airbnb_logo_small.png' alt='logo'></img>
                    </Link>
                    <i className="fa fa-search" styleName='fa-search' aria-hidden="true"></i>

                    <input styleName='input' placeholder='Search' />
                </div>

                <div>
                    <Navbar />
                </div>
            </header>
        );
    }
}

export default CSSModules(Header, styles, true);