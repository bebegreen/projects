import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import styles from './calender.css'
import Day from '../day/day.js'
import { months, messages } from '../../../consts.js'
// import {messages} from '../../../consts.js'

const moment = extendMoment(Moment);

class Calender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: '',
            endDate: '',
            displayedMonth: moment().month() + 1,
            displayedYear: moment().year(),
            presentMonth: moment().month() + 1,
            presentYear: moment().year(),
            presentDay: moment().date(),
            board: Array(moment().daysInMonth()),
            occupancy: this.getOccupiedDates()
        }

        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.datePast = this.datePast.bind(this);
        this.renderMonth = this.renderMonth.bind(this);
        this.warningMessage = this.warningMessage.bind(this);

    }

    getOccupiedDates() {
        const occupancy = this.props.occupancy.map(obj => {
            const start = moment(obj.startDate);
            const end = moment(obj.endDate);
            return moment.range(start, end);
        })
        return occupancy;
    }

    renderMonth() {
        const year = this.state.displayedYear;
        const month = this.state.displayedMonth;
        const startDay = new Date(year + "-" + month + "-01").getDay() + 1;
        const occupancy = this.getOccupiedDates()
        const days = this.state.board.length;
        const board = [];

        for (let i = 1; i <= days + startDay - 1; ++i) {
            let booked = false;

            if (i >= startDay) {
                let day = moment(`${year}-${month}-${i - startDay + 1}`);
                for (let booking of occupancy) {
                    if (day.isBetween(booking.start, booking.end, 'day', '[]')) {
                        booked = true;
                    }
                }
            }

            let style = this.datePast(i) ? 'pastDay' : 'day';
            if (booked) style = 'booked';

            board.push(
                <Day style={style} onPick={this.handleDatePick} key={i} booked={booked} onBadPick={this.warningMessage}>
                    {i < startDay ? null : i - startDay + 1}
                </Day>
            );
        }
        return board;
    }

    handleMonthChange(direction) {

        const { displayedMonth, displayedYear, presentMonth, presentYear } = this.state;

        if (direction < 0 && displayedYear === presentYear && displayedMonth === presentMonth) {
            // alert('Are you a time traveller?? coooool!');
            this.warningMessage('timeTravel');
            return;
        }

        if (displayedMonth === 12 && direction > 0) {
            this.setState({
                displayedMonth: 1, displayedYear: displayedYear + 1,
            })
        } else if (displayedMonth === 1 && direction < 0) {
            this.setState({
                displayedMonth: 12, displayedYear: displayedYear - 1,
            })
        } else {
            this.setState({
                displayedMonth: displayedMonth + direction,
                board: Array(moment(`${displayedYear}-${displayedMonth + direction}`, "YYYY-MM").daysInMonth())
            })
        }

    }

    handleDatePick(e, day) {
        const { onDatePick } = this.props;
        if (this.datePast(day)) this.warningMessage('timeTravel');
        else {
            const { displayedYear, displayedMonth } = this.state;
            const date = `${displayedYear}-${displayedMonth}-${day}`;


            if (!e.shiftKey) {
                this.setState({ startDate: date })
                onDatePick('startDate', moment(date));
            } else {
                this.setEndDate(date)
            }
        };
    }

    setEndDate(date) {
        const { onDatePick } = this.props;
        const start = moment(this.state.startDate);
        const end = moment(date);
        if (end.isAfter(start)) {

            const requestedDates = moment.range(start, end);
            let requestOK = true;
            for (let booking of this.state.occupancy) {
                if (requestedDates.overlaps(booking)) requestOK = false;
            }
            if (requestOK) {
                this.setState({ endDate: date })
                onDatePick('endDate',  moment(date));
                this.props.updateNights(moment(date).diff(this.state.startDate, 'days'));
            } else {
                this.warningMessage('badDates');
            }
        }

        else {
            this.warningMessage('benjaminButton');
        }
    }

    warningMessage(msg) {
        this.setState({ message: messages[msg] }, () => {
            setTimeout(function () { this.setState({ message: '' }); }.bind(this), 3000);
        })
    }

    datePast(day) {

        const { displayedYear, displayedMonth, presentMonth, presentYear, presentDay } = this.state;

        return displayedYear === presentYear &&
            displayedMonth === presentMonth &&
            day < presentDay;
    }


    render() {
        const { displayedYear, displayedMonth, presentMonth, presentYear, presentDay, startDate, endDate } = this.state;

        return (
            <div>

                <div styleName='container'>
                    <div styleName='board'>

                        <h3 styleName='current'>
                            <i onClick={() => this.handleMonthChange(-1)} styleName='navigate' className="fa fa-chevron-left" aria-hidden="true"></i>
                            {moment(`${displayedMonth}`, 'MM').format('MMMM')}
                            <i onClick={() => this.handleMonthChange(1)} styleName='navigate' className="fa fa-chevron-right" aria-hidden="true"></i>
                            {displayedYear}
                        </h3>
                        <div styleName='calender'>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
                                <div key={day}><strong>{day}</strong></div>
                            )}
                            {this.renderMonth()}

                        </div>
                    </div>
                    <div styleName='inputs'>
                        <input styleName='startDate' value={startDate} placeholder='Check in' />
                        <input styleName='endDate' value={endDate} placeholder='Check out' />
                    </div>

                </div>
                {this.state.message && <p styleName='message'>{this.state.message}</p>}
            </div>
        );
    }
}

export default CSSModules(Calender, styles);
