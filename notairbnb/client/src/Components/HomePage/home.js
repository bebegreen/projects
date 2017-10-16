import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import CSSModules from 'react-css-modules';
import styles from './home.css'
import LocationList from '../LocationsList/locationList.js';
// import locations from '../../location-info.js';
import Filter from '../Filter/filter.js'
import Map from '../Map/map.js';
import axios from 'axios';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalList: null,
            displayedList: null,
        }
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
     
        axios.get(`/api/locations`)
            .then(({ data }) => {
                this.setState({
                    originalList:data,
                    displayedList: data
                })
            }).catch(err => {
                console.log('ERROR: ', err);
            })

    }

    updateList(displayedList = this.state.originalList) {
        this.setState({ displayedList });
    }


    render() {
        const { displayedList, originalList } = this.state;
        return (

            <div>
                <div styleName='filters'>
                    <Filter listData={originalList} onFilter={this.updateList} />
                </div>

                <div styleName='content'>

                    <LocationList listData={displayedList} />


                </div>

            </div>

        );
    }
}

export default CSSModules(Home, styles);
