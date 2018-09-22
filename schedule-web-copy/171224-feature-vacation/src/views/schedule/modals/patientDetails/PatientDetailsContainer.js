import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, Modal } from '@vezeeta/web-components';

import PatientDetails from './PatientDetails';
import {
  fetchPatient,
  deletePatient,
} from '../../../../store/actions/patients';
import getModalTabs from '../../../utils/Modal';
import { MODAL_NAMES } from '../../../Constants';

class PatientDetailsContainer extends Component {
  componentDidMount() {
    if (this.props.patientKey) {
      this.props.fetchPatient(this.props.patientKey);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.patientKey !== nextProps.patientKey) {
      this.props.fetchPatient(nextProps.patientKey);
    }
  }

  onDeleteSuccess = () => {
    this.props.closeModal();
    if (this.props.onDeleteSuccess) {
      this.props.onDeleteSuccess();
    }
  };

  deletePatient = () => this.props.deletePatient(this.props.patientKey);

  openDeleteConfirmation = () => {
    this.confirmationModal.showModal();
  };

  closeDeleteConfirmation = () => {
    this.confirmationModal.hideModal();
  };

  render() {
    if (this.props.patientFetching) {
      return <Spinner />;
    }
    return (
      <div>
        <Modal
          ref={(modal) => {
            this.confirmationModal = modal;
          }}
          tabs={getModalTabs(MODAL_NAMES.DELETE_PATIENT, {
            closeModal: this.closeDeleteConfirmation,
            onDeleteSuccess: this.onDeleteSuccess,
            deletePatient: this.deletePatient,
            deletingPatient: this.props.deletingPatient,
            deletedPatient: this.props.deletedPatient,
          })}
        />
        <PatientDetails
          patient={this.props.patient}
          openDeleteConfirmation={this.openDeleteConfirmation}
        />
      </div>
    );
  }
}

PatientDetailsContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  patientKey: PropTypes.string,
  patient: PropTypes.object,
  fetchPatient: PropTypes.func,
  patientFetching: PropTypes.bool,
  deletePatient: PropTypes.func,
  onDeleteSuccess: PropTypes.func,
  deletingPatient: PropTypes.bool,
  deletedPatient: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  patient: state.patients.currentPatient,
  patientFetching: state.patients.currentPatientFetching,
  deletingPatient: state.patients.deletePatientSaving,
  deletedPatient: state.patients.deletePatientSaved,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientKey) => dispatch(fetchPatient(patientKey)),
  deletePatient: (patientKey) => dispatch(deletePatient(patientKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsContainer);
