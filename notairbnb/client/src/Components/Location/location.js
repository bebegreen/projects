import React, { Component } from 'react';
import Jumbotron from '../Jumbotron/jumbotron.js'
import Summary from '../Summary/summary.js'
import ContentNav from '../ContentNav/contentNav.js'
import BookingForm from '../BookingForm/bookingForm.js'
import Reviews from '../Review/review.js'
import Map from '../Map/map.js'
import Amenties from '../Amenties/amenties.js'
import axios from 'axios'; 


import CSSModules from 'react-css-modules';
import styles from './location.css'

class Location extends Component {

    constructor(props) {
        super(props)
        this.locationID = this.props.match.params.locationID;
        this.state = { location: null }

    }


    componentDidMount = () => {
       
        axios.get(`/api/locations/${this.locationID}`)
            .then(({data}) => {  
                this.setState({location: data})
            }).catch(err => {
                console.log('ERROR: ', err);
            })


    }

    renderLocationData() {
        const location = this.state.location;
        return (

            <div>
         
                
                <Jumbotron img={location.imageUrl} />

                <div styleName='content-container'>
                    <div styleName='content'>
                        <ContentNav />
                        <Summary location={location} />
                        <BookingForm price={location.price} occupancy={location.occupancy} locationID={location._id }/>
                        <Amenties amenties={location.amenities} />
                        <Reviews location={location} />
                    </div>
                    <Map location={location.address} />
                </div>

                <footer></footer>

            </div>

        );
    }

    render() {

        return (
            <div>
                {this.state.location && this.renderLocationData()}
            </div>
        )


    }
}

export default CSSModules(Location, styles);