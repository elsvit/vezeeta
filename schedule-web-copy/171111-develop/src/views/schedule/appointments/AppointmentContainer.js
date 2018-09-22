import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppointmentsList from './AppointmentsList';
import { getAppointmentStart, getAppointmentEnd } from '../../Helpers';
import {
  fetchAppointments,
  changeField,
} from '../../../store/actions/appointments';

class AppointmentContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && this.props.appointments.length === 0) {
      this.props.fetchAppointments(nextProps.startDate, nextProps.endDate);
    }
  }

  transformAppointments = (appointments) =>
    appointments.map((appointment, index) => {
      // const appointmentDateTime = new Date(appointment.ReservationDate);
      const newAppointment = appointment;
      newAppointment.ReservationPassed = index === 0;
      newAppointment.isToday = index < 4;
      newAppointment.EnableCheckIn = true;
      newAppointment.notes = 'Some notes';
      newAppointment.isTomorrow = index >= 4 && index < 7;
      newAppointment.appointmentStart = getAppointmentStart(1, appointment);
      newAppointment.appointmentEnd = getAppointmentEnd(1, appointment);
      newAppointment.doctorName = 'Dr Ahmed Aly';
      newAppointment.branchName = 'Branch name';
      newAppointment.roomName = 'Room 3';
      newAppointment.PatientName = 'Patient Name';
      newAppointment.appointmentType = 'Examination';
      return newAppointment;
    });

  render() {
    return (
      <AppointmentsList
        appointments={this.transformAppointments(this.props.appointments)}
        openModal={this.props.openModal}
        changeField={this.props.changeField}
      />
    );
  }
}

AppointmentContainer.propTypes = {
  openModal: PropTypes.func,
  appointments: PropTypes.array,
  fetchAppointments: PropTypes.func,
  changeField: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

const mapStateToProps = (state) => ({
  appointments: state.appointments.list,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAppointments: (startDate, endDate) =>
    dispatch(fetchAppointments(startDate, endDate)),
  changeField: (reservationKey, key, value) =>
    dispatch(changeField(reservationKey, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentContainer);
