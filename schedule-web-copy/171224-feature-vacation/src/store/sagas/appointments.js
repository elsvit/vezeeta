import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import {
  APPOINTMENTS,
  createAppointmentSuccess,
  createAppointmentFail,
  updateNoShowSuccess,
  updateNoShowFail,
  checkInSuccess,
  checkInFail,
  cancelFail,
  cancelSuccess,
  fetchAppointmentsSuccess,
  fetchAppointmentsFail,
} from '../actions/appointments';
import {
  requestFailed,
  requestWithError,
  getRequestError,
} from '../../views/utils/Api';
import Urls from '../../Urls';

function* fetchAppointments(action) {
  const api = new API();
  const body = action.doctors.map((doctor) => ({
    ...doctor,
    From: action.startDate,
    To: action.endDate,
  }));

  const response = yield api.post(Urls.fetchReservationsUrl, body, [
    {
      key: 'Language',
      value: 'ar-EG',
    },
  ]);

  if (requestFailed(response)) {
    yield put(fetchAppointmentsFail());
  } else {
    let appointments = [];
    response.data.forEach((item) => {
      appointments = appointments.concat(item.Model);
    });
    yield put(fetchAppointmentsSuccess(appointments));
  }
}

function* handleCreateAppointmentResponse(response) {
  if (requestFailed(response)) {
    yield put(createAppointmentFail());
  } else if (requestWithError(response)) {
    const error = getRequestError(response);
    yield put(createAppointmentFail(error));
  } else {
    yield put(createAppointmentSuccess());
  }
}

function* createAppointmentWithPatientKey(appointmentData) {
  const api = new API();

  const response = yield api.post(Urls.createReservationUrl, [appointmentData]);

  yield* handleCreateAppointmentResponse(response);
}

function* createAppointmentWithPatientData(appointmentData, patientData) {
  const api = new API();
  const patientBody = [
    {
      EntityKey: 'ente4e3d49e0f3f44d2',
      PatientModel: patientData,
    },
  ];

  const response = yield api.post(Urls.createPatient, patientBody);

  if (requestFailed(response)) {
    yield put(createAppointmentFail());
  } else {
    const appointmentDataWithPatientKey = {
      ...appointmentData,
      PatientKey: response.data[0],
    };

    yield* createAppointmentWithPatientKey(appointmentDataWithPatientKey);
  }
}

function* createAppointment(action) {
  if (action.appointmentData.PatientKey) {
    yield* createAppointmentWithPatientKey(action.appointmentData);
  } else {
    yield* createAppointmentWithPatientData(
      action.appointmentData,
      action.patientData,
    );
  }
}

function* updateNoShowAppointment(action) {
  const { reservationKey, isNoShow } = action;
  const api = new API();
  const body = [
    {
      ActionMaker: 'Doctor',
      AccountKey: 'accb6abfc111246987f',
      RoomKey: 'roomb68855803d2a1625',
      ReservationKey: reservationKey,
    },
  ];
  const url = isNoShow
    ? Urls.markReservationAsNoShow
    : Urls.undoReservationNoShow;

  const response = yield api.post(url, body);

  if (!requestFailed(response) && response.data[reservationKey].Success) {
    yield put(updateNoShowSuccess(reservationKey, isNoShow));
  } else {
    yield put(updateNoShowFail(reservationKey));
  }
}

function* checkInAppointment(action) {
  const { reservationKey } = action;
  const api = new API();
  const body = [
    {
      ActionMaker: 'Doctor',
      AccountKey: 'accb6abfc111246987f',
      RoomKey: 'roomb68855803d2a1625',
      ReservationKey: reservationKey,
      UpdateReservationStatus: 'PatientCheckedIn',
    },
  ];
  const url = Urls.checkInReservation;

  const response = yield api.post(url, body);

  if (!requestFailed(response) && response.data[reservationKey].Success) {
    yield put(checkInSuccess(reservationKey));
  } else {
    yield put(checkInFail(reservationKey));
  }
}

function* cancelAppointment(action) {
  const { reservationKey } = action;
  const api = new API();
  const body = [
    {
      ActionMaker: 'Doctor',
      AccountKey: 'accb6abfc111246987f',
      RoomKey: 'roomb68855803d2a1625',
      ReservationKey: reservationKey,
      CloseReasonId: 0,
      SendCancellationMessage: 0,
    },
  ];
  const url = Urls.cancelReservation;

  const response = yield api.post(url, body);

  if (!requestFailed(response) && response.data[reservationKey].Success) {
    yield put(cancelSuccess(reservationKey));
  } else {
    yield put(cancelFail(reservationKey));
  }
}

function* appointmentsSaga() {
  yield takeLatest(APPOINTMENTS.FETCH, fetchAppointments);
  yield takeLatest(APPOINTMENTS.CREATE, createAppointment);
  yield takeEvery(APPOINTMENTS.UPDATE_NO_SHOW, updateNoShowAppointment);
  yield takeEvery(APPOINTMENTS.CHECK_IN, checkInAppointment);
  yield takeEvery(APPOINTMENTS.CANCEL, cancelAppointment);
}

export default appointmentsSaga;
