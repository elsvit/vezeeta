import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Text, Icon, Spinner } from '@vezeeta/web-components';

import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

const Appointment = (props) => {
  const appointmentTime = `${props.appointmentStart} - ${props.appointmentEnd}`;
  const actionsIconsColor = props.ReservationPassed
    ? Colors.helperGrey
    : Colors.vezeetaBlue;
  const checkInIconName = props.IsCheckedIn ? 'check_out' : 'check_in';
  const noShowIconName = props.IsNoShow ? 'show' : 'no_show';

  if (props.isUpdating) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className={classnames('row', 'appointment', {
        'appointment-passed': props.ReservationPassed,
      })}
    >
      <div className="col-xs-9 appointment-info-container">
        <div className="col-xs-4 appointment-patient-details">
          <div>
            <Text
              className="pointer appointment-details-title"
              onClick={() => props.openPatientDetails(props.PatientKey)}
            >
              {props.PatientName}
            </Text>
            {props.Notes && (
              <div
                className="patient-notes pointer"
                onClick={() => props.openNotes(props.Notes)}
                onKeyDown={() => {}}
              >
                <Icon name="note" height={20} color={Colors.vezeetaBlue} />
              </div>
            )}
          </div>
          <Text className="appointment-heading">{props.appointmentType}</Text>
        </div>

        <div className="col-xs-3 appointments-doctor-details">
          <Text className="appointment-details-title">{props.doctorName}</Text>
          <Text className="appointment-heading">{props.branchName}</Text>
        </div>

        <div className="col-xs-5 appointments-time-details">
          <Text className="appointment-details-title">{appointmentTime}</Text>
          <Text className="appointment-heading">{props.roomName}</Text>
        </div>
      </div>
      <div className="col-xs-3 appointments-actions-container">
        <div className="row">
          <div
            className="col-xs-4"
            onClick={() => props.checkIn(props.ReservationKey)}
            onKeyDown={() => {}}
          >
            <Icon
              className={classnames('icon', {
                pointer: props.EnableCheckin,
              })}
              name={checkInIconName}
              height={53}
              color={actionsIconsColor}
            />
          </div>

          <div
            className="col-xs-4"
            onClick={() => props.updateNoShow(props.ReservationKey)}
            onKeyDown={() => {}}
          >
            <Icon
              className={classnames('icon', {
                pointer: props.EnableNoShow,
              })}
              name={noShowIconName}
              height={53}
              color={actionsIconsColor}
            />
          </div>

          <div
            className="col-xs-4"
            onClick={() => props.openCancel(props.ReservationKey)}
            onKeyDown={() => {}}
          >
            <Icon
              className={classnames('icon', {
                pointer: !props.ReservationPassed,
              })}
              name="cancel"
              height={53}
              color={actionsIconsColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Appointment.propTypes = {
  PatientName: PropTypes.string.isRequired,
  PatientKey: PropTypes.string.isRequired,
  appointmentType: PropTypes.string,
  doctorName: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  appointmentStart: PropTypes.string.isRequired,
  appointmentEnd: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  ReservationPassed: PropTypes.bool.isRequired,
  ReservationKey: PropTypes.string.isRequired,
  IsCheckedIn: PropTypes.bool,
  IsNoShow: PropTypes.bool,
  EnableCheckin: PropTypes.bool,
  EnableNoShow: PropTypes.bool,
  updateNoShow: PropTypes.func,
  Notes: PropTypes.string,
  isUpdating: PropTypes.bool,
  checkIn: PropTypes.func,
  openPatientDetails: PropTypes.func,
  openNotes: PropTypes.func,
  openCancel: PropTypes.func,
};

export default Appointment;
