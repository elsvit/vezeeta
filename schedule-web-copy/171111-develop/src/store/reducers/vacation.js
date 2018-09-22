import { VACATION } from '../actions/vacation';

const defaultState = {
  // BranchVacation: [
  //   {
  //     BranchKey: 'brnc2dcd57c8376db024',
  //     BranchName: 'Heliopolis Branch 1',
  //     VacationStart: '11/24/2017',
  //     VacationEnd: '11/25/2017',
  //   },
  // ],
  // RoomsVacation: [
  //   {
  //     RoomKey: 'room245ab70c50ac6a76',
  //     RoomName: 'Room 2',
  //     VacationStart: '11/25/2017',
  //     VacationEnd: '11/26/2017',
  //   },
  // ],
  // Vacation: [
  //   {
  //     AccountKey: 'acc84d0b4b2fd9a151a',
  //     DoctorName: 'Omar ElMallahy',
  //     DoctorSpeciality: 'Specialist of Psychiatry',
  //     VacationStart: '11/16/2017',
  //     VacationEnd: '11/18/2017',
  //   },
  //   {
  //     AccountKey: 'acc6263eb0ac289af20',
  //     DoctorName: 'Mohamed Essam',
  //     DoctorSpeciality: 'Specialist of Psychiatry',
  //     VacationStart: '11/20/2017',
  //     VacationEnd: '11/29/2017',
  //   },
  //   {
  //     AccountKey: 'acc9d7eb1a580623cca',
  //     DoctorName: 'Ahmed Shirin',
  //     DoctorSpeciality: 'Specialist of Psychiatry',
  //     VacationStart: '11/20/2017',
  //     VacationEnd: '11/29/2017',
  //   },
  //   {
  //     AccountKey: 'acc5b092e2a8d0ef724',
  //     DoctorName: 'Mounir Shaker',
  //     DoctorSpeciality: 'Specialist of Psychiatry',
  //     VacationStart: '11/20/2017',
  //     VacationEnd: '12/10/2017',
  //   },
  //   {
  //     AccountKey: 'acc91056dccd21833d8',
  //     DoctorName: 'Alaa Mohammed',
  //     DoctorSpeciality: 'Specialist of Psychiatry',
  //     VacationStart: '11/30/2017',
  //     VacationEnd: '12/12/2017',
  //   },
  //   {
  //     AccountKey: 'acc9a8687c48009cded',
  //     DoctorName: 'Beshoy Ibrahim',
  //     DoctorSpeciality: 'Specialist of Psychiatry',
  //     VacationStart: '12/02/2017',
  //     VacationEnd: '12/20/2017',
  //   },
  // ],
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
      // isAllSelected: true,
      names: [],
      keys: [],
      selectedIds: [],
    },
    doctors: {
      name: 'Doctors',
      placeholder: 'Doctors',
      type: 'check',
      // isAllSelected: true,
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
};

export default (state = defaultState, { type, ...action }) => {
  switch (type) {
  case VACATION.LOAD:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case VACATION.LOAD_DONE: {
    const newState = Object.assign({}, state, { Vacation: action.vacation }, { loaded: true }, { loading: false });
    console.log('reducer109 VACATION.LOAD_DONE newState ', newState, ' action', action);
    return newState;
  }
  case VACATION.FILTERED.CREATE: {
    console.log('reducer112 VACATION.FILTERED.CREATE action', action); //eslint-disable-line
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
                  if (action.rooms.length > 0 && action.rooms.indexOf(roomObj.RoomKey) !== -1) {
                    RoomsSelectedIds.push(roomObj.RoomKey);
                  }
                  if (roomObj.Doctors) {
                    const doctorsArrLen = roomObj.Doctors.length;
                    for (let i4 = 0; i4 < doctorsArrLen; i4 += 1) {
                      const doctorObj = roomObj.Doctors[i4];
                      if (!action.rooms.length ||
                        action.rooms.indexOf(roomObj.RoomKey) !== -1
                      ) {
                        if (DoctorsKeys.indexOf(doctorObj.AccountKey) === -1) {
                          const doctor = state.Vacation.find((obj) => (obj.AccountKey === doctorObj.AccountKey));
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
                              if (
                                ((startDate <= vacationStartDate &&
                                endDate >= vacationStartDate) ||
                                (startDate <= vacationEndDate &&
                                endDate >= vacationEndDate)) &&
                                DoctorsKeys.indexOf(doctorObj.AccountKey) === -1
                              ) {
                                DoctorsNames.push(doctorObj.DoctorName);
                                DoctorsKeys.push(doctorObj.AccountKey);
                                console.log('reducer186 act doct', action.doctors.length, ' act rooms', action.rooms.length);
                                if (
                                  action.rooms.length === 0 ||
                                  action.doctors.length === 0 ||
                                  (action.doctors.length > 0 && action.doctors.indexOf(doctorObj.AccountKey) !== -1)
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
      console.log('reducer194 RoomsSelectedIds', RoomsSelectedIds); //eslint-disable-line
      return newState;
    }
    return state;
  }
  case VACATION.FILTERED.SET_SELECTED_BRANCH: {
    console.log('reducer213 branchId', action.branchId); //eslint-disable-line
    const newState = Object.assign({}, state);
    newState.Filtered.branches.selectedValue = action.branchId;
    newState.filteredCreated = false;
    newState.Filtered.rooms.selectedIds = [];
    newState.Filtered.doctors.selectedIds = [];
    return newState;
  }
  case VACATION.FILTERED.SET_SELECTED_ROOMS: {
    console.log('reducer206 roomIds', action.roomIds); //eslint-disable-line
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
  default:
    return state;
  }
};
