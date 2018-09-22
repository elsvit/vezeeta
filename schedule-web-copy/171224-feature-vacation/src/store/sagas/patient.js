import { takeEvery, put } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import { PATIENT } from '../actions/patient';
import Urls from '../../Urls';

function* fetchPatient(action) {
  const apiWrapper = yield new API();
  const response = yield apiWrapper.get(
    `${Urls.getPatientByKeyUrl}?patientKey=${action.patientKey}`,
    [
      {
        key: 'ClinicKey',
        value: action.clinicKey,
      },
      {
        key: 'Authorization',
        value: action.authorization,
      },
      {
        key: 'Language',
        value: action.language,
      },
    ],
  );
  yield put({ type: PATIENT.FETCH_SUCCESS, patient: response.data });
}

function* patientSaga() {
  yield takeEvery(PATIENT.FETCH, fetchPatient);
}

export default patientSaga;
