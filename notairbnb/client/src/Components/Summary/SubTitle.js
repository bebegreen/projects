import React, { Component } from 'react'

import CSSModules from 'react-css-modules';
import styles from './summary.css'
import Rating from '../Rating/index'


const SubTitle = ({ type, city, rating, reviews }) => (

    <div styleName='summary-sub-title'>
        {type}
        <i className="fa fa-circle" styleName='seperator' aria-hidden="true"></i>
        {city}
        <i className="fa fa-circle" styleName='seperator' aria-hidden="true"></i>
        <div styleName='blue'>
            <Rating value={rating} style='blue' />
        </div>
        <span>{reviews} reviews</span>
    </div>
);

export default CSSModules(SubTitle, styles, true);