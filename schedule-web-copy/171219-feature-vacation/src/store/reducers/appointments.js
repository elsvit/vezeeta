import { APPOINTMENTS } from '../actions/appointments';

const initialState = {
  list: [],
  isListLoading: false,
  form: {
    pending: false,
    success: false,
    error: '',
  },
  updatingItems: [],
  canceling: false,
  canceled: false,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
  case APPOINTMENTS.CREATE:
    return { ...state, form: { pending: true, success: false, error: '' } };
  case APPOINTMENTS.CREATE_SUCCESS:
    return {
      ...state,
      form: { ...state.form, pending: false, success: true },
    };
  case APPOINTMENTS.CREATE_FAIL:
    return {
      ...state,
      form: { ...state.form, pending: false, error: payload.error },
    };
  case APPOINTMENTS.FETCH:
    return {
      ...state,
      isListLoading: true,
    };
  case APPOINTMENTS.FETCH_SUCCESS:
    return {
      ...state,
      list: payload.appointments,
      isListLoading: false,
    };
  case APPOINTMENTS.FETCH_FAIL:
    return {
      ...state,
      isListLoading: false,
    };
  case APPOINTMENTS.UPDATE_NO_SHOW:
  case APPOINTMENTS.CHECK_IN:
    return {
      ...state,
      list: state.list.map((appointment) =>
        (appointment.ReservationKey === payload.reservationKey
          ? { ...appointment, isUpdating: true }
          : appointment)),
    };
  case APPOINTMENTS.CANCEL:
    return { ...state, canceling: true, canceled: false };
  case APPOINTMENTS.UPDATE_NO_SHOW_SUCCESS:
    return {
      ...state,
      list: state.list.map((appointment) =>
        (appointment.ReservationKey === payload.reservationKey
          ? {
            ...appointment,
            IsNoShow: payload.isNoShow,
            isUpdating: false,
          }
          : appointment)),
    };
  case APPOINTMENTS.CHECK_IN_SUCCESS:
    return {
      ...state,
      list: state.list.map((appointment) =>
        (appointment.ReservationKey === payload.reservationKey
          ? {
            ...appointment,
            EnableCheckin: false,
            IsCheckedIn: true,
            isUpdating: false,
          }
          : appointment)),
    };
  case APPOINTMENTS.CANCEL_SUCCESS:
    return {
      ...state,
      list: state.list.filter((appointment) => appointment.ReservationKey !== payload.reservationKey),
      canceled: true,
      canceling: false,
    };
  case APPOINTMENTS.UPDATE_NO_SHOW_FAIL:
  case APPOINTMENTS.CHECK_IN_FAIL:
    return {
      ...state,
      list: state.list.map((appointment) =>
        (appointment.ReservationKey === payload.reservationKey
          ? { ...appointment, isUpdating: false }
          : appointment)),
    };
  case APPOINTMENTS.CANCEL_FAIL:
    return { ...state, canceling: false, canceled: false };
  default:
    return state;
  }
};
