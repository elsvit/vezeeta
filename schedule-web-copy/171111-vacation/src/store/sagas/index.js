import { fork } from 'redux-saga/effects';
import clinicsSaga from './clinics';
import patientSaga from './patient';
import appointmentsSaga from './appointments';
import confirmationsSaga from './confirmations';
import patients from './patients';
import vacation from './vacation';
import country from './country';

const sagas = [
  clinicsSaga,
  patientSaga,
  appointmentsSaga,
  confirmationsSaga,
  patients,
  vacation,
  country,
];

export default function* rootSaga() {
  yield sagas.map((saga) => fork(saga));
}
