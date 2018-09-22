export const PATIENTS = {
  LOAD: 'PATIENTS_LOAD',
  LOAD_DONE: 'PATIENTS_LOAD_DONE',
  LOAD_FAIL: 'PATIENTS_LOAD_FAIL',
  // CHANGE_TEXT_FOR_SEARCH: 'PATIENTS_CHANGE_TEXT_FOR_SEARCH',
};

export const loadPatients = () => (
  {
    type: PATIENTS.LOAD,
  }
);

export const loadPatientsDone = (patients) => (
  {
    type: PATIENTS.LOAD_DONE,
    patients,
  }
);

export const loadPatientsFail = (err) => (
  {
    type: PATIENTS.LOAD_FAIL,
    err,
  }
);

// export const changeTextForSearch = (textForSearch) => (
//   {
//     type: PATIENTS.CHANGE_TEXT_FOR_SEARCH,
//     textForSearch,
//   }
// );


// export const loadPatients = ({ from, to }) => (
//   {
//     type: 'API_CALL',
//     types: [PATIENTS.LOAD, PATIENTS.LOAD_DONE, PATIENTS.LOAD_FAIL],
//     call: () => api.get('url/to/patients'),
//   }
// );
