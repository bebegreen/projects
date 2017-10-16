import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import styles from './summary.css'

const BasicInfo = ({ guests, bedrooms, beds, baths }) => (
    <div styleName='summary-basic-info'>
        <ul styleName='ul'>
            <li>
                <i className="fa fa-users" styleName='icon' aria-hidden="true"></i>
                {guests} guests
            </li>
            <li>
                <i className="fa fa-bed" styleName='icon' aria-hidden="true"></i>
                {beds} beds
            </li>
            <li>
                <i className="fa fa-bath" styleName='icon' aria-hidden="true"></i>
                {baths} baths
            </li>
        </ul>
    </div>
);


export default CSSModules(BasicInfo, styles, true);