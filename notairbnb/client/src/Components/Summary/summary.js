import React, { Component } from 'react';
import Rating from '../Rating'
import CSSModules from 'react-css-modules';
import styles from './summary.css'
import SubTitle from './SubTitle.js'
import BasicInfo from './BasicInfo.js'

class Summary extends Component {

    render() {
        const { title, type, address: { city },
            rating, reviews,
            theSpace: { guests, bedrooms, beds, baths, description },
            owner: { imageUrl, firstname } } = this.props.location;

        const subTitleProps = { type, city, rating, reviews: reviews.length };
        const basicInfoProps = { guests, bedrooms, beds, baths };

        return (
            <div styleName='summary'>
                <div styleName='summary-head'>
                    <div>
                        <h1>{title}</h1>
                        <SubTitle {...subTitleProps} />
                        <BasicInfo {...basicInfoProps} />
                    </div>
                    <div styleName='owner-img'>
                        <img styleName='owner' src={imageUrl} alt='host' />
                        {firstname}
                    </div>

                </div>
                <h4>The Space</h4>
                <p styleName='property-description'>{description}</p>
            </div>
        );
    }
}


export default CSSModules(Summary, styles, true);