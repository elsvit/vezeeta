import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from '../../components/apis/Api.js';
import config from '../../config';
import PatientDetailsModal from '../presentation/PatientDetailsModal';
import { genderTypes } from '../../constants';
import { getAppointmentStart, getAppointmentEnd } from '../../utils/helpers';

class PatientDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.apiWrapper = new Api();
    this.getPatientDetails = this.getPatientDetails.bind(this);
    this.getPatientReservations = this.getPatientReservations.bind(this);

    this.state = {
      patientName: null,
      patientAge: null,
      patientGender: null,
      patientPhone: null,
      patientInsurance: null,
      patientId: null,
      reservations: []
    };
  }

  async getPatientDetailsModalData() {
    let scheduleTypeId = 1; //Remove this
    let patient = await this.getPatientDetails();
    let reservations = await this.getPatientReservations();
    if (patient === undefined || reservations === undefined) return;

    for (let i = 0; i < reservations.length; i++) {
      reservations[i].doctorName = 'Ahmed Shirin'; //Remove this
      reservations[i].branchName = 'Branch 1'; //Remove this
      reservations[i].roomName = 'Room 1'; //Remove this

      reservations[i].appointmentStart = getAppointmentStart(
        scheduleTypeId,
        reservations[i]
      );

      reservations[i].appointmentEnd = getAppointmentEnd(
        scheduleTypeId,
        reservations[i]
      );
    }

    let gender = 'Male';

    if (patient.gender == genderTypes.female) {
      gender = 'Female';
    }

    if (patient.InsuranceProvider) {
      var insuranceProvider = patient.InsuranceProvider.Name;
    }

    this.setState({
      patientName: patient.FullName,
      patientAge: patient.PatientAge,
      patientPhone: patient.MobilePhone,
      patientId: patient.Identifier,
      patientInsurance: insuranceProvider,
      patientGender: gender,
      reservations: reservations
    });
  }

  async getPatientDetails() {
    if (!this.props.openPatientDetailsModal) return;

    return (await this.apiWrapper.get(
      `${config.cdoctorsApiHost}${config.getPatientByKeyUrl}?patientKey=${this
        .props.patientKey}`,
      [
        {
          key: 'ClinicKey',
          value: 'clnc8c1fff89af1dacc0'
        },
        {
          key: 'Authorization',
          value: '9913fb'
        },
        {
          key: 'Language',
          value: 'ar-EG'
        }
      ]
    )).data;
  }

  async getPatientReservations() {
    let scheduleTypeId = 1;
    if (!this.props.openPatientDetailsModal) return;

    return (await this.apiWrapper.get(
      `${config.scheduleApiHost}${config.getPatientReservationsUrl}?patientKey=${this
        .props.patientKey}&scheduleTypeId=${scheduleTypeId}`,
      [
        {
          key: 'ClinicKey',
          value: 'clnc8c1fff89af1dacc0'
        },
        {
          key: 'Authorization',
          value: '9913fb'
        },
        {
          key: 'Language',
          value: 'ar-EG'
        }
      ]
    )).data;
  }

  render() {
    if (!this.props.openPatientDetailsModal) return <div />;

    this.getPatientDetailsModalData();

    return (
      <PatientDetailsModal
        openPatientDetailsModal={this.props.openPatientDetailsModal}
        patientName={this.state.patientName}
        patientAge={this.state.patientAge}
        patientGender={this.state.patientGender}
        patientPhone={this.state.patientPhone}
        patientId={this.state.patientId}
        patientInsurance={this.state.patientInsurance}
        reservations={this.state.reservations}
      />
    );
  }
}

PatientDetailsContainer.propTypes = {
  openPatientDetailsModal: PropTypes.bool.isRequired,
  patientKey: PropTypes.string
};

export default PatientDetailsContainer;
