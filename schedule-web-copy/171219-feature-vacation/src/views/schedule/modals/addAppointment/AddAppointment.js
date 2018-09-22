import React from 'react';
import PropTypes from 'prop-types';
import {
  GhostButton,
  Button,
  ComboBox,
  InputField,
  RadioButton,
  DateInput,
  TimeInput,
} from '@vezeeta/web-components';
import { Validation } from '@vezeeta/web-utils';

import {
  getVisitTypesOptions,
  getCountryCodeOptions,
  getInsuranceOptions,
  getRelativesOptions,
  getBranchesOptions,
} from '../../../utils/ComboBox';
import getGenderOptions from '../../../utils/RadioButton';
import { PHONE_NUMBER_LENGTH, GENDER_TYPES } from '../../../Constants';
import PatientSearchContainer from '../../PatientSearchContainer';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line
import './AddAppointment.scss';

const AddAppointment = (props) => (
  <div className="add-appointment-container">
    <div className="patient-info-container add-patient-info-container">
      <div className="modal-section-title">
        <span>Patient Info</span>
      </div>
      <div className="modal-section-content">
        <div className="combo-row-container">
          <InputField
            type="text"
            placeholder="Patient Name"
            onBlur={(val) => props.changeField('patientName', val)}
            className="input-required"
            isRequired
          />
          <div className="gender-radio-container">
            <span>Gender</span>
            <RadioButton
              options={getGenderOptions()}
              listAlignment="flex-row"
              selected={GENDER_TYPES.MALE}
              onChange={(val) => props.changeField('patientGender', val)}
            />
          </div>
        </div>
        <div className="combo-row-container phone-number-combo-row">
          <ComboBox
            placeholder="Code"
            items={getCountryCodeOptions(props.countries)}
            selectFirst={
              !props.patientCountryCode && props.countries.length > 0
            }
            onChange={(val) => props.changeField('patientCountryCode', val)}
          />
          <InputField
            type="text"
            placeholder="Patient Mobile Number"
            onBlur={(val) => props.changeField('patientPhoneNumber', val)}
            className="input-required"
            maxLength={PHONE_NUMBER_LENGTH}
            validationChecks={Validation.phoneNumber}
            isRequired
          />
        </div>
        <div className="combo-row-container">
          <DateInput
            placeholder="Birth Date"
            onChange={(val) => props.changeField('patientBirthDate', val.date)}
            dateFormat="mm/dd/yyyy"
          />
          <InputField
            type="text"
            placeholder="Patient ID"
            onBlur={(val) => props.changeField('patientId', val)}
          />
        </div>
        <ComboBox
          placeholder="Select Insurance"
          className="add-patient-insurance"
          items={getInsuranceOptions()}
          onChange={(val) => props.changeField('patientInsurance', val)}
          hideErrorMessage
        />
        <div className="combo-row-container">
          <ComboBox
            placeholder="Relative"
            items={getRelativesOptions()}
            onChange={(val) => props.changeField('patientRelative', val)}
            hideErrorMessage
          />
          <InputField
            type="text"
            placeholder="Relative Name"
            onBlur={(val) => props.changeField('patientRelativeName', val)}
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
            onChange={(val) => props.changeField('patientKey', val)}
          />
        </div>
        <ComboBox
          placeholder="Select a branch"
          items={getBranchesOptions(props.branches)}
          onChange={(val) => props.changeField('branch', val)}
          hideErrorMessage
        />
        <ComboBox
          placeholder="Type of examination"
          items={getVisitTypesOptions()}
          onChange={(val) => props.changeField('visitType', val)}
        />
        <div className="combo-row-container">
          <DateInput
            placeholder="Date"
            onChange={(val) => props.changeField('appointmentDate', val.date)}
            dateFormat="mm/dd/yyyy"
            showCalendar={false}
          />
          <TimeInput
            placeholder="Time"
            timeFormat={24}
            select="12:00:00"
            onChange={(val) => props.changeField('appointmentTime', val)}
            noIcon={false}
          />
        </div>
        <InputField
          type="text"
          placeholder="Notes"
          onBlur={(val) => props.changeField('notes', val)}
        />
        <p className="add-appointment-error">{props.error}</p>
      </div>
    </div>
    <div className="modal-buttons-container">
      <GhostButton onClick={props.closeModal} onKeyDown={props.closeModal}>
        Cancel
      </GhostButton>
      <Button
        onClick={props.createAppointment}
        isLoading={props.isCreatePending}
      >
        Add Reservation
      </Button>
    </div>
  </div>
);

AddAppointment.propTypes = {
  closeModal: PropTypes.func.isRequired,
  changeField: PropTypes.func,
  createAppointment: PropTypes.func,
  countries: PropTypes.array,
  branches: PropTypes.array,
  isCreatePending: PropTypes.bool,
  error: PropTypes.string,
  patientCountryCode: PropTypes.string,
};

export default AddAppointment;
