export const CLINICS = {
  LOAD: 'CLINICS_LOAD',
  LOAD_SUCCESS: 'CLINICS_LOAD_SUCCESS',
  FILTER: 'CLINICS_FILTER',
  FILTER_SUCCESS: 'CLINICS_FILTER_SUCCESS',
  LOAD_DONE: 'CLINICS_LOAD_DONE',
  LOAD_FAIL: 'CLINICS_LOAD_FAIL',
};

export const loadClinics = () => ({
  type: CLINICS.LOAD,
});

export const filterClinics = (clinics, filterData) => ({
  type: CLINICS.FILTER,
  clinics,
  filterData,
});

export const loadClinicsDone = (clinics) => ({
  type: CLINICS.LOAD_DONE,
  clinics,
});

export const loadClinicsFail = (err) => ({
  type: CLINICS.LOAD_FAIL,
  err,
});
