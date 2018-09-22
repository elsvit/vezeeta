import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddAppointment from './AddAppointment';
import { GENDER_TYPES } from '../../../Constants';
import { createAppointment } from '../../../../store/actions/appointments';

class AddAppointmentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientKey: null,
      visitType: '',
      appointmentDate: '',
      appointmentTime: '',
      notes: '',
      patientName: '',
      patientGender: GENDER_TYPES.MALE,
      patientCountryCode: '',
      patientPhoneNumber: '',
      patientBirthDate: '',
      patientId: '',
      patientInsurance: '',
      patientRelative: null,
      patientRelativeName: '',
      error: '',
    };
  }

  getPatientData = () => ({
    FullName: this.state.patientName,
    MobilePhone: this.state.patientPhoneNumber,
    CountryCode: this.state.patientCountryCode,
    Gender: GENDER_TYPES.FEMALE === this.state.patientGender ? 'false' : 'true',
    BirthDate: this.state.patientBirthDate,
    Identifier: this.state.patientId,
    Relative: this.state.patientRelative,
    InsuranceProvider: this.state.patientInsurance,
    RelativeName: this.state.patientRelativeName,
    InsuranceProviderKey: 'ins68a92EG',
  });

  setError = () => {
    const { patientKey } = this.state;
    const appointmentDataValid = this.appointmentDataValid();
    const patientDataValid = this.patientDataValid();
    let error = '';

    if (!patientKey && !patientDataValid) {
      error = 'Please select a patient or create a new one';
    } else if (!appointmentDataValid) {
      error = 'Please select appointment type, date and time';
    } else if (!patientDataValid) {
      error =
        'Please provide patient name, country code, phone number and relative name if relative is chosen';
    }

    if (error !== this.state.error) {
      this.setState({ error });
    }
  };

  changeField = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  appointmentDataValid = () => {
    const { visitType, appointmentDate, appointmentTime } = this.state;

    return !!visitType && !!appointmentDate && !!appointmentTime;
  };

  patientDataValid = () => {
    const {
      patientName,
      patientCountryCode,
      patientPhoneNumber,
      patientRelative,
      patientRelativeName,
    } = this.state;
    const PHONE_NUMBER_LENGTH = 11;

    return (
      !!patientName &&
      !!patientCountryCode &&
      (patientPhoneNumber &&
        patientPhoneNumber.length === PHONE_NUMBER_LENGTH) &&
      (!patientRelative || (!!patientRelative && !!patientRelativeName))
    );
  };

  formDataValid = () => {
    const { patientKey } = this.state;
    const appointmentDataValid = this.appointmentDataValid();
    const patientDataValid = this.patientDataValid();

    return appointmentDataValid && (!!patientKey || patientDataValid);
  };

  createAppointment = () => {
    if (this.formDataValid()) {
      const appointmentData = {
        ReservationSource: 'DoctorsApp',
        ActionMaker: 'Doctor',
        ReservationDate: `${this.state.appointmentDate} ${
          this.state.appointmentTime
        }`,
        InsuranceKey: 'inscda5dEG',
        Notes: this.state.notes,
        VisitType: this.state.visitType,
        SendReminderMessage: 0,
        AccountKey: 'accb6abfc111246987f',
        RoomKey: 'roomb68855803d2a1625',
        PatientKey: this.state.patientKey,
      };
      const patientData = this.getPatientData();

      this.props.createAppointment(appointmentData, patientData);
    } else {
      this.setError();
    }
  };

  render() {
    return (
      <AddAppointment
        closeModal={this.props.closeModal}
        addNewPatient={this.state.addNewPatient}
        changeField={this.changeField}
        createAppointment={this.createAppointment}
        patientGender={this.state.patientGender}
        error={this.state.error}
      />
    );
  }
}

AddAppointmentContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  createAppointment: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createAppointment: (appointmentData, patientData) =>
    dispatch(createAppointment(appointmentData, patientData)),
});

export default connect(null, mapDispatchToProps)(AddAppointmentContainer);
