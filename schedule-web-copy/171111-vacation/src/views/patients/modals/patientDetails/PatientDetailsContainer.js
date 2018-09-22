import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PatientDetails from './PatientDetails';
import { getGenderText } from '../../../Helpers';

class PatientDetailsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.setStatePatient(this.props.patient),
      confirmDeleteShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const check = nextProps.patient !== undefined &&
      nextProps.patient.PatientKey !== undefined;
    if (check) {
      const patient = this.setStatePatient(nextProps.patient);
      this.setState({
        patient,
      });
    }
  }

  onClickDeletePatient = () => {
    this.setState({
      confirmDeleteShow: true,
    });
  }

  setStatePatient = (patientIn) => {
    const patient = { ...patientIn };
    if (patient.InsuranceProvider === undefined || patient.InsuranceProvider === null) {
      patient.InsuranceProvider = {};
      patient.InsuranceProvider.InsuranceProviderId = '';
      patient.InsuranceProvider.Name = '';
    }
    if (patient.RelativeName === undefined || patient.RelativeName === null) {
      patient.RelativeName = '';
    }
    patient.Gender = getGenderText(patient.Gender);
    return patient;
  }

  submitDeletePatient = (e) => {
    if (e) {
      this.props.submitDeletePatient(this.props.patient);
    }
    this.setState({
      confirmDeleteShow: false,
    });
  }

  render() {
    return (
      <div>
        <PatientDetails
          onClickDeletePatient={this.onClickDeletePatient}
          patient={this.state.patient}
          confirmDeleteShow={this.state.confirmDeleteShow}
          submitDeletePatient={this.submitDeletePatient}
        />
      </div>
    );
  }
}

PatientDetailsContainer.propTypes = {
  patient: PropTypes.shape({
    PatientKey: PropTypes.string,
    FullName: PropTypes.string,
    Gender: PropTypes.bool,
    CountryCode: PropTypes.string,
    MobilePhone: PropTypes.string,
    BirthDate: PropTypes.string,
    Identifier: PropTypes.string,
    InsuranceProvider: PropTypes.object,
    InsuranceProviderKey: PropTypes.string,
    relativeType: PropTypes.string,
    RelativeName: PropTypes.string,
  }),
  submitDeletePatient: PropTypes.func,
};

export default PatientDetailsContainer;
