import React from 'react';
import PropTypes from 'prop-types';
import { Icon, GhostButton } from '@vezeeta/web-components';

import ModalWrapper from '../ModalWrapper';
import './PatientDetails.scss';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

const PatientDetails = (props) => (
  <ModalWrapper
    isOpened={props.isOpened}
    closeModal={props.closeModal}
    title="Patient Info"
  >
    <div className="patient-details-info-container">
      <div className="patient-details-info">
        <span className="patient-details-name">{props.patient.name}</span>
        <div className="h10" />

        <span className="patient-details-info-text">
          {props.patient.age} - {props.patient.gender}
        </span>

        <div className="patient-details-info-list">
          <div className="patient-details-info-item">
            <Icon
              name="phone"
              width="28"
              height="28"
              color={Colors.vezeetaBlue}
            />
            <span className="patient-details-info-text">
              {props.patient.phoneNumber}
            </span>
          </div>
          <div className="patient-details-info-item">
            <Icon
              name="phone"
              width="28"
              height="28"
              color={Colors.vezeetaBlue}
            />
            <span className="patient-details-info-text">
              {props.patient.insuranceProvider}
            </span>
          </div>
          <div className="patient-details-info-item">
            <Icon
              name="phone"
              width="28"
              height="28"
              color={Colors.vezeetaBlue}
            />
            <span className="patient-details-info-text">
              {props.patient.insuranceKey}
            </span>
          </div>
        </div>
      </div>
      <GhostButton className="patient-details-delete-btn">
        Delete Patient
      </GhostButton>
    </div>
  </ModalWrapper>
);

PatientDetails.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  patient: PropTypes.object,
};

export default PatientDetails;
