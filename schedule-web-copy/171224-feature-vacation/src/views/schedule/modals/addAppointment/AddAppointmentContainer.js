import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Validation } from '@vezeeta/web-utils';

import AddAppointment from './AddAppointment';
import {
  GENDER_TYPES,
  PHONE_NUMBER_LENGTH,
  GENDER_API_VALUES,
} from '../../../Constants';
import { createAppointment } from '../../../../store/actions/appointments';
import { loadCountry } from '../../../../store/actions/country';
import ClinicsUtils from '../../../utils/Clinics';

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
      error: null,
    };
  }

  componentDidMount() {
    this.props.loadCountry();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isCreateSuccess && this.props.isCreateSuccess) {
      this.props.closeModal();
      this.props.fetchAppointments();
    }
  }

  getPatientData = () => ({
    FullName: this.state.patientName,
    MobilePhone: this.state.patientPhoneNumber,
    CountryCode: this.state.patientCountryCode,
    Gender: GENDER_API_VALUES[this.state.patientGender],
    BirthDate: this.state.patientBirthDate,
    Identifier: this.state.patientId,
    Relative: this.state.patientRelative,
    InsuranceProvider: this.state.patientInsurance,
    RelativeName: this.state.patientRelativeName,
    InsuranceProviderKey: 'ins68a92EG',
  });

  validateFormData = () => {
    const { patientKey } = this.state;
    const appointmentDataValid = this.appointmentDataValid();
    const patientDataValid = this.patientDataValid();
    let error = null;

    if (!patientKey && !patientDataValid) {
      error =
        'Please select a patient or provide new patient name, country code, phone number and relative name if relative is chosen';
    } else if (!appointmentDataValid) {
      error = 'Please select appointment type, date and time';
    }

    if (error !== this.state.error) {
      this.setState({ error });
    }

    return !error;
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

    return (
      !!patientName &&
      !!patientCountryCode &&
      (patientPhoneNumber &&
        patientPhoneNumber.length === PHONE_NUMBER_LENGTH &&
        Validation.phoneNumber[0].regex.test(patientPhoneNumber)) &&
      (!patientRelative || (!!patientRelative && !!patientRelativeName))
    );
  };

  createAppointment = () => {
    if (this.validateFormData()) {
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
        AccountKey: 'accce33b414282cdd81',
        RoomKey: 'room87ff2192fc7bf7c8',
        PatientKey: this.state.patientKey,
      };
      const patientData = this.getPatientData();

      this.props.createAppointment(appointmentData, patientData);
    }
  };

  render() {
    const clinicsData = ClinicsUtils.flattenClinics(this.props.clinics);
    return (
      <AddAppointment
        closeModal={this.props.closeModal}
        addNewPatient={this.state.addNewPatient}
        changeField={this.changeField}
        createAppointment={this.createAppointment}
        patientCountryCode={this.state.patientCountryCode}
        patientGender={this.state.patientGender}
        countries={this.props.countries}
        branches={clinicsData.branches}
        isCreatePending={this.props.isCreatePending}
        error={this.state.error || this.props.error}
      />
    );
  }
}

AddAppointmentContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  createAppointment: PropTypes.func,
  loadCountry: PropTypes.func,
  countries: PropTypes.array,
  clinics: PropTypes.array,
  isCreatePending: PropTypes.bool,
  isCreateSuccess: PropTypes.bool,
  error: PropTypes.string,
  fetchAppointments: PropTypes.func,
};

const mapStateToProps = (state) => ({
  countries: state.country.Countries,
  clinics: state.clinics.list,
  isCreatePending: state.appointments.form.pending,
  isCreateSuccess: state.appointments.form.success,
  error: state.appointments.form.error,
});

const mapDispatchToProps = (dispatch) => ({
  createAppointment: (appointmentData, patientData) =>
    dispatch(createAppointment(appointmentData, patientData)),
  loadCountry: () => dispatch(loadCountry()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointmentContainer);
