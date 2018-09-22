import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  RadioButton,
  Button,
  GhostButton,
  Icon,
  InputField,
  DateInput,
} from '@vezeeta/web-components';

import Select from '../../select/Select';
import './AddPatient.scss';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

const setGenderComponents = () => {
  const result = [];
  result.push(<div>
    <Icon
      key={result.length}
      name="male"
      width={25}
      height={35}
      color={Colors.helperGrey}
    />
  </div>);// eslint-disable-line
  result.push(<div>
    <Icon
      key={result.length}
      name="female"
      width={25}
      height={35}
      color={Colors.helperGrey}
    />
  </div>); // eslint-disable-line
  return result;
};

const AddPatient = (props) => (
  <div className="add-patient-info-container">
    <div className="add-patient-row flex-block">
      <div className="width-5">
        <div className="patients-add-patient-subblock">
          <InputField
            className="fs-18 grey-text bold patients-add-patient-input"
            placeholder="Patient Name *"
            type="text"
            name="fullName"
            setData={props.setDataPatientName}
            value={props.patient.FullName}
            isRequired={!false}
          />
        </div>
      </div>
      <div className="width-1">
        <div className="patients-add-patient-subblock">
          <Text className="fs-18-imp grey-text bold">
            Gender
          </Text>
        </div>
      </div>
      <div className="width-4">
        <div className="patients-add-patient-subblock">
          <RadioButton
            key="addParientGender"
            className="patients-add-patient-Gender-radiobuttons"
            selected={props.gender}
            options={[
              {
                value: 'AddMale',
                name: 'AddPatientGender',
                component: setGenderComponents()[0],
              },
              {
                value: 'AddFemale',
                name: 'AddPatientGender',
                component: setGenderComponents()[1],
              },
            ]}
            listAlignment="flex-row"
            onChange={(val) => props.onChangeGender(val)}
          />
        </div>
      </div>
    </div>

    <div className="add-patient-row">
      <div className="width-2">
        <div className="patients-add-patient-subblock select-block">
          <Select
            className="fs-18 grey-text bold patients-add-patient-input"
            options={props.countryCodes}
            onChange={props.onChangePhonePrefix}
            selectedValue={props.patient.CountryCode}
          />
        </div>
      </div>
      <div className="width-8">
        <div className="patients-add-patient-subblock">
          <InputField
            className="fs-18 grey-text bold patients-add-patient-input"
            placeholder="Patient Mobile Number *"
            setData={props.setDataMobilePhone}
            value={props.patient.MobilePhone}
            type="text"
            isRequired={!false}
          />
        </div>
      </div>
    </div>

    <div className="add-patient-row">
      <div className="width-5">
        <div className="patients-add-patient-subblock-datainput">
          <DateInput
            className="bold fs-16 grey-text"
            placeholder="Birth Date"
            onChange={props.onChangeBirthDate}
            minDate="01/01/1888"
            maxDate={props.nowDate}
            date={props.patient.BirthDate}
            label=""
          />
        </div>
      </div>
      <div className="width-5">
        <div className="patients-add-patient-subblock">
          <InputField
            className="fs-18 grey-text bold patients-add-patient-input"
            placeholder="Patient ID"
            setData={props.setDataPatientID}
            value={props.patient.Identifier}
            type="text"
            isRequired={false}
          />
        </div>
      </div>
    </div>

    <div className="add-patient-row">
      <div className="patients-add-patient-subblock">
        <Select
          className="fs-18 grey-text bold patients-add-patient-input"
          placeholder="Select Insurance"
          options={props.InsuranceProviders}
          onChange={props.onChangeInsurance}
          selectedValue={props.patient.InsuranceProvider.InsuranceProviderId}
        />
      </div>
    </div>

    <div className="add-patient-row">
      <div className="width-5">
        <div className="patients-add-patient-subblock select-block">
          <Select
            className="fs-18 grey-text bold patients-add-patient-input"
            options={props.relativeTypes}
            onChange={props.onChangeRelativeType}
            selectedValue={props.patient.relativeType}
          />
        </div>
      </div>
      <div className="width-5">
        <div className="patients-add-patient-subblock">
          <InputField
            className="fs-18 grey-text bold patients-add-patient-input"
            placeholder="Relative Name"
            setData={props.setDataRelativeName}
            value={props.patient.RelativeName}
            type="text"
            isRequired={false}
          />
        </div>
      </div>
    </div>

    <div className="add-patient-buttons">
      <GhostButton
        className="fs-18"
        onClick={props.closeModal}
      >
        Cancel
      </GhostButton>
      <Button
        className="fs-18"
        onClick={props.submitForm}
      >
        {props.submitBtnText}
      </Button>
    </div>
  </div>
);

AddPatient.propTypes = {
  // isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  // title: PropTypes.string,
  submitBtnText: PropTypes.string,
  submitForm: PropTypes.func,
  patient: PropTypes.shape({
    FullName: PropTypes.string,
    Gender: PropTypes.any,
    CountryCode: PropTypes.string,
    MobilePhone: PropTypes.string,
    BirthDate: PropTypes.string,
    Identifier: PropTypes.string,
    InsuranceProvider: PropTypes.object,
    relativeType: PropTypes.string,
    RelativeName: PropTypes.string,
  }),
  gender: PropTypes.string,
  nowDate: PropTypes.string,
  countryCodes: PropTypes.array,
  relativeTypes: PropTypes.array,
  InsuranceProviders: PropTypes.array,
  setDataPatientName: PropTypes.func, // eslint-disable-line
  setDataMobilePhone: PropTypes.func, // eslint-disable-line
  setDataPatientID: PropTypes.func, // eslint-disable-line
  setDataRelativeName: PropTypes.func, // eslint-disable-line
  onChangeGender: PropTypes.func,
  onChangePhonePrefix: PropTypes.func,
  onChangeRelativeType: PropTypes.func,
  onChangeInsurance: PropTypes.func,
  onChangeBirthDate: PropTypes.func,
};

export default AddPatient;
