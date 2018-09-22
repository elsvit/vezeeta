import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@vezeeta/web-components';

import Appointment from './Appointment';
import './AppointmentsList.scss';

class AppointmentsList extends Component {
  getAppointmentsList = () => {
    const result = [];
    let todayRendered = false;
    let tomorrowRendered = false;
    let laterRendered = false;
    for (let i = 0; i < this.props.appointments.length; i += 1) {
      const appointment = this.props.appointments[i];
      if (!todayRendered && appointment.isToday) {
        result.push(<Text key="horizontal-today" className="horizontal">Today</Text>);
        todayRendered = true;
      } else if (!tomorrowRendered && appointment.isTomorrow) {
        result.push(<Text key="horizontal-tomorrow" className="horizontal">Starting Soon</Text>);
        tomorrowRendered = true;
      } else if (
        !laterRendered &&
        (!appointment.isToday && !appointment.isTomorrow)
      ) {
        result.push(<Text key="horizontal-other" className="horizontal">Other</Text>);
        laterRendered = true;
      } else {
        result.push(<hr key={`separator-${i}`} className="separator" />);
      }

      result.push(<Appointment
        key={appointment.ReservationKey}
        {...appointment}
        updateNoShow={this.props.updateNoShow}
        checkIn={this.props.checkIn}
        openPatientDetails={this.props.openPatientDetails}
        openNotes={this.props.openNotes}
        openCancel={this.props.openCancel}
      />);
    }
    return result;
  };

  render() {
    const appointmentsList = this.getAppointmentsList();
    return <div className="overflow-hidden">{appointmentsList}</div>;
  }
}

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired,
  updateNoShow: PropTypes.func,
  checkIn: PropTypes.func,
  openPatientDetails: PropTypes.func,
  openNotes: PropTypes.func,
  openCancel: PropTypes.func,
};

export default AppointmentsList;
