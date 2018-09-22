import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddPatient from './AddPatient';
import { getMMDDYYYY, getFirstObjByProp } from '../../../Helpers';

class AddPatientContainer extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      patient: this.setStatePatient(this.props.patient),
    };
  }

  componentWillReceiveProps(nextProps) {
    const check = nextProps.patient !== undefined &&
      nextProps.patient.PatientKey !== undefined;
    // this.props.patient.PatientKey !== nextProps.patient.PatientKey;
    if (check) {
      const patient = this.setStatePatient(nextProps.patient);
      this.setState({
        patient,
      });
    }
  }

  onChangePhonePrefix = (e) => {
    if (this.state.patient.CountryCode !== e) {
      const newState = { ...this.state };
      newState.patient.CountryCode = e;
      this.setState(newState);
    }
  }

  onChangeGender = (e) => {
    const eventGender = this.setGenderToState(e);
    if (this.state.patient.Gender !== eventGender) {
      const newState = { ...this.state };
      newState.patient.Gender = eventGender;
      this.setState(newState);
    }
  }
  onChangeRelativeType = (e) => {
    if (this.state.patient.relativeType !== e) {
      const newState = { ...this.state };
      newState.patient.relativeType = e;
      this.setState(newState);
    }
  }

  onChangeInsurance = (e) => {
    if (this.state.patient.InsuranceProvider !== e) {
      const newState = { ...this.state };
      newState.patient.InsuranceProvider.InsuranceProviderId = e;
      newState.patient.InsuranceProvider.Name = getFirstObjByProp(this.props.InsuranceProviders, 'value', e).text;
      this.setState(newState);
    }
  }

  onChangeBirthDate = (e) => {
    if (this.state.patient.BirthDate !== e.date) {
      const newState = { ...this.state };
      if (newState.patient === undefined) newState.patient = {};
      newState.patient.BirthDate = e.date;
      this.setState(newState);
    }
  }

  setStatePatient = (patientIn) => {
    const patient = { ...patientIn };
    if (patient.InsuranceProvider === undefined || patient.InsuranceProvider === null) {
      patient.InsuranceProvider = {};
      patient.InsuranceProvider.InsuranceProviderId = '';
      patient.InsuranceProvider.Name = '';
    }
    if (patient.BirthDate !== undefined || patient.BirthDate !== null) {
      patient.BirthDate = getMMDDYYYY(patient.BirthDate);
    }
    if (patient.RelativeName === undefined || patient.RelativeName === null) {
      patient.RelativeName = '';
    }
    return patient;
  }

  setDataPatientName = (e) => {
    if (this.state.patient.FullName !== e) {
      const newState = { ...this.state };
      newState.patient.FullName = e;
      this.setState(newState);
    }
  }

  setDataMobilePhone = (e) => {
    if (this.state.patient.MobilePhone !== e) {
      const newState = { ...this.state };
      newState.patient.MobilePhone = e;
      this.setState(newState);
    }
  }

  setDataPatientID = (e) => {
    if (this.state.patient.Identifier !== e) {
      const newState = { ...this.state };
      newState.patient.Identifier = e;
      this.setState(newState);
    }
  }

  setDataRelativeName = (e) => {
    if (this.state.patient.RelativeName !== e) {
      const newState = { ...this.state };
      newState.patient.RelativeName = e;
      this.setState(newState);
    }
  }

  setGenderToState = (val) => {
    if (val === 'AddMale') return true;
    if (val === 'AddFemale') return false;
    return null;
  }

  setGenderToRadiobutton = (val) => {
    if (val === true) return 'AddMale';
    if (val === false) return 'AddFemale';
    return '';
  }

  submitForm = () => {
    const { FullName, MobilePhone } = this.state.patient;
    if (FullName && MobilePhone) {
      this.props.submitForm(this.state.patient);
    }
  }

  render() {
    const { countryCodes, relativeTypes, InsuranceProviders } = this.props;
    const { patient } = this.state;
    const InsuranceProvidersMod = [...InsuranceProviders];
    if (
      patient.InsuranceProvider &&
      patient.InsuranceProvider.InsuranceProviderId &&
      patient.InsuranceProvider.Name &&
      getFirstObjByProp(InsuranceProviders, 'value', patient.InsuranceProvider.InsuranceProviderId) === false
    ) {
      InsuranceProvidersMod.push({
        value: patient.InsuranceProvider.InsuranceProviderId,
        text: patient.InsuranceProvider.Name,
      });
    }
    const genderIn = (this.state.patient !== undefined && this.state.patient.Gender !== undefined) ? this.state.patient.Gender : null;
    const gender = this.setGenderToRadiobutton(genderIn); // eslint-disable-line
    const now = new Date();
    const nowDate = (+now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear(); // eslint-disable-line
    return (
      <AddPatient
        closeModal={this.props.closeModal}
        submitBtnText={this.props.submitBtnText}
        patient={patient}
        gender={gender}
        nowDate={nowDate}
        countryCodes={countryCodes}
        relativeTypes={relativeTypes}
        InsuranceProviders={InsuranceProvidersMod}
        onChangeGender={this.onChangeGender}
        onChangeRelativeType={this.onChangeRelativeType}
        onChangePhonePrefix={this.onChangePhonePrefix}
        onChangeInsurance={this.onChangeInsurance}
        onChangeBirthDate={this.onChangeBirthDate}
        setGenderToState={this.setGenderToState}
        setDataPatientName={this.setDataPatientName}
        setDataMobilePhone={this.setDataMobilePhone}
        setDataPatientID={this.setDataPatientID}
        setDataRelativeName={this.setDataRelativeName}
        setGenderToRadiobutton={this.setGenderToRadiobutton}
        submitForm={this.submitForm}
      />
    );
  }
}

AddPatientContainer.propTypes = {
  patient: PropTypes.shape({
    PatientKey: PropTypes.string,
    FullName: PropTypes.string,
    Gender: PropTypes.bool,
    CountryCode: PropTypes.string,
    MobilePhone: PropTypes.string,
    BirthDate: PropTypes.string,
    Identifier: PropTypes.string,
    InsuranceProvider: PropTypes.object,
    relativeType: PropTypes.string,
    RelativeName: PropTypes.string,
  }),
  closeModal: PropTypes.func,
  submitBtnText: PropTypes.string,
  submitForm: PropTypes.func,
  countryCodes: PropTypes.arrayOf(PropTypes.object),
  relativeTypes: PropTypes.arrayOf(PropTypes.object),
  InsuranceProviders: PropTypes.arrayOf(PropTypes.object),
};

AddPatientContainer.defaultProps = {
  countryCodes: [
    {
      text: '+20',
      value: '+20',
    },
  ],
  relativeTypes: [
    {
      text: 'father',
      value: 'father',
    },
    {
      text: 'mother',
      value: 'mother',
    },

  ],
  InsuranceProviders: [
    {
      text: 'Bupa Egypt Insurance',
      value: '2',
    },
    {
      text: 'InsuranceProvider3',
      value: 'InsuranceProvider3',
    },
    {
      text: 'InsuranceProvider4',
      value: 'InsuranceProvider4',
    },
    {
      text: 'InsuranceProvider5',
      value: 'InsuranceProvider5',
    },
  ],
  patient: {
    PatientKey: '',
    FullName: '',
    Gender: null,
    CountryCode: '',
    MobilePhone: '',
    BirthDate: '',
    Identifier: '',
    InsuranceProvider: null,
    relativeType: '',
    RelativeName: '',
  },
};

// const mapStateToProps = (state) => ({
//   // patient: state.patients.currentPatient,
// });
//
// const mapDispatchToProps = (dispatch) => bindActionCreators({
//
// }, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(AddPatientContainer);
export default AddPatientContainer;

// patient: {
//   PatientKey: this.props.patient.PatientKey || '',
//   FullName: this.props.patient.FullName || '',
//   Gender: this.props.patient.Gender || null,
//   CountryCode: this.props.patient.CountryCode || '',
//   MobilePhone: this.props.patient.MobilePhone || '',
//   BirthDate: this.props.patient.BirthDate || '',
//   Identifier: this.props.patient.Identifier || '',
//   InsuranceProvider: this.props.patient.InsuranceProvider || '',
//   relativeType: this.props.patient.relativeType || '',
//   RelativeName: this.props.patient.RelativeName || '',
// },
