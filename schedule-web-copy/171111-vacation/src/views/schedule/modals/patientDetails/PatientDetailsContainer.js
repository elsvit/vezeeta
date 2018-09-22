import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PatientDetails from './PatientDetails';
import { fetchPatient } from '../../../../store/actions/patients';

class PatientDetailsContainer extends Component {
  componentWillMount() {
    if (this.props.patientKey) {
      this.props.fetchPatient(this.props.patientKey);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props !== nextProps &&
      this.props.patientKey !== nextProps.patientKey
    ) {
      this.props.fetchPatient(nextProps.patientKey);
    }
  }

  render() {
    return <PatientDetails patient={this.props.patient} />;
  }
}

PatientDetailsContainer.propTypes = {
  patientKey: PropTypes.string,
  patient: PropTypes.object,
  fetchPatient: PropTypes.func,
};

const mapStateToProps = (state) => ({
  patient: state.patients.currentPatient,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientKey) => dispatch(fetchPatient(patientKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsContainer);
