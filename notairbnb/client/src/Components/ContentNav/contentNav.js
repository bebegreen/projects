import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './contentNav.css'


class ContentNav extends Component {


    render() {
        return (
            <nav styleName='content-nav'>
                <ul styleName='ul'>

                    <li><a>Overview </a></li>
                    <i className="fa fa-circle" styleName='fa' aria-hidden="true"></i>
                    <li><a> Reviews </a></li>
                    <i className="fa fa-circle" styleName='fa' aria-hidden="true"></i>
                    <li><a> The Host </a></li>
                    <i className="fa fa-circle" styleName='fa' aria-hidden="true"></i>
                    <li><a> Location </a></li>
                </ul>

            </nav>
        );
    }
}

export default CSSModules(ContentNav, styles);