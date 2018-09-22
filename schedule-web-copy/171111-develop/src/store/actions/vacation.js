export const VACATION = {
  LOAD: 'VACATION_LOAD',
  LOAD_DONE: 'VACATION_LOAD_DONE',
  LOAD_FAIL: 'VACATION_LOAD_FAIL',
  FILTERED: {
    CREATE: 'VACATION_FILTERED_CREATE',
    SET_SELECTED_BRANCH: 'VACATION_FILTER_SET_SELECTED_BRANCH',
    SET_SELECTED_ROOMS: 'VACATION_FILTER_SET_SELECTED_ROOMS',
    SET_SELECTED_DOCTORS: 'VACATION_FILTER_SET_SELECTED_DOCTORS',
    SET_DATES: 'VACATION_FILTEREd_SET_DATES',
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

export const createVacationFiltered = (data) => (
  {
    type: VACATION.FILTERED.CREATE,
    clinics: data.clinics || [],
    branches: data.branches || 'All Branches',
    rooms: data.rooms || [],
    doctors: data.doctors || [],
    startDate: data.startData || '',
    endDate: data.endDate || '',
  }
);
// {
//   clinics,
//   vacation,
//   branches = 'All Branches',
//   rooms = [],
//   doctors = [],
//   startDate = '',
//   endDate = '',
// }

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
