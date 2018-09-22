import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PatientRaw from './PatientRaw/index';
import './PatientsList.scss';

// eslint-disable-next-line
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
        onClickEditPatient={this.props.onClickEditPatient}
      />);
      result.push(<hr key={'hr' + i} className="separator" />);  // eslint-disable-line
    }
    return result;
  }

  render() {
    const patients = this.props.patients;
    const patientsList = this.getPatientsList(patients);
    console.log('PatientsList36 patientsList', patientsList, ' patients', patients); // eslint-disable-line
    return (
      <div className="overflow-hidden">
        {patientsList}
      </div>
    );
  }
}

PatientsList.propTypes = {
  patients: PropTypes.array,
  onClickEditPatient: PropTypes.func,
};

export default PatientsList;
