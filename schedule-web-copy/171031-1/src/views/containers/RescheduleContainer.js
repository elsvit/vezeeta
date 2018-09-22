import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Reschedule from '../presentation/Reschedule';
// import { getDayOfMonthFromDate, getMonthFromDate } from '../../utils/helpers';
import { doubleDigit } from '../../utils/helpers';

class RescheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.getDateOptions = this.getDateOptions.bind(this);
    this.getTimeOptions = this.getTimeOptions.bind(this);
  }

  getDateOptions() {
    // let date = new Date(this.props.rescheduleReservationDateTime);
    // let day = getDayOfMonthFromDate(date);
    // let month = getMonthFromDate(date);
    // let year = date.getFullYear();
  }

  getTimeOptions() {
    let result = [];
    let hours = 0,
      minutes = 0;
    for (let i = 0; i < 288; i++) {
      if (minutes === 60) {
        minutes = 0;
        ++hours;
      }
      let text = `${doubleDigit(hours)}:${doubleDigit(minutes)}`;
      result.push({
        data: {
          placeholder: text,
          value: text
        },
        component: <div>{text}</div>
      });
      minutes += 5;
    }
    return result;
  }

  getCurrentStartTime(nowDate, timeOptions) {
    let hour = doubleDigit(nowDate.getHours());
    let minute = doubleDigit(Math.floor(nowDate.getMinutes() / 5) * 5);
    return timeOptions.find(time => time.data.value === `${hour}:${minute}`);
  }

  getCurrentEndTime(nowDate, timeOptions) {
    let nowHour = nowDate.getHours();
    let nowMinute = Math.floor(nowDate.getMinutes() / 5) * 5 + 5;
    if (nowMinute === 60) {
      nowMinute = 0;
      ++nowHour;
    }
    let hour = doubleDigit(nowHour);
    let minute = doubleDigit(nowMinute);
    return timeOptions.find(time => time.data.value === `${hour}:${minute}`);
  }

  render() {
    if (!this.props.openRescheduleModal) return <div />;
    let timeOptions = this.getTimeOptions();
    let date = new Date();
    let currentStartTime = this.getCurrentStartTime(date, timeOptions).data
      .value;
    let currentEndTime = this.getCurrentEndTime(date, timeOptions).data.value;

    return (
      <Reschedule
        openRescheduleModal={this.props.openRescheduleModal}
        rescheduleReservationKey={this.props.rescheduleReservationKey}
        timeOptions={timeOptions}
        currentStartTime={currentStartTime}
        currentEndTime={currentEndTime}
      />
    );
  }
}

RescheduleContainer.propTypes = {
  openRescheduleModal: PropTypes.bool.isRequired,
  rescheduleReservationKey: PropTypes.string,
  rescheduleReservationDateTime: PropTypes.string
};

export default RescheduleContainer;
