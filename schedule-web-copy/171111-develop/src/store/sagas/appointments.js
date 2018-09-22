import { takeEvery, put } from 'redux-saga/effects';
import { APPOINTMENTS } from '../actions/appointments';

function* fetchAppointments() {
  const response = yield fetch('/appointments.json').then((res) => res.json());
  yield put({ type: APPOINTMENTS.FETCH_SUCCESS, appointments: response.Data });
}

function* appointmentsSaga() {
  yield takeEvery(APPOINTMENTS.FETCH, fetchAppointments);
}

export default appointmentsSaga;
