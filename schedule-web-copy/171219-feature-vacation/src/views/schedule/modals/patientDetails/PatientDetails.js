import React from 'react';
import PropTypes from 'prop-types';
import { Icon, GhostButton } from '@vezeeta/web-components';

import { getAge } from '../../../Helpers';
import './PatientDetails.scss';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

const PatientDetails = (props) => (
  <div className="patient-details-info-container">
    <div className="patient-details-info">
      <span className="patient-details-name">{props.patient.FullName}</span>
      <div className="h10" />

      <span className="patient-details-info-text">
        {`${getAge(props.patient.BirthDate)} - ${
          props.patient.Gender ? 'Male' : 'Female'
        }`}
      </span>

      <div className="patient-details-info-list">
        <div className="patient-details-info-item">
          <Icon
            name="phone"
            width={28}
            height={28}
            color={Colors.vezeetaBlue}
          />
          <span className="patient-details-info-text">
            {props.patient.MobilePhone}
          </span>
        </div>
        <div className="patient-details-info-item">
          <Icon
            name="insurance"
            width={28}
            height={28}
            color={Colors.vezeetaBlue}
          />
          <span className="patient-details-info-text">
            {props.patient.InsuranceProvider}
          </span>
        </div>
        <div className="patient-details-info-item">
          <Icon name="id" width={28} height={28} color={Colors.vezeetaBlue} />
          <span className="patient-details-info-text">
            {props.patient.InsuranceProviderKey}
          </span>
        </div>
      </div>
    </div>
    <GhostButton
      className="patient-details-delete-btn"
      onClick={props.openDeleteConfirmation}
    >
      Delete Patient
    </GhostButton>
  </div>
);

PatientDetails.propTypes = {
  patient: PropTypes.shape({
    FullName: PropTypes.string,
    BirthDate: PropTypes.string,
    Gender: PropTypes.bool,
    MobilePhone: PropTypes.string,
    InsuranceProvider: PropTypes.string,
    InsuranceProviderKey: PropTypes.string,
  }),
  openDeleteConfirmation: PropTypes.func,
};

export default PatientDetails;
