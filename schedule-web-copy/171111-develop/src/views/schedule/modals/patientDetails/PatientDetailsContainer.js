import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PatientDetails from './PatientDetails';
import { fetchPatient } from '../../../../store/actions/patient';

class PatientDetailsContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props !== nextProps &&
      this.props.patientKey !== nextProps.patientKey &&
      nextProps.isOpened
    ) {
      this.props.fetchPatient(nextProps.patientKey);
    }
  }

  render() {
    if (!this.props.isOpened) return <div />;

    return (
      <PatientDetails
        isOpened={this.props.isOpened}
        closeModal={this.props.closeModal}
        patient={this.props.patient}
      />
    );
  }
}

PatientDetailsContainer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  patientKey: PropTypes.string,
  patient: PropTypes.object,
  fetchPatient: PropTypes.func,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientKey) => dispatch(fetchPatient(patientKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsContainer);
