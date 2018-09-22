import React from 'react';
import PropTypes from 'prop-types';
import { Icon, GhostButton, Button } from '@vezeeta/web-components';

import { getAge } from '../../../Helpers';
import './PatientDetails.scss';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

const PatientDetails = (props) => (
  <div className="patient-details-info-container">
    <div className="patient-details-info">
      <div className="patient-details-name">{props.patient.FullName}</div>
      <div className="h10" />

      <div className="patient-details-info-text">
        {getAge(props.patient.BirthDate)} - {props.patient.Gender}
      </div>

      <div className="patient-details-info-list">
        <div className="patient-details-info-item">
          <Icon
            name="phone"
            width={28}
            height={28}
            color={Colors.vezeetaBlue}
          />
          <div className="patient-details-info-text">
            {props.patient.MobilePhone}
          </div>
        </div>
        <div className="patient-details-info-item">
          <Icon
            name="insurance"
            width={28}
            height={28}
            color={Colors.vezeetaBlue}
          />
          <div className="patient-details-info-text">
            {props.patient.InsuranceProvider.Name}
          </div>
        </div>
        <div className="patient-details-info-item">
          <Icon
            name="id"
            width={28}
            height={28}
            color={Colors.vezeetaBlue}
          />
          <div className="patient-details-info-text">
            {props.patient.InsuranceProviderKey}
          </div>
        </div>
      </div>
    </div>
    <GhostButton
      className="patient-details-delete-btn"
      onClick={props.onClickDeletePatient}
    >
      Delete Patient
    </GhostButton>
    <div
      className={props.confirmDeleteShow ? 'patient-delete-confirm-show' : 'patient-delete-confirm-hide'}
    >
      <div className="confirm-info-container">
        <div className="confirm-info-text">
          Confirm delete patient
        </div>

        <div className="modal-buttons-container">
          <GhostButton
            className="fs-18"
            onClick={() => props.submitDeletePatient(false)}
          >
            No
          </GhostButton>
          <Button
            className="fs-18"
            onClick={() => props.submitDeletePatient(true)}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  </div>
);

PatientDetails.propTypes = {
  onClickDeletePatient: PropTypes.func, // eslint-disable-line
  submitDeletePatient: PropTypes.func, // eslint-disable-line
  patient: PropTypes.object, // eslint-disable-line
  confirmDeleteShow: PropTypes.bool, // eslint-disable-line
};

PatientDetails.defaultProps = {
  patient: {
    FullName: '',
    MobilePhone: '',
    InsuranceProvider: '',
    InsuranceProviderKey: '',
  },
  confirmDeleteShow: false,
};

export default PatientDetails;
