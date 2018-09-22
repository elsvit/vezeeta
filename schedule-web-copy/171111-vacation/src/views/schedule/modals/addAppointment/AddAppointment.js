import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GhostButton,
  Button,
  Icon,
  ComboBox,
  InputField,
  RadioButton,
  DateInput,
} from '@vezeeta/web-components';

import {
  getVisitTypesOptions,
  getSelectTimeOptions,
  getCountryCodeOptions,
  getInsuranceOptions,
  getRelativesOptions,
} from '../../../utils/ComboBox';
import { GENDER_TYPES } from '../../../Constants';
import PatientSearchContainer from '../../PatientSearchContainer';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line
import './AddAppointment.scss';

class AddAppointment extends Component {
  getGenderOptions = () => [
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
  ];

  SearchPatientContent = () => (
    <div className="modal-section-content">
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

  render() {
    return (
      <div className="add-appointment-container">
        <div className="patient-info-container add-patient-info-container">
          <div className="modal-section-title">
            <span>Patient Info</span>
          </div>
          <div className="modal-section-content">
            <div className="combo-row-container">
              <InputField
                placeholder="Patient Name &#42;"
                setData={(val) => this.props.changeField('patientName', val)}
                className="input-required"
              />
              <div className="gender-radio-container">
                <span>Gender</span>
                <RadioButton
                  options={this.getGenderOptions()}
                  listAlignment="flex-row"
                  selected={this.props.patientGender}
                  onChange={(val) => this.props.changeField('patientGender', val)}
                />
              </div>
            </div>
            <div className="combo-row-container phone-number-combo-row">
              <ComboBox
                placeholder="Code"
                items={getCountryCodeOptions()}
                onChange={(val) =>
                  this.props.changeField('patientCountryCode', val)
                }
              />
              <InputField
                placeholder="Patient Mobile Number"
                setData={(val) =>
                  this.props.changeField('patientPhoneNumber', val)
                }
                className="input-required"
              />
            </div>
            <div className="combo-row-container">
              <DateInput
                placeholder="Birth Date"
                onChange={(val) =>
                  this.props.changeField('patientBirthDate', val.date)
                }
                dateFormat="mm/dd/yyyy"
              />
              <InputField
                placeholder="Patient ID"
                setData={(val) => this.props.changeField('patientId', val)}
              />
            </div>
            <ComboBox
              placeholder="Select Insurance"
              className="add-patient-insurance"
              items={getInsuranceOptions()}
              onChange={(val) => this.props.changeField('patientInsurance', val)}
            />
            <div className="combo-row-container">
              <ComboBox
                placeholder="Relative"
                items={getRelativesOptions()}
                onChange={(val) => this.props.changeField('patientRelative', val)}
              />
              <InputField
                placeholder="Relative Name"
                setData={(val) =>
                  this.props.changeField('patientRelativeName', val)
                }
              />
            </div>
          </div>
        </div>
        <div className="add-appointment-info-container">
          <div className="modal-section-title">
            <span>Reservation Info</span>
          </div>
          <div className="modal-section-content">
            <div className="add-patient-search-container">
              <PatientSearchContainer
                onChange={(val) => this.props.changeField('patientKey', val)}
              />
            </div>
            <ComboBox
              placeholder="Type of examination"
              items={getVisitTypesOptions()}
              onChange={(val) => this.props.changeField('visitType', val)}
            />
            <div className="combo-row-container">
              <DateInput
                placeholder="Date"
                onChange={(val) =>
                  this.props.changeField('appointmentDate', val.date)
                }
                dateFormat="mm/dd/yyyy"
                showCalendar={false}
              />
              <ComboBox
                placeholder="Time"
                items={getSelectTimeOptions()}
                onChange={(val) => this.props.changeField('appointmentTime', val)}
              />
            </div>
            <InputField
              placeholder="Notes"
              setData={(val) => this.props.changeField('notes', val)}
            />
            <p className="add-appointment-error">{this.props.error}</p>
          </div>
        </div>
        <div className="modal-buttons-container">
          <GhostButton
            onClick={this.props.closeModal}
            onKeyDown={this.props.closeModal}
          >
            Cancel
          </GhostButton>
          <Button onClick={this.props.createAppointment}>
            Add Reservation
          </Button>
        </div>
      </div>
    );
  }
}

AddAppointment.propTypes = {
  closeModal: PropTypes.func.isRequired,
  changeField: PropTypes.func,
  createAppointment: PropTypes.func,
  patientGender: PropTypes.string,
  error: PropTypes.string,
};

export default AddAppointment;
