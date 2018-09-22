import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import { APPOINTMENTS } from '../actions/appointments';
import Urls from '../../Urls';

function* fetchAppointments() {
  const response = yield fetch('/appointments.json').then((res) => res.json());
  yield put({ type: APPOINTMENTS.FETCH_SUCCESS, appointments: response.Data });
}

function* createAppointment(action) {
  try {
    const api = new API();

    if (action.appointmentData.PatientKey) {
      yield api.post(Urls.createReservationUrl, [action.appointmentData]);
    } else {
      const patientBody = [
        {
          EntityKey: 'ente4e3d49e0f3f44d2',
          PatientModel: action.patientData,
        },
      ];

      const response = yield api.post(Urls.createPatient, patientBody);

      yield api.post(Urls.createReservationUrl, [
        { ...action.appointmentData, PatientKey: response.data[0] },
      ]);
    }
  } catch (err) {
    console.log('create appointment error', err);
  }
}

function* appointmentsSaga() {
  yield takeEvery(APPOINTMENTS.FETCH, fetchAppointments);
  yield takeLatest(APPOINTMENTS.CREATE, createAppointment);
}

export default appointmentsSaga;
