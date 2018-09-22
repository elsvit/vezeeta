import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { showModal, hideModal } from '@vezeeta/web-components'; // eslint-disable-line

import Patients from './Patients';
import { MODAL_NAMES } from '../Constants';
import { getFirstObjByProp, getGenderText } from '../Helpers'; // eslint-disable-line
import { loadCountry } from '../../store/actions/country';
import {
  loadPatients,
  addPatient,
  editPatient,
  deletePatient,
} from '../../store/actions/patients';
// import PatientDetails from './modals/patientDetails/PatientDetails'; // eslint-disable-line
import PatientDetailsContainer from './modals/patientDetails/PatientDetailsContainer'; // eslint-disable-line
import AddPatientContainer from './modals/addPatient/AddPatientContainer'; // eslint-disable-line

const mapStateToProps = (state) => ({
  userType: state.user.type,
  patients: state.patients.Patients,
  countries: state.country.Countries,
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadPatients,
  addPatient,
  editPatient,
  deletePatient,
  loadCountry,
}, dispatch);

class PatientsContainer extends Component {
  constructor(props) {
    super(props);
    this.MODAL_TITLES = {
      [MODAL_NAMES.PATIENT_DETAILS]: 'Patient Info',
      [MODAL_NAMES.ADD_PATIENT]: 'Add New Patient',
      [MODAL_NAMES.EDIT_PATIENT]: 'Edit Patient',
    };
    this.MODAL_COMPONENTS = {
      [MODAL_NAMES.PATIENT_DETAILS]: PatientDetailsContainer,
      [MODAL_NAMES.ADD_PATIENT]: AddPatientContainer,
      [MODAL_NAMES.EDIT_PATIENT]: AddPatientContainer,
    };
    this.state = {
      textForSearch: '',
      openedModal: '',
      modalData: {},
      // modalClass: 'vacation-modal-hide',
    };
  }

  componentDidMount() {
    this.props.loadPatients();
    this.props.loadCountry();
  }

  onChangeSearch = (textForSearch) => {
    this.setState({
      textForSearch,
    });
  }

  getCountryCodes = (countries) => {
    const countryCodes = countries.map((country) => ({
      value: country.CountryCode,
      text: country.CountryCode,
    }));
    return countryCodes;
  }

  getModalTabs = (modalName, modalComponentProps) => {
    const ModalComponent = this.MODAL_COMPONENTS[modalName];
    return [
      {
        tabName: this.MODAL_TITLES[modalName],
        tabPage: <ModalComponent {...modalComponentProps} />,
      },
    ];
  };

  closeModal = () => {
    this.setState({
      openedModal: '',
      modalData: {},
      // modalClass: 'vacation-modal-hide',
    });
    if (this.modalCont) {
      this.modalCont.hideModal();
    }
  };

  submitAddPatient = (patient) => {
    this.props.addPatient(patient);
    this.closeModal();
  }

  submitEditPatient = (patient) => {
    this.props.editPatient(patient);
    this.closeModal();
  }

  submitDeletePatient = (patient) => {
    if (patient.PatientKey) {
      this.props.deletePatient(patient.PatientKey);
    }
    this.closeModal();
  }

  openModal = (modalName, modalDataIn) => {
    const modalData = { ...modalDataIn };
    if (MODAL_NAMES[modalName]) {
      switch (modalName) { // eslint-disable-line
      case MODAL_NAMES.PATIENT_DETAILS: {
        if (modalDataIn.patient && modalDataIn.patient.PatientKey) {
          modalData.submitDeletePatient = this.submitDeletePatient;
          // modalData.className = [this.state.modalClass];
        }
        break;
      }
      case MODAL_NAMES.ADD_PATIENT: {
        const countryCodes = this.getCountryCodes(this.props.countries);
        modalData.submitBtnText = 'Add Patient';
        modalData.closeModal = this.closeModal;
        modalData.submitForm = this.submitAddPatient;
        modalData.countryCodes = [...countryCodes];
        // modalData.className = [this.state.modalClass];
        break;
      }
      case MODAL_NAMES.EDIT_PATIENT: {
        const countryCodes = this.getCountryCodes(this.props.countries);
        modalData.submitBtnText = 'Edit Patient';
        modalData.closeModal = this.closeModal;
        modalData.submitForm = this.submitEditPatient;
        modalData.countryCodes = [...countryCodes];
        // modalData.className = [this.state.modalClass];
        break;
      }
      }
      // console.log('openModal163 modalData', modalData); // eslint-disable-line
      this.setState({
        openedModal: modalName,
        modalData,
        // modalClass: 'vacation-modal-show',
      });

      if (this.modalCont) {
        this.modalCont.showModal();
      }
    }
  };

  render() {
    const { openedModal, modalData } = this.state;
    return (
      <Patients
        ref={(modalCont) => { this.modalCont = modalCont; }}
        onChangeSearch={this.onChangeSearch}
        textForSearch={this.state.textForSearch}
        openModal={this.openModal}
        modalData={modalData}
        openedModal={openedModal}
        getModalTabs={this.getModalTabs}
      />
    );
  }
}

PatientsContainer.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  loadPatients: PropTypes.func,
  addPatient: PropTypes.func,
  editPatient: PropTypes.func,
  deletePatient: PropTypes.func,
  loadCountry: PropTypes.func,
};

PatientsContainer.defaultProps = {
  patients: [{}],
  countries: [{ CountryCode: '+20' }],
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);

