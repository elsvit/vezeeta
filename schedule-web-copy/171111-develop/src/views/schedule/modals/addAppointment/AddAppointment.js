import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  GhostButton,
  Button,
  Icon,
  ComboBox,
  InputField,
  RadioButton,
} from '@vezeeta/web-components';

import ModalWrapper from '../ModalWrapper';
import { GENDER_TYPES } from '../../../Constants';
import PatientSearchContainer from '../../PatientSearchContainer';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line
import './AddAppointment.scss';

class AddAppointment extends Component {
  addNewPatient = () => this.props.changeField('addNewPatient', true);

  goBack = () => this.props.changeField('addNewPatient', false);

  SearchPatientContent = () => (
    <div className="modal-section-content">
      <PatientSearchContainer />
      <div className="add-patient-container">
        <div
          className="add-patient-icon pointer"
          onClick={this.addNewPatient}
          onKeyDown={this.addNewPatient}
        >
          <Icon name="plus" height="19" color={Colors.blueTwo} />
        </div>
        <GhostButton
          onClick={this.addNewPatient}
          onKeyDown={this.addNewPatient}
        >
          New Patient
        </GhostButton>
      </div>
    </div>
  );

  AddPatientContent = () => (
    <div className="modal-section-content">
      <div className="combo-row-container">
        <InputField placeholder="Patient Name" />
        <div className="gender-radio-container">
          <span>Gender</span>
          <RadioButton
            options={[
              {
                name: GENDER_TYPES.MALE,
                value: GENDER_TYPES.MALE,
                component: (
                  <div>
                    <Icon name="male" height="40" />
                  </div>
                ),
              },
              {
                name: GENDER_TYPES.FEMALE,
                value: GENDER_TYPES.FEMALE,
                component: (
                  <div>
                    <Icon name="female" height="40" />
                  </div>
                ),
              },
            ]}
            listAlignment="flex-row"
            selected={GENDER_TYPES.MALE}
          />
        </div>
      </div>
      <div className="combo-row-container phone-number-combo-row">
        <ComboBox placeholder="CC" />
        <InputField placeholder="Patient Mobile Number" />
      </div>
      <div className="combo-row-container">
        <ComboBox placeholder="Birth Date" />
        <InputField placeholder="Patient ID" />
      </div>
      <ComboBox
        placeholder="Select Insurance"
        className="add-patient-insurance"
      />
      <div className="combo-row-container">
        <ComboBox placeholder="Relative" />
        <InputField placeholder="Relative Name" />
      </div>
    </div>
  );

  render() {
    return (
      <ModalWrapper
        isOpened={this.props.isOpened}
        goBack={this.props.addNewPatient && this.goBack}
        closeModal={this.props.closeModal}
        title={`Add Reservation ${this.props.addNewPatient
          ? 'New Patient'
          : ''}`}
        className="add-appointment-modal"
      >
        <div className="add-appointment-container">
          <div
            className={classnames('patient-info-container', {
              'add-patient-info-container': this.props.addNewPatient,
            })}
          >
            <div className="modal-section-title">
              <span>Patient Info</span>
            </div>
            {this.props.addNewPatient
              ? this.AddPatientContent()
              : this.SearchPatientContent()}
          </div>
          <div className="add-appointment-info-container">
            <div className="modal-section-title">
              <span>Reservation Info</span>
            </div>
            <div className="modal-section-content">
              <ComboBox placeholder="Type of examination" />
              <div className="combo-row-container">
                <ComboBox placeholder="Date" />
                <ComboBox placeholder="Time" />
              </div>
              <InputField placeholder="Notes" />
            </div>
          </div>
          <div className="modal-buttons-container">
            <GhostButton
              onClick={this.props.closeModal}
              onKeyDown={this.props.closeModal}
            >
              Cancel
            </GhostButton>
            <Button>Add Reservation</Button>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

AddAppointment.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addNewPatient: PropTypes.bool,
  changeField: PropTypes.func,
};

export default AddAppointment;
