/* eslint-disable */

import { PATIENT } from '../actions/patient';

const initialState = {
  id: '',
  name: 'Ahmed Sadik Shirin',
  age: '35',
  gender: 'Male',
  phoneNumber: '0102245488',
  insuranceProvider: 'MedRight',
  insuranceId: '',
  insuranceKey: '005GJDD',
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case PATIENT.FETCH_SUCCESS:
      return {
        ...state,
        id: payload.patient.PatientId,
        name: payload.patient.FullName,
        age: payload.patient.PatientAge,
        gender: payload.patient.Gender,
        phoneNumber: payload.patient.MobilePhone,
        insuranceProvider: payload.patient.InsuranceProvider,
        insuranceKey: payload.patient.InsuranceProviderKey,
        insuranceId: payload.patient.InsuranceProviderId,
      };
    default:
      return state;
  }
};
