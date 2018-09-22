import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '@vezeeta/web-components';
import PatientRaw from './PatientRaw/index';
import './PatientsList.scss';

class PatientsList extends PureComponent {
  constructor(props) {
    super(props);
    this.getPatientsList = this.getPatientsList.bind(this);
  }

  getPatientsList(patients) {
    const result = [];
    const len = patients ? patients.length : 0;
    for (let i = 0; i < len; i += 1) {
      result.push(<PatientRaw
        key={i}
        patient={patients[i]}
        openModal={this.props.openModal}
      />);
    }
    return result;
  }

  render() {
    const { patients, patientsLoading } = this.props;
    const patientsList = this.getPatientsList(patients);
    const loading = (
      <div className="patients-loading">
        <Spinner />
      </div>
    );
    return (
      <div className="overflow-hidden">
        {patientsLoading ? loading : patientsList}
      </div>
    );
  }
}

PatientsList.propTypes = {
  patients: PropTypes.array,
  patientsLoading: PropTypes.bool,
  openModal: PropTypes.func,
};

export default PatientsList;
