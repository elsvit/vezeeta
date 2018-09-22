import { VACATION } from '../actions/vacation';

const defaultState = {
  Vacation: [],
  loaded: false,
  loading: false,
  Filtered: {
    branches: {
      name: 'Branches',
      placeholder: 'Branches',
      type: 'combo',
      names: [],
      keys: [],
      selectedValue: '',
    },
    rooms: {
      name: 'Rooms',
      placeholder: 'Rooms',
      type: 'check',
      names: [],
      keys: [],
      selectedIds: [],
    },
    doctors: {
      name: 'Doctors',
      placeholder: 'Doctors',
      type: 'check',
      names: [],
      keys: [],
      selectedIds: [],
    },
  },
  filteredCreated: false,
  startDate: '',
  endDate: '',
  minDateDefault: '01/01/2000',
  maxDateDefault: '01/01/2100',
  defaultStartDate: '01/01/2000',
  defaultEndDate: '01/01/2100',
  addVacationSaving: false,
  addVacationSaved: false,
  addVacation: [],
  setVacationSaving: false,
  setVacationSaved: false,
  setVacation: {},
  deleteVacationSaving: true,
  deleteVacationSaved: false,
  deleteVacation: [],
  newFiltered: false,
};

export default (state = defaultState, { type, ...action }) => {
  switch (type) {
  case VACATION.LOAD:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case VACATION.LOAD_DONE: {
    const newState = Object.assign({}, state, { Vacation: action.vacation }, { loaded: true }, { loading: false });
    return newState;
  }
  case VACATION.FILTERED.CREATE: {
    if (action.clinics.Clinics) {
      const BranchesNames = [];
      const BranchesKeys = [];
      let BranchesSelectedValue = '';
      const RoomsNames = [];
      const RoomsSelectedIds = [];
      const RoomsKeys = [];
      const DoctorsNames = [];
      const DoctorsSelectedIds = [];
      const DoctorsKeys = [];
      const startRooms = action.rooms === undefined;
      const actionRooms = startRooms ? [] : action.rooms;
      const startDoctors = action.doctors === undefined;
      const actionDoctors = startDoctors ? [] : action.doctors;
      const clinicsArr = action.clinics.Clinics;
      for (let i1 = 0; i1 < clinicsArr.length; i1 += 1) {
        const clinicsObj = clinicsArr[i1];
        if (clinicsObj.Branches) {
          const branchesArrLen = clinicsObj.Branches.length;
          for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
            const branchObj = clinicsObj.Branches[i2];
            BranchesNames.push(branchObj.BranchName);
            BranchesKeys.push(branchObj.BranchKey);
            if (action.branches === 'All Branches' ||
              action.branches === branchObj.BranchKey
            ) {
              BranchesSelectedValue = action.branches;
              if (branchObj.Rooms) {
                const roomsArrLen = branchObj.Rooms.length;
                for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
                  const roomObj = branchObj.Rooms[i3];
                  RoomsNames.push(roomObj.RoomName);
                  RoomsKeys.push(roomObj.RoomKey);
                  if (
                    (startRooms) ||
                    (actionRooms.length > 0 && actionRooms.indexOf(roomObj.RoomKey) !== -1)
                  ) {
                    RoomsSelectedIds.push(roomObj.RoomKey);
                  }
                  if (roomObj.Doctors) {
                    const doctorsArrLen = roomObj.Doctors.length;
                    for (let i4 = 0; i4 < doctorsArrLen; i4 += 1) {
                      const doctorObj = roomObj.Doctors[i4];
                      const check1 = !actionRooms.length ||
                        actionRooms.indexOf(roomObj.RoomKey) !== -1;
                      if (check1) {
                        const check2 = DoctorsKeys.indexOf(doctorObj.AccountKey) === -1;
                        if (check2) {
                          const doctor = state.Vacation.find((obj) => (
                            obj.AccountKey === doctorObj.AccountKey &&
                            obj.RoomKey === roomObj.RoomKey
                          ));
                          if (doctor !== undefined) {
                            const modelLen = doctor.Model.length ? doctor.Model.length : 0;
                            for (let i5 = 0; i5 < modelLen; i5 += 1) {
                              const vacationStartDateObj = new Date(doctor.Model[i5].From);
                              const vacationStartDate = vacationStartDateObj.getTime();
                              const vacationEndDateObj = new Date(doctor.Model[i5].To);
                              const vacationEndDate = vacationEndDateObj.getTime();
                              const startDateObj = state.startDate ? new Date(state.startDate) : new Date(state.defaultStartDate);
                              const startDate = startDateObj.getTime();
                              const endDateObj = state.endDate ? new Date(state.endDate) : new Date(state.defaultEndDate);
                              const endDate = endDateObj.getTime();
                              const checkDateAndKey = ((startDate <= vacationStartDate &&
                                endDate >= vacationStartDate) ||
                                (startDate <= vacationEndDate &&
                                endDate >= vacationEndDate)) &&
                                DoctorsKeys.indexOf(doctorObj.AccountKey) === -1;
                              if (checkDateAndKey) {
                                DoctorsNames.push(doctorObj.DoctorName);
                                DoctorsKeys.push(doctorObj.AccountKey);
                                if (
                                  startDoctors ||
                                  startRooms ||
                                  actionDoctors.length === 0 ||
                                  (actionDoctors.length > 0 && actionDoctors.indexOf(doctorObj.AccountKey) !== -1)
                                ) {
                                  DoctorsSelectedIds.push(doctorObj.AccountKey);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      const newState = Object.assign({}, state);
      newState.Filtered.branches.names = BranchesNames;
      newState.Filtered.branches.keys = BranchesKeys;
      newState.Filtered.branches.selectedValue = BranchesSelectedValue;
      newState.Filtered.rooms.names = RoomsNames;
      newState.Filtered.rooms.keys = RoomsKeys;
      newState.Filtered.rooms.selectedIds = RoomsSelectedIds;
      newState.Filtered.doctors.names = DoctorsNames;
      newState.Filtered.doctors.keys = DoctorsKeys;
      newState.Filtered.doctors.selectedIds = DoctorsSelectedIds;
      newState.filteredCreated = true;
      newState.newFiltered = false;
      // console.log('reducerVacation166 VACATION.FILTERED.CREATE newState', newState);
      return newState;
    }
    return state;
  }
  case VACATION.FILTERED.SET_SELECTED_BRANCH: {
    const newState = Object.assign({}, state);
    newState.Filtered.branches.selectedValue = action.branchId;
    newState.filteredCreated = false;
    newState.Filtered.rooms.selectedIds = [];
    newState.Filtered.doctors.selectedIds = [];
    return newState;
  }
  case VACATION.FILTERED.SET_SELECTED_ROOMS: {
    const newState = Object.assign({}, state);
    newState.Filtered.rooms.selectedIds = action.roomIds;
    return newState;
  }
  case VACATION.FILTERED.SET_SELECTED_DOCTORS: {
    const newState = Object.assign({}, state);
    newState.Filtered.doctors.selectedIds = action.doctorIds;
    return newState;
  }
  case VACATION.FILTERED.SET_DATES: {
    const startDate = action.dates.startDate ? action.dates.startDate : state.defaultStartDate;
    const endDate = action.dates.endDate ? action.dates.endDate : state.defaultEndDate;
    const newState = Object.assign({}, state, { startDate, endDate });
    return newState;
  }
  case VACATION.ADD: {
    const addVacation = action.vacation ? action.vacation : [];
    return Object.assign(
      {},
      state,
      {
        addVacationSaving: true,
        addVacationSaved: false,
        addVacation,
      },
    );
  }
  case VACATION.ADD_DONE: {
    const newState = Object.assign({}, state);
    newState.addVacationSaving = false;
    newState.addVacationSaved = true;
    return newState;
  }
  case VACATION.ADD_FAIL: {
    const newState = Object.assign({}, state);
    newState.aaddVacationSaving = false;
    newState.addVacationSaved = false;
    return newState;
  }
  case VACATION.SET: {
    const setVacation = action.setVacation || {};
    return Object.assign(
      {},
      state,
      {
        setVacationSaving: true,
        setVacationSaved: false,
        setVacation,
      },
    );
  }
  case VACATION.SET_DONE: {
    if (state.Vacation && action.vacation) {
      const newState = Object.assign({}, state);
      const vacationStateLen = state.Vacation.length;
      const vacationLen = action.vacation.length;
      newState.setVacationSaving = false;
      newState.setVacationSaved = true;
      newState.setVacation = {};
      for (let i1 = 0; i1 < vacationLen; i1 += 1) {
        const actionVacation = action.vacation[i1];
        const actionVacationLen = action.vacation[i1].Model.length;
        for (let i2 = 0; i2 < actionVacationLen; i2 += 1) {
          let check = true;
          let i3 = 0;
          while (i3 < vacationStateLen && check) {
            const stateVacation = state.Vacation[i3];
            if (
              stateVacation.AccountKey === actionVacation.AccountKey &&
              stateVacation.RoomKey === actionVacation.RoomKey
            ) {
              newState.Vacation[i3].Model.push(action.vacation[i1].Model[i2]);
              check = false;
            }
            i3 += 1;
          }
        }
      }
      newState.newFiltered = true;
      // console.log('vacationReducer254 newState', newState, 'action', action);
      return newState;
    }
    return state;
  }
  case VACATION.SET_FAIL: {
    const newState = Object.assign({}, state);
    newState.setVacationSaving = false;
    newState.setVacationSaved = false;
    return newState;
  }
  case VACATION.DELETE: {
    const deleteVacation = action.deleteVacation || [];
    return Object.assign(
      {},
      state,
      {
        deleteVacationSaving: true,
        deleteVacationSaved: false,
        deleteVacation,
      },
    );
  }
  case VACATION.DELETE_DONE: {
    if (state.Vacation && action.vacation) {
      const newState = { ...state };
      const actionVacationLen = action.vacation.length;
      for (let i1 = 0; i1 < actionVacationLen; i1 += 1) {
        newState.Vacation = state.Vacation.filter((val) => {
          const checkAccount = val.AccountKey === action.vacation[i1].accountKey;
          const checkRoom = val.RoomKey === action.vacation[i1].roomKey;
          return !(checkAccount && checkRoom);
        });
      }
      newState.newFiltered = true;
      return newState;
    }
    return state;
  }
  case VACATION.DELETE_FAIL: {
    const newState = Object.assign({}, state);
    newState.deleteVacationSaving = false;
    newState.deleteVacationSaved = false;
    return newState;
  }
  default:
    return state;
  }
};
