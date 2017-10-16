import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styles from './filter.css'


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            min: '',
            max: '',
            guests: '',
            startDate: '',
            endDate: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.cleanFilters = this.cleanFilters.bind(this);
    }

    handleChange({ target }) {
        this.setState({ [target.name]: target.value }, this.applyFilters);
    }

    applyFilters() {
        const state = { ...this.state };
        for (let key in state) {
            if (!state[key]) delete state[key];
        }
        const { city, min, max, guests, startDate, endDate } = this.state;
        const { listData, onFilter: updateList } = this.props;



        let filteredList = listData;

        if (city) {
            filteredList = filteredList.filter(location => {
                return location.address.city.toLowerCase().includes(city.toLowerCase())
            })
        }

        if (max && min) {
            filteredList = filteredList.filter(location => {
                return location.price <= max && location.price >= min;
            })
        }

        if (guests) {
            filteredList = filteredList.filter(location => {
                return location.theSpace.guests >= guests;
            })
        }

        if (startDate) {
            filteredList = filteredList.filter(location => {
                //TO BE DONE....
                // console.log(location);  
                // return location['occupancy'].indexOf(startDate.) < 0
            })
        }

        updateList(filteredList);

    }

    cleanFilters() {
        const state = { ...this.state };
        for (let key in state) {
            state[key] = '';
        }
        this.setState(state);
        this.props.onFilter()
    }

    handleDateChange(input, date) {
        const { startDate, endDate } = this.state;

        this.setState({
            [input]: date,
            nights: startDate ? date.diff(startDate, 'days') : 1
        });
    }

    render() {
        const { city, min, max, guests, startDate, endDate } = this.state;
        return (
            <div styleName='filters'>
                <div styleName='scroll-down'>Filters</div>
                <div styleName='inputs'>

                    <input styleName='input-left' name='city' type='text' onChange={this.handleChange} placeholder='City' value={city} />

                    <input styleName='input' name='min' type='number' onChange={this.handleChange} placeholder='Min-Price' value={min} />
                    <input styleName='input' name='max' type='number' onChange={this.handleChange} placeholder='Max-Price' value={max} />

                    <input styleName='input' name='guests' type='number' onChange={this.handleChange} placeholder='Guests' value={guests} />
                    <div styleName='date-picker'>
                        <label>

                            <DatePicker
                                minDate={moment()}
                                dateFormat='DD/MM/YYYY'
                                placeholderText='Check In'
                                selected={startDate}
                                onChange={(date) => this.handleDateChange('startDate', date)}
                            />
                        </label>
                        <label>

                            <DatePicker

                                minDate={moment(startDate).add(1, 'days')}
                                dateFormat='DD/MM/YYYY'
                                placeholderText='Check Out'
                                selected={endDate}
                                onChange={(date) => this.handleDateChange('endDate', date)}
                            />
                        </label>
                    </div>
                    {/*<button onClick={this.applyFilters}>Apply Filters</button>*/}
                    <div styleName='clean-filters' onClick={this.cleanFilters}>Reset</div>
                </div>


            </div>
        )
    }
}

export default CSSModules(Filter, styles);