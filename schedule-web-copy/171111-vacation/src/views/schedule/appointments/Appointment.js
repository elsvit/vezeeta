import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Text, Icon } from '@vezeeta/web-components';

import { MODAL_NAMES } from '../../Constants';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

class Appointment extends Component {
  openPatientDetails = () => {
    const { openModal } = this.props;

    openModal(MODAL_NAMES.PATIENT_DETAILS, {
      patientKey: 'PAT8b0c6f61a39047c6',
    });
  };

  openReschedule = () => {
    const { openModal, ReservationKey, reservationDateTime } = this.props;

    openModal(MODAL_NAMES.RESCHEDULE, { ReservationKey, reservationDateTime });
  };

  openCancel = () => {
    this.props.openModal(MODAL_NAMES.CANCEL_APPOINTMENT);
  };

  openNotes = () => {
    this.props.openModal(MODAL_NAMES.PATIENT_NOTES, {
      notes: this.props.notes,
    });
  };

  handleCheckInClick = () => {
    const {
      EnableCheckIn,
      changeField,
      ReservationKey,
      IsCheckedIn,
    } = this.props;
    if (EnableCheckIn) {
      changeField(ReservationKey, 'IsCheckedIn', !IsCheckedIn);
    }
  };

  render() {
    const appointmentTime = `${this.props.appointmentStart} - ${
      this.props.appointmentEnd
    }`;
    const actionsIconsColor = this.props.ReservationPassed
      ? Colors.helperGrey
      : Colors.vezeetaBlue;
    const checkInIconName = this.props.IsCheckedIn ? 'check_in' : 'check_out';
    const noShowIconName = this.props.IsNoShow ? 'no_show' : 'show';

    return (
      <div
        className={classnames('row', 'appointment', {
          'appointment-passed': this.props.ReservationPassed,
        })}
      >
        <div className="col-xs-9 appointment-info-container">
          <div className="col-xs-3 appointment-patient-details">
            <Text
              className="pointer appointment-details-title"
              onClick={this.openPatientDetails}
            >
              {this.props.PatientName}
            </Text>
            {this.props.notes && (
              <div
                className="patient-notes pointer"
                onClick={this.openNotes}
                onKeyDown={this.openNotes}
              >
                <Icon name="note" height="20" color={Colors.vezeetaBlue} />
              </div>
            )}
            <Text className="appointment-heading">
              {this.props.appointmentType}
            </Text>
          </div>

          <div className="col-xs-3 appointments-doctor-details">
            <Text className="appointment-details-title">
              {this.props.doctorName}
            </Text>
            <Text className="appointment-heading">{this.props.branchName}</Text>
          </div>

          <div className="col-xs-5 appointments-time-details">
            <Text className="appointment-details-title">{appointmentTime}</Text>
            <Text className="appointment-heading">{this.props.roomName}</Text>
          </div>
        </div>
        <div className="col-xs-3 appointments-actions-container">
          <div className="row">
            <div
              className="col-xs-4"
              onClick={this.handleCheckInClick}
              onKeyDown={this.handleCheckInClick}
            >
              <Icon
                className={classnames('icon', {
                  pointer: this.props.EnableCheckIn,
                })}
                name={checkInIconName}
                height="53"
                color={actionsIconsColor}
              />
            </div>

            <div className="col-xs-4">
              <Icon
                className={classnames('icon', {
                  pointer: this.props.EnableNoShow,
                })}
                name={noShowIconName}
                height="53"
                color={actionsIconsColor}
              />
            </div>

            <div
              className="col-xs-4"
              onClick={this.openCancel}
              onKeyDown={() => {}}
            >
              <Icon
                className={classnames('icon', {
                  pointer: this.props.EnableCancel,
                })}
                name="cancel"
                height="53"
                color={actionsIconsColor}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Appointment.propTypes = {
  PatientName: PropTypes.string.isRequired,
  appointmentType: PropTypes.string,
  doctorName: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  appointmentStart: PropTypes.string.isRequired,
  appointmentEnd: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  ReservationPassed: PropTypes.bool.isRequired,
  openModal: PropTypes.func,
  ReservationKey: PropTypes.string.isRequired,
  reservationDateTime: PropTypes.string.isRequired,
  IsCheckedIn: PropTypes.bool,
  IsNoShow: PropTypes.bool,
  EnableCheckIn: PropTypes.bool,
  EnableNoShow: PropTypes.bool,
  EnableCancel: PropTypes.bool,
  changeField: PropTypes.func,
  notes: PropTypes.string,
};

export default Appointment;
