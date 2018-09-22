import { DEFAULT_ERROR_MESSAGE } from '../../views/Constants';

export const APPOINTMENTS = {
  FETCH: 'APPOINTMENTS_FETCH',
  FETCH_SUCCESS: 'APPOINTMENTS_FETCH_SUCCESS',
  FETCH_FAIL: 'APPOINTMENTS_FETCH_FAIL',
  CREATE: 'APPOINTMENTS_CREATE',
  CREATE_SUCCESS: 'APPOINTMENTS_CREATE_SUCCESS',
  CREATE_FAIL: 'APPOINTMENTS_CREATE_FAIL',
  UPDATE_NO_SHOW: 'APPOINTMENTS_UPDATE_NO_SHOW',
  UPDATE_NO_SHOW_SUCCESS: 'APPOINTMENTS_UPDATE_NO_SHOW_SUCCESS',
  UPDATE_NO_SHOW_FAIL: 'APPOINTMENTS_UPDATE_NO_SHOW_FAIL',
  CHECK_IN: 'APPOINTMENTS_CHECK_IN',
  CHECK_IN_SUCCESS: 'APPOINTMENTS_CHECK_IN_SUCCESS',
  CHECK_IN_FAIL: 'APPOINTMENTS_CHECK_IN_FAIL',
  CANCEL: 'APPOINTMENTS_CANCEL',
  CANCEL_SUCCESS: 'APPOINTMENTS_CANCEL_SUCCESS',
  CANCEL_FAIL: 'APPOINTMENTS_CANCEL_FAIL',
};

export const fetchAppointments = (doctors, startDate, endDate) => ({
  type: APPOINTMENTS.FETCH,
  doctors,
  startDate,
  endDate,
});

export const fetchAppointmentsSuccess = (appointments) => ({
  type: APPOINTMENTS.FETCH_SUCCESS,
  appointments,
});

export const fetchAppointmentsFail = () => ({
  type: APPOINTMENTS.FETCH_FAIL,
});

export const createAppointment = (appointmentData, patientData) => ({
  type: APPOINTMENTS.CREATE,
  appointmentData,
  patientData,
});

export const createAppointmentSuccess = (appointment) => ({
  type: APPOINTMENTS.CREATE_SUCCESS,
  appointment,
});

export const createAppointmentFail = (error = DEFAULT_ERROR_MESSAGE) => ({
  type: APPOINTMENTS.CREATE_FAIL,
  error,
});

export const updateNoShow = (reservationKey, isNoShow) => ({
  type: APPOINTMENTS.UPDATE_NO_SHOW,
  reservationKey,
  isNoShow,
});

export const updateNoShowSuccess = (reservationKey, isNoShow) => ({
  type: APPOINTMENTS.UPDATE_NO_SHOW_SUCCESS,
  reservationKey,
  isNoShow,
});

export const updateNoShowFail = (reservationKey) => ({
  type: APPOINTMENTS.UPDATE_NO_SHOW_FAIL,
  reservationKey,
});

export const checkIn = (reservationKey) => ({
  type: APPOINTMENTS.CHECK_IN,
  reservationKey,
});

export const checkInSuccess = (reservationKey) => ({
  type: APPOINTMENTS.CHECK_IN_SUCCESS,
  reservationKey,
});

export const checkInFail = (reservationKey) => ({
  type: APPOINTMENTS.CHECK_IN_FAIL,
  reservationKey,
});

export const cancel = (reservationKey) => ({
  type: APPOINTMENTS.CANCEL,
  reservationKey,
});

export const cancelSuccess = (reservationKey) => ({
  type: APPOINTMENTS.CANCEL_SUCCESS,
  reservationKey,
});

export const cancelFail = (reservationKey) => ({
  type: APPOINTMENTS.CANCEL_FAIL,
  reservationKey,
});
