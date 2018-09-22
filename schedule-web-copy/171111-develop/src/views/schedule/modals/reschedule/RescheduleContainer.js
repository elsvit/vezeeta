import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Reschedule from './Reschedule';
// import { getDayOfMonthFromDate, getMonthFromDate } from '../../utils/helpers';
import { doubleDigit } from '../../../Helpers';

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
    const result = [];
    let hours = 0;
    let minutes = 0;
    for (let i = 0; i < 288; i += 1) {
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }
      const text = `${doubleDigit(hours)}:${doubleDigit(minutes)}`;
      result.push({
        data: {
          placeholder: text,
          value: text,
        },
        component: <div>{text}</div>,
      });
      minutes += 5;
    }
    return result;
  }

  getCurrentStartTime(nowDate, timeOptions) {
    const hour = doubleDigit(nowDate.getHours());
    const minute = doubleDigit(Math.floor(nowDate.getMinutes() / 5) * 5);
    return timeOptions.find((time) => time.data.value === `${hour}:${minute}`);
  }

  getCurrentEndTime(nowDate, timeOptions) {
    let nowHour = nowDate.getHours();
    let nowMinute = Math.floor(nowDate.getMinutes() / 5 * 5) + 5; //eslint-disable-line
    if (nowMinute === 60) {
      nowMinute = 0;
      nowHour += 1;
    }
    const hour = doubleDigit(nowHour);
    const minute = doubleDigit(nowMinute);
    return timeOptions.find((time) => time.data.value === `${hour}:${minute}`);
  }

  render() {
    if (!this.props.openRescheduleModal) return <div />;
    const timeOptions = this.getTimeOptions();
    const date = new Date();
    const currentStartTime = this.getCurrentStartTime(date, timeOptions).data
      .value;
    const currentEndTime = this.getCurrentEndTime(date, timeOptions).data.value;

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
  // rescheduleReservationDateTime: PropTypes.string,
};

export default RescheduleContainer;
