import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppointmentsList.scss';
import Appointment from './Appointment';

class AppointmentsList extends Component {
  constructor(props) {
    super(props);
    this.getAppointmentsList = this.getAppointmentsList.bind(this);
  }

  getAppointmentsList() {
    let result = [];
    let todayRendered = false,
      tomorrowRendered = false,
      laterRendered = false;
    for (let i = 0; i < this.props.appointments.length; i++) {
      let appointment = this.props.appointments[i];
      if (!todayRendered && appointment.isToday) {
        result.push(<span className="horizontal">Today</span>);
        todayRendered = true;
      } else if (!tomorrowRendered && appointment.isTomorrow) {
        result.push(<span className="horizontal">Tomorrow</span>);
        tomorrowRendered = true;
      } else if (
        !laterRendered &&
        (!appointment.isToday && !appointment.isTomorrow)
      ) {
        result.push(<span className="horizontal">Later</span>);
        laterRendered = true;
      } else {
        result.push(<hr className="separator" />);
      }

      result.push(
        <Appointment
          key={appointment.ReservationKey}
          patientName={appointment.PatientName}
          appointmentType={appointment.appointmentType}
          doctorName={appointment.doctorName}
          branchName={appointment.branchName}
          appointmentStart={appointment.appointmentStart}
          appointmentEnd={appointment.appointmentEnd}
          roomName={appointment.roomName}
          isVezeetaAppointment={appointment.IsVezeetaAppointment}
          appointmentPassed={appointment.ReservationPassed}
          isNoShow={appointment.IsNoShow}
          patientKey={appointment.PatientKey}
          openPatientDetails={this.props.openPatientDetails}
          openReschedule={this.props.openReschedule}
          reservationDateTime={appointment.ReservationDate}
          reservationKey={appointment.ReservationKey}
        />
      );
    }
    return result;
  }

  render() {
    let appointmentsList = this.getAppointmentsList();
    return <div className="overflow-hidden">{appointmentsList}</div>;
  }
}

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired,
  openPatientDetails: PropTypes.func,
  openReschedule: PropTypes.func
};

export default AppointmentsList;
