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
        result.push(<Text className="horizontal">Today</Text>);
        todayRendered = true;
      } else if (!tomorrowRendered && appointment.isTomorrow) {
        result.push(<Text className="horizontal">Starting Soon</Text>);
        tomorrowRendered = true;
      } else if (
        !laterRendered &&
        (!appointment.isToday && !appointment.isTomorrow)
      ) {
        result.push(<Text className="horizontal">Other</Text>);
        laterRendered = true;
      } else {
        result.push(<hr className="separator" />);
      }

      result.push(<Appointment
        {...appointment}
        openModal={this.props.openModal}
        changeField={this.props.changeField}
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
  openModal: PropTypes.func,
  changeField: PropTypes.func,
};

export default AppointmentsList;
