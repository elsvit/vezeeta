import { PATIENTS } from '../actions/patients';

const defaultState = {
  loaded: false,
  loading: false,
  currentPatient: {},
  searchedList: [],
  addPatientSaved: false,
  addPatientSaving: false,
  editPatientSaved: false,
  editPatientSaving: false,
  deletePatientSaved: false,
  deletePatientSaving: false,
  Patients: [
    // {
    //   FullName: ' AAA',
    //   MobilePhone: '01115154723',
    //   CountryCode: '+20',
    //   Address: null,
    //   PatientKey: 'PATb9afd6283610e810',
    //   Gender: false,
    //   BirthDate: '2016-11-07T00:00:00',
    //   Identifier: null,
    //   InsuranceProviderKey: null,
    //   HomeNumber: null,
    //   Notes: null,
    //   RelativeName: null,
    //   PatientRelativeId: 0,
    //   EmailAddress: null,
    //   CountryIsoCode: 'EG',
    //   InsuranceProvider: null,
    //   IsDeleted: null,
    //   PatientId: 0,
    //   InsuranceProviderId: null,
    // },
    // {
    //   FullName: 'BBB',
    //   MobilePhone: '01001393442',
    //   CountryCode: '+20',
    //   Address: null,
    //   PatientKey: 'PAT203cbbbc54e999b7',
    //   Gender: false,
    //   BirthDate: null,
    //   Identifier: '',
    //   InsuranceProviderKey: 'ins68a92',
    //   HomeNumber: null,
    //   Notes: null,
    //   RelativeName: null,
    //   PatientRelativeId: 1,
    //   EmailAddress: null,
    //   CountryIsoCode: 'EG',
    //   InsuranceProvider: {
    //     InsuranceProviderId: 2,
    //     Name: 'Bupa Egypt Insurance',
    //     NameArabic: 'شركة بوبا للتأمين',
    //     DisplayOrder: 0,
    //     InsuranceKey: 'ins68a92',
    //   },
    //   IsDeleted: null,
    //   PatientId: 0,
    //   InsuranceProviderId: null,
    // },
  ],
  textForSearch: '',
};

export default (state = defaultState, { type, ...action }) => {
  switch (type) {
  case PATIENTS.FETCH_PATIENT_DONE:
    return Object.assign({}, state, { currentPatient: action.patient });
  case PATIENTS.SEARCH_PATIENTS_DONE:
    return Object.assign({}, state, { searchedList: action.patients });
  case PATIENTS.LOAD:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case PATIENTS.LOAD_DONE:
    return Object.assign({}, state, {
      Patients: action.patients,
      loaded: true,
      loading: false,
    });
  case PATIENTS.LOAD_FAIL:
    return Object.assign({}, state, { loaded: false, loading: false });
  case PATIENTS.ADD_PATIENT:
    return Object.assign(
      {},
      state,
      { addPatientSaved: false },
      { addloading: true },
    );
  case PATIENTS.ADD_PATIENT_DONE: {
    const newState = { ...state };
    newState.Patients.push(action.patient);
    return Object.assign({}, newState, {
      addPatientSaved: true,
      addPatientSaving: false,
    });
  }
  case PATIENTS.ADD_PATIENT_FAIL:
    return Object.assign({}, state, {
      addPatientSaved: false,
      addPatientSaving: false,
    });
  case PATIENTS.EDIT_PATIENT:
    return Object.assign(
      {},
      state,
      { editPatientSaved: false },
      { editPatientSaving: true },
    );
  case PATIENTS.EDIT_PATIENT_DONE: {
    const patientKey = action.patient.PatientKey;
    const patients = state.Patients;
    const newState = { ...state };
    const patientsLen = patients.length;
    let check = true;
    let i = 0;
    while (i < patientsLen && check) {
      if (patients[i].PatientKey === patientKey) {
        patients[i] = { ...action.patient };
        check = false;
      }
      i += 1;
    }
    return Object.assign({}, newState, {
      editPatientSaved: true,
      editPatientSaving: false,
    });
  }
  case PATIENTS.EDIT_PATIENT_FAIL:
    return Object.assign({}, state, {
      editPatientSaved: false,
      editPatientSaving: false,
    });
  case PATIENTS.DELETE_PATIENT:
    return Object.assign(
      {},
      state,
      { deletePatientSaved: false },
      { deletePatientSaving: true },
    );
  case PATIENTS.DELETE_PATIENT_DONE: {
    if (action.patientKey) {
      const newState = {};
      const arrKeyObj = Object.keys(state);
      const len = arrKeyObj.length;
      for (let i = 0; i < len; i += 1) {
        const key = arrKeyObj[i];
        if (key !== 'Patients') {
          newState[key] = { ...state.key };
        } else {
          newState.Patients = state.Patients.filter((patient) => patient.PatientKey !== action.patientKey);
        }
      }
      return Object.assign({}, newState, {
        deletePatientSaved: true,
        deletePatientSaving: false,
      });
    }
    return state;
  }
  case PATIENTS.DELETE_PATIENT_FAIL:
    return Object.assign({}, state, {
      deletePatientSaved: false,
      deletePatientSaving: false,
    });
  default:
    return state;
  }
};
