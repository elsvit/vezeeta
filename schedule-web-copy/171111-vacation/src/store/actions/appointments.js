export const APPOINTMENTS = {
  FETCH: 'APPOINTMENTS_FETCH',
  FETCH_SUCCESS: 'APPOINTMENTS_FETCH_SUCCESS',
  CREATE: 'APPOINTMENTS_CREATE',
  CREATE_SUCCESS: 'APPOINTMENTS_CREATE_SUCCESS',
  CHANGE_FIELD: 'CHANGE_FIELD',
};

export const fetchAppointments = (
  startDate,
  endDate,
  clinicKey = 'clnc8c1fff89af1dacc0',
  authorization = '9913fb',
  language = 'ar-EG',
) => ({
  type: APPOINTMENTS.FETCH,
  startDate,
  endDate,
  clinicKey,
  authorization,
  language,
});

export const createAppointment = (appointmentData, patientData) => ({
  type: APPOINTMENTS.CREATE,
  appointmentData,
  patientData,
});

export const changeField = (reservationKey, key, value) => ({
  type: APPOINTMENTS.CHANGE_FIELD,
  reservationKey,
  key,
  value,
});
