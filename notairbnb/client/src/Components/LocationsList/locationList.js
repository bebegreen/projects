import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CSSModules from 'react-css-modules';
import styles from './locationList.css';
// import locations from '../../location-info.js';
import Rating from '../Rating';
class HouseList extends Component {
    constructor(props) {
        super(props);
    }

    renderHouses(locations) {
        return locations.map(loc => (
            <div styleName='house'>

                <Link to={`/locations/${loc._id}`} key={loc._id}>
                    <img src={loc.imageUrl} styleName='image' alt='missing image' />
                    <div styleName='row-1'>
                        ${loc.price + ' - '}
                        {loc.title}
                    </div>
                    <div>
                        {loc.type} ; {loc.theSpace.beds} beds
                   </div>
                    <div styleName='rating'>
                        <span><Rating value={loc.rating} /> </span>{loc.reviews.length} reviews
                    </div>

                </Link>
            </div>
        ))
    }

    render() {
        const { listData } = this.props;

        return (
            <div>
                <div styleName='container'>
                    {listData ? this.renderHouses(listData) : <h2>Loading...</h2>}
                    {listData ? listData.length ? null : <h2>no matches</h2> : null}
                </div>
            </div>
        )
    }
}



export default CSSModules(HouseList, styles);