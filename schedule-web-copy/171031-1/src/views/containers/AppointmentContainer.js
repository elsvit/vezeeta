import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppointmentsList from '../presentation/AppointmentsList';
import Api from '../../components/apis/Api';
// import Api from '../../apis/Api.js';
import config from '../../config';
import {
  getAppointmentStart,
  getAppointmentEnd,
  isToday,
  isTomorrow
} from '../../utils/helpers';

class AppointmentContainer extends Component {
  constructor(props) {
    super(props);
    this.getAppointments = this.getAppointments.bind(this);
    this.apiWrapper = new Api();
    this.state = {
      appointments: []
    };
  }

  async componentWillMount() {
    await this.getAppointments();
  }

  async getAppointments() {
    let scheduleType = 1; //Remove this
    let startDate = '02/01/2016';
    let endDate = '02/15/2016';
    let appointments = (await this.apiWrapper.get(
      `${config.scheduleApiHost}${config.getReservationDetailsUrl}?dateFrom=${startDate}&dateTo=${endDate}&scheduleTypeId=${scheduleType}`,
      [
        {
          key: 'ClinicKey',
          value: 'clnc8c1fff89af1dacc0'
        },
        {
          key: 'Authorization',
          value: '9913fb'
        },
        {
          key: 'Language',
          value: 'ar-EG'
        }
      ] //Remove this
    )).data;

    this.appointments = appointments.map(appointment => {
      let appointmentDateTime = new Date(appointment.ReservationDate);
      appointment.isToday = isToday(appointmentDateTime);
      appointment.isTomorrow = isTomorrow(appointmentDateTime);
      appointment.appointmentStart = getAppointmentStart(
        scheduleType,
        appointment
      );
      appointment.appointmentEnd = getAppointmentEnd(scheduleType, appointment);
      return appointment;
    });

    this.setState({ appointments: appointments });
  }

  render() {
    return (
      <AppointmentsList
        appointments={this.state.appointments}
        openPatientDetails={this.props.openPatientDetails}
        openReschedule={this.props.openReschedule}
      />
    );
  }
}

AppointmentContainer.propTypes = {
  openPatientDetails: PropTypes.func,
  openReschedule: PropTypes.func
};

export default AppointmentContainer;
