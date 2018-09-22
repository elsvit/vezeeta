import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../ModalWrapper';
import './PatientNotes.scss';

const PatientNotes = (props) => (
  <ModalWrapper
    isOpened={props.isOpened}
    closeModal={props.closeModal}
    title="Patient Notes"
  >
    <div className="patient-notes-info-container">{props.notes}</div>
  </ModalWrapper>
);

PatientNotes.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  notes: PropTypes.string,
};

export default PatientNotes;
