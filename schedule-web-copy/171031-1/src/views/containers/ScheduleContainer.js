import React, { Component } from 'react';
import Schedule from '../presentation/Schedule';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.openPatientDetails = this.openPatientDetails.bind(this);
    this.openReschedule = this.openReschedule.bind(this);
    this.state = {
      openPatientDetailsModal: false,
      openRescheduleModal: false,
      patientKey: null,
      rescheduleReservationKey: null,
      rescheduleReservationDateTime: null
    };
  }

  openPatientDetails(patientKey) {
    this.setState({
      openPatientDetailsModal: true,
      patientKey: patientKey
    });
  }

  openReschedule(reservationKey, reservationDateTime) {
    this.setState({
      openRescheduleModal: true,
      rescheduleReservationKey: reservationKey,
      rescheduleReservationDateTime: reservationDateTime
    });
  }

  render() {
    return (
      <Schedule
        openPatientDetailsModal={this.state.openPatientDetailsModal}
        patientKey={this.state.patientKey}
        openPatientDetails={this.openPatientDetails}
        openRescheduleModal={this.state.openRescheduleModal}
        rescheduleReservationKey={this.state.rescheduleReservationKey}
        openReschedule={this.openReschedule}
        rescheduleReservationDateTime={this.state.rescheduleReservationDateTime}
      />
    );
  }
}

export default ScheduleContainer;
