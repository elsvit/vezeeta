export const VACATION = {
  LOAD: 'VACATION_LOAD',
  LOAD_DONE: 'VACATION_LOAD_DONE',
  LOAD_FAIL: 'VACATION_LOAD_FAIL',
  ADD: 'VACATION_ADD',
  ADD_DONE: 'VACATION_ADD_DONE',
  ADD_FAIL: 'VACATION_ADD_FAIL',
  SET: 'VACATION_SET',
  SET_DONE: 'VACATION_SET_DONE',
  SET_FAIL: 'VACATION_SET_FAIL',
  DELETE: 'VACATION_DELETE',
  DELETE_DONE: 'VACATION_DELETE_DONE',
  DELETE_FAIL: 'VACATION_DELETE_FAIL',
  FILTERED: {
    CREATE: 'VACATION_FILTERED_CREATE',
    SET_SELECTED_BRANCH: 'VACATION_FILTER_SET_SELECTED_BRANCH',
    SET_SELECTED_ROOMS: 'VACATION_FILTER_SET_SELECTED_ROOMS',
    SET_SELECTED_DOCTORS: 'VACATION_FILTER_SET_SELECTED_DOCTORS',
    SET_DATES: 'VACATION_FILTEREd_SET_DATES',
  },
  COUNT_RESERVATIONS_IN_RANGE: {
    LOAD: 'COUNT_RESERVATIONS_IN_RANGE_LOAD',
    LOAD_DONE: 'COUNT_RESERVATIONS_IN_RANGE_LOAD_DONE',
    LOAD_FAIL: 'COUNT_RESERVATIONS_IN_RANGE_LOAD_FAIL',
  },
};

export const loadVacation = (clinics) => (
  {
    type: VACATION.LOAD,
    clinics,
  }
);

export const loadVacationDone = (vacation) => (
  {
    type: VACATION.LOAD_DONE,
    vacation,
  }
);

export const loadVacationFail = (err) => (
  {
    type: VACATION.LOAD_FAIL,
    err,
  }
);

export const setVacation = (vacation) => (
  {
    type: VACATION.SET,
    setVacation: vacation,
  }
);

export const setVacationDone = (vacation) => (
  {
    type: VACATION.SET_DONE,
    vacation,
  }
);

export const setVacationFail = (err) => (
  {
    type: VACATION.SET_FAIL,
    err,
  }
);

export const deleteVacation = (vacation) => (
  {
    type: VACATION.DELETE,
    deleteVacation: vacation,
  }
);

export const deleteVacationDone = (vacation) => (
  {
    type: VACATION.DELETE_DONE,
    vacation,
  }
);

export const deleteVacationFail = (err) => (
  {
    type: VACATION.DELETE_FAIL,
    err,
  }
);

export const createVacationFiltered = (data) => (
  {
    type: VACATION.FILTERED.CREATE,
    clinics: data.clinics || [],
    branches: data.branches || 'All Branches',
    rooms: data.rooms,
    doctors: data.doctors,
    startDate: data.startDate || '',
    endDate: data.endDate || '',
  }
);

export const setVacationFilterSelectedBranch = (branchId) => (
  {
    type: VACATION.FILTERED.SET_SELECTED_BRANCH,
    branchId,
  }
);

export const setVacationFilterSelectedRooms = (roomIds) => (
  {
    type: VACATION.FILTERED.SET_SELECTED_ROOMS,
    roomIds,
  }
);

export const setVacationFilterSelectedDoctors = (doctorIds) => (
  {
    type: VACATION.FILTERED.SET_SELECTED_DOCTORS,
    doctorIds,
  }
);

export const setVacationFilterDates = (dates) => (
  {
    type: VACATION.FILTERED.SET_DATES,
    dates,
  }
);

export const loadCountReservationInRange = (data) => (
  {
    type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD,
    data,
  }
);

export const loadCountReservationInRangeDone = (data) => (
  {
    type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_DONE,
    data,
  }
);

export const loadCountReservationInRangeFail = (err) => (
  {
    type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_FAIL,
    err,
  }
);

