import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
// import Sticky from 'react-sticky-el';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import styles from './bookingForm.css'
import Calender from '../Calender/board/calender.js'
import Login from '../Login/login.js'
import axios from 'axios';


import dps from 'react-datepicker/dist/react-datepicker-cssmodules.css';

class BookingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: '',
            endDate: '',
            guests: '1 Guest',
            nights: 1
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleGuestsChange = this.handleGuestsChange.bind(this);
        this.updateNights = this.updateNights.bind(this);
        this.handleBookRequest = this.handleBookRequest.bind(this);
    }

    handleDateChange(input, date) {
        const { startDate, endDate } = this.state;

        this.setState({
            [input]: date,
            nights: startDate ? date.diff(startDate, 'days') : 1
        });
    }
    handleGuestsChange({ target }) {
        this.setState({
            [target.name]: target.value
        })
    }
    updateNights(nights) {
        this.setState({ nights })
    }

    async handleBookRequest(e) {

        e.preventDefault();
        const { locationID } = this.props;

        if (localStorage.token) {
            const { startDate, endDate } = this.state; 
            const dates = { 
                startDate: new Date(startDate),  
                endDate: new Date(endDate)
            }

            try {
                const location = await axios.post(`/api/locations/book/${locationID}`, dates);
                console.log(location.data);

            }
            catch (err) {
                console.log(err);
            }
        }
        else alert('please login first');
    }

    render() {
        const { price } = this.props;
        const { startDate, endDate, guests, nights } = this.state;
        return (
            // <Sticky >

            <div styleName='booking-form-container'>
                {/* <div styleName='sticky'> */}

                <div styleName='price-container'>
                    <span>${price}</span><span>per night</span>
                </div>
                <div>

                    <form>
                        <Calender occupancy={this.props.occupancy} updateNights={this.updateNights} onDatePick={this.handleDateChange} />

                        <div styleName='booking-form-guests'>
                            <p>Guests</p>
                            <select name='guests' value={guests} onChange={this.handleGuestsChange}>
                                <option value='1'>1 Guest</option>
                                <option value='2'>2 Guest</option>
                                <option value='3'>3 Guest</option>
                                <option value='4'>4 Guest</option>

                            </select>

                        </div>

                        <div styleName='price-totals'>
                            <table>
                                <tbody>
                                    <tr styleName='item-row'>
                                        <td>${price} X {nights} night</td>
                                        <td styleName='price-totals-table-right'>${price * nights}</td>
                                    </tr>

                                    <tr styleName='price-totals-total'>
                                        <td>Total</td>
                                        <td styleName='price-totals-table-right'>${price * nights}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button onClick={this.handleBookRequest}><h3>Request to Book</h3></button>
                        <p style={{ textAlign: 'center', fontSize: '12px' }}>You won't be charged yet</p>
                    </form>
                </div>
                {/*{this.state.showLoginForm && <Login onClick={this.toggleLoginMode} />}    */}
            </div>

        );
    }
}




export default CSSModules(BookingForm, styles);















{/* <div styleName='booking-dates'>

                                <label>
                                    <p>Check In</p>
                                    <DatePicker
                                        minDate={moment()}
                                        dateFormat='DD/MM/YYYY'
                                        placeholderText='dd/mm/yyyy'
                                        selected={startDate}
                                        onChange={(date) => this.handleDateChange('startDate', date)}
                                    />
                                </label>
                                <label>
                                    <p>Check Out</p>
                                    <DatePicker

                                        minDate={moment(startDate).add(1, 'days')}
                                        dateFormat='DD/MM/YYYY'
                                        placeholderText='dd/mm/yyyy'
                                        selected={endDate}
                                        onChange={(date) => this.handleDateChange('endDate', date)}
                                    />
                                </label>

                            </div> */}