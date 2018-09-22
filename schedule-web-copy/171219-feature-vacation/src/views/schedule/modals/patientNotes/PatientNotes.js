import React from 'react';
import PropTypes from 'prop-types';

import './PatientNotes.scss';

const PatientNotes = (props) => (
  <div className="patient-notes-info-container">{props.notes}</div>
);

PatientNotes.propTypes = {
  notes: PropTypes.string,
};

export default PatientNotes;
