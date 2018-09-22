import { APPOINTMENTS } from '../actions/appointments';

const initialState = {
  list: [],
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
  case APPOINTMENTS.FETCH_SUCCESS:
    return {
      ...state,
      list: payload.appointments,
    };
  case APPOINTMENTS.CHANGE_FIELD:
    return {
      ...state,
      list: state.list.map((appointment) =>
        (appointment.ReservationKey === payload.reservationKey
          ? { ...appointment, [payload.key]: payload.value }
          : appointment)),
    };
  default:
    return state;
  }
};
