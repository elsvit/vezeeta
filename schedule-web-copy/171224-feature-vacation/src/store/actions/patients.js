export const PATIENTS = {
  LOAD: 'PATIENTS_LOAD',
  LOAD_DONE: 'PATIENTS_LOAD_DONE',
  LOAD_FAIL: 'PATIENTS_LOAD_FAIL',
  FETCH_PATIENT: 'FETCH_PATIENT',
  FETCH_PATIENT_DONE: 'FETCH_PATIENT_DONE',
  FETCH_PATIENT_FAIL: 'FETCH_PATIENT_FAIL',
  SEARCH_PATIENTS: 'SEARCH_PATIENTS',
  SEARCH_PATIENTS_DONE: 'SEARCH_PATIENTS_DONE',
  SEARCH_PATIENTS_FAIL: 'SEARCH_PATIENTS_FAIL',
  DELETE_PATIENT: 'DELETE_PATIENT',
  DELETE_PATIENT_DONE: 'DELETE_PATIENT_DONE',
  DELETE_PATIENT_FAIL: 'DELETE_PATIENT_FAIL',
  ADD_PATIENT: 'ADD_PATIENT',
  ADD_PATIENT_DONE: 'ADD_PATIENT_DONE',
  ADD_PATIENT_FAIL: 'ADD_PATIENT_FAIL',
  EDIT_PATIENT: 'EDIT_PATIENT',
  EDIT_PATIENT_DONE: 'EDIT_PATIENT_DONE',
  EDIT_PATIENT_FAIL: 'EDIT_PATIENT_FAIL',
};

export const loadPatients = () => ({
  type: PATIENTS.LOAD,
});

export const loadPatientsDone = (patients) => ({
  type: PATIENTS.LOAD_DONE,
  patients,
});

export const loadPatientsFail = (err) => ({
  type: PATIENTS.LOAD_FAIL,
  err,
});

export const fetchPatient = (patientKey) => ({
  type: PATIENTS.FETCH_PATIENT,
  patientKey,
});

export const searchPatients = (keyword) => ({
  type: PATIENTS.SEARCH_PATIENTS,
  keyword,
});

export const deletePatient = (patientKey) => ({
  type: PATIENTS.DELETE_PATIENT,
  patientKey,
});

export const deletePatientDone = (patientKey) => ({
  type: PATIENTS.DELETE_PATIENT_DONE,
  patientKey,
});

export const deletePatientFail = (err) => ({
  type: PATIENTS.DELETE_PATIENT_FAIL,
  err,
});

export const addPatient = (patient) => ({
  type: PATIENTS.ADD_PATIENT,
  patient,
});

export const addPatientDone = (patient) => ({
  type: PATIENTS.ADD_PATIENT_DONE,
  patient,
});

export const addPatientFail = (err) => ({
  type: PATIENTS.ADD_PATIENT_FAIL,
  err,
});

export const editPatient = (patient) => ({
  type: PATIENTS.EDIT_PATIENT,
  patient,
});

export const editPatientDone = (patient) => ({
  type: PATIENTS.EDIT_PATIENT_DONE,
  patient,
});

export const editPatientFail = (err) => ({
  type: PATIENTS.EDIT_PATIENT_FAIL,
  err,
});
