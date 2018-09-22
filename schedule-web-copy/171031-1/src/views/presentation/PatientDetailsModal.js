import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './PatientDetailsModal.scss';
import noShow from '../../assets/images/no_show.jpg';
import checkIn from '../../assets/images/check_in.jpg';
import LabelWithIcon from '../../components/buttons/labelWithIcon/LabelWithIcon';

class PatientDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.getPatientPhone = this.getPatientPhone.bind(this);
    this.getPatientInsurance = this.getPatientInsurance.bind(this);
    this.getPatientIdentifier = this.getPatientIdentifier.bind(this);
    this.getPatientReservations = this.getPatientReservations.bind(this);
  }

  getPatientPhone() {
    if (this.props.patientPhone) {
      return (
        <div>
          <LabelWithIcon>
            <span className="fs-16">{this.props.patientPhone}</span>
          </LabelWithIcon>
        </div>
      );
    }
    return <div />;
  }

  getPatientInsurance() {
    if (this.props.patientInsurance) {
      return (
        <div>
          <LabelWithIcon>
            <span className="fs-16">{this.props.patientInsurance}</span>
          </LabelWithIcon>
        </div>
      );
    }
    return <div />;
  }

  getPatientIdentifier() {
    if (this.props.patientId) {
      return (
        <div>
          <LabelWithIcon>
            <span className="fs-16">{this.props.patientId}</span>
          </LabelWithIcon>
        </div>
      );
    }
    return <div />;
  }

  getPatientReservations() {
    let reservations = [];

    for (let i = 0; i < this.props.reservations.length; i++) {
      let reservation = this.props.reservations[i];
      let reservationTime = `${reservation.appointmentStart}-${reservation.appointmentEnd}`;
      reservations.push(
        <div>
          <div className="row pat-res">
            <div className="col-xs-3">
              <span className="block">{reservation.doctorName}</span>
              <span className="block">{reservation.branchName}</span>
            </div>
            <div className="col-xs-5">
              <span className="block">{reservationTime}</span>
              <span className="block">{reservation.roomName}</span>
            </div>
            <div className="col-xs-4">
              <img src={checkIn} />
              <img src={noShow} />
            </div>
          </div>
          <hr className="separator" />
        </div>
      );
    }

    return reservations;
  }

  render() {
    let patientPhone = this.getPatientPhone();
    let patientInsurance = this.getPatientInsurance();
    let patientIdentifier = this.getPatientIdentifier();
    let reservations = this.getPatientReservations();
    let patientInfo =
      this.props.patientAge &&
      this.props.patientGender &&
      `${this.props.patientAge}-${this.props.patientGender}`;

    return (
      <div className="modal">
        <Modal isOpen={this.props.openPatientDetailsModal}>
          <span className="fs-18 grey-text bold">Patient Info</span>
          <hr className="separator" />
          <span className="block bold fs-18 grey-text">
            {this.props.patientName}
          </span>
          <span className="block fs-16">{patientInfo}</span>
          <div className="h10" />

          {patientPhone}

          <div className="h10" />

          {patientInsurance}

          <div className="h10" />

          {patientIdentifier}

          <div className="h10" />

          <div className="row patient-reservations-header">
            <div className="col-xs-12">
              <span className="block fs-18 bold grey-text">
                Patient Reservations
              </span>
            </div>
          </div>
          <div>{reservations}</div>
        </Modal>
      </div>
    );
  }
}

PatientDetailsModal.propTypes = {
  openPatientDetailsModal: PropTypes.bool.isRequired,
  patientName: PropTypes.string,
  patientAge: PropTypes.string,
  patientGender: PropTypes.string,
  patientPhone: PropTypes.string,
  patientInsurance: PropTypes.string,
  patientId: PropTypes.string,
  reservations: PropTypes.array.isRequired
};

export default PatientDetailsModal;
