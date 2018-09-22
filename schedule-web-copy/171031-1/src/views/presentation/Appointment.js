import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noShow from '../../assets/images/no_show.jpg';
import reschedule from '../../assets/images/reschedule.jpg';
import checkIn from '../../assets/images/check_in.jpg';
import logo from '../../assets/images/vezeeta-logo.jpg';

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.openPatientDetails = this.openPatientDetails.bind(this);
    this.openReschedule = this.openReschedule.bind(this);
  }

  openPatientDetails() {
    this.props.openPatientDetails(this.props.patientKey);
  }

  openReschedule() {
    this.props.openReschedule(
      this.props.reservationKey,
      this.props.reservationDateTime
    );
  }

  render() {
    let appointmentTime = `${this.props.appointmentStart} - ${this.props
      .appointmentEnd}`;
    let appointmentPassedClass = this.props.appointmentPassed && 'passed';

    return (
      <div className="row appointment">
        <div className="col-xs-9">
          <div className="row">
            <div className="col-xs-3">
              <span
                className="blue-text pointer fs-18"
                onClick={this.openPatientDetails}
              >
                {this.props.patientName}
              </span>
              <span className={`block ${appointmentPassedClass}`}>
                {this.props.appointmentType}
              </span>
            </div>

            <div className="col-xs-1">
              {this.props.isVezeetaAppointment && <img src={logo} />}
            </div>

            <div className={`col-xs-3 ${appointmentPassedClass}`}>
              <span className="block bold">{this.props.doctorName}</span>
              <span className="block">{this.props.branchName}</span>
            </div>

            <div className={`col-xs-5 ${appointmentPassedClass}`}>
              <span className="block bold">{appointmentTime}</span>
              <span className="block">{this.props.roomName}</span>
            </div>
          </div>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <div className="col-xs-4">
              <img className="pointer" src={checkIn} />
            </div>

            <div className="col-xs-4">
              <img className="pointer" src={noShow} />
            </div>

            <div className="col-xs-4">
              <img
                className="pointer"
                src={reschedule}
                onClick={this.openReschedule}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Appointment.propTypes = {
  patientName: PropTypes.string.isRequired,
  appointmentType: PropTypes.string,
  doctorName: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  appointmentStart: PropTypes.string.isRequired,
  appointmentEnd: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  isVezeetaAppointment: PropTypes.bool.isRequired,
  appointmentPassed: PropTypes.bool.isRequired,
  patientKey: PropTypes.string.isRequired,
  openPatientDetails: PropTypes.func,
  reservationKey: PropTypes.string.isRequired,
  openReschedule: PropTypes.func,
  reservationDateTime: PropTypes.string.isRequired
};

export default Appointment;
