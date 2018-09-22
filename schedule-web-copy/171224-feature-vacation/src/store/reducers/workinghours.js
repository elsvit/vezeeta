import { WORKINGHOURS } from '../actions/workinghours';

const initialState = {
  saveObject: {
    ActionMaker: 'Doctor',
    WeekDetails: [
      {
        DayOfWeek: 'Sunday',
        DayShifts: [],
      },
      {
        DayOfWeek: 'Monday',
        DayShifts: [],
      },
      {
        DayOfWeek: 'Tuesday',
        DayShifts: [],
      },
      {
        DayOfWeek: 'Wednesday',
        DayShifts: [],
      },
      {
        DayOfWeek: 'Thursday',
        DayShifts: [],
      },
      {
        DayOfWeek: 'Friday',
        DayShifts: [],
      },
      {
        DayOfWeek: 'Saturday',
        DayShifts: [],
      },
    ],
  },
  roomScheduleTypes: [],
  roomReservationWindow: [],
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
  // case WROKINGHOURS.LOAD:
  //   return Object.assign({}, state, { loaded: false }, { loading: true });
  // case WORKINGHOURS.LOAD_DONE: {
  //   let clinicsObj = {};
  //   if (payload.clinics && payload.clinics.data) {
  //     clinicsObj = payload.clinics.data;
  //   }
  //   let roomScheduleTypesObj = {};
  //   if (payload.roomScheduleTypes && payload.roomScheduleTypes.data) {
  //     roomScheduleTypesObj = {
  //       roomScheduleTypes: payload.roomScheduleTypes.data,
  //     };
  //   }
  //   return Object.assign(
  //     {},
  //     state,
  //     clinicsObj,
  //     roomScheduleTypesObj,
  //     { loaded: true },
  //     { loading: false },
  //   );
  // }
  // case CLINICS.LOAD_SUCCESS:
  //   return {
  //     ...state,
  //     list: payload.clinics,
  //     roomScheduleTypes: payload.roomScheduleTypes,
  //   };
  case WORKINGHOURS.GET_ROOM_DETAILS_SUCCESS: {
    let roomScheduleTypesObj = {};
    let roomReservationWindowObj = {};
    if (payload.roomScheduleTypes && payload.roomScheduleTypes.data) {
      roomScheduleTypesObj = {
        roomScheduleTypes: payload.roomScheduleTypes.data,
      };
    }
    if (payload.roomReservationWindow && payload.roomReservationWindow.data) {
      roomReservationWindowObj = {
        roomReservationWindow: payload.roomReservationWindow.data,
      };
    }
    return { ...state, roomScheduleTypesObj, roomReservationWindowObj };
  }
  case WORKINGHOURS.FILTER_SUCCESS:
    return { ...state, saveObject: payload.days };
  default:
    return state;
  }
};
