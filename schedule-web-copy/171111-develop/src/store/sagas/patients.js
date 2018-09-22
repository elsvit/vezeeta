import { fork, take, put } from 'redux-saga/effects';

import { API } from '@vezeeta/web-utils';

function* sagaGetPatients() {
  while (true) {
    yield take('PATIENTS_LOAD');
    try {
      const apiObj = new API();
      const headersArr = [
        {
          key: 'Authorization',
          value: '30706b',
        },
        {
          key: 'ClinicKey',
          value: 'clnce927f40106f800b0',
        },
        {
          key: 'Language',
          value: 'en-EG',
        },
      ];
      const patientsRes = yield apiObj.get(
        'http://care-native-apistest.drbridge.com/api/Patient/GetPatientsList?keyword=&page=0&pageSize=100',
        headersArr,
      );
      console.log('saga take PATIENTS_LOAD patients', patientsRes); // eslint-disable-line
      yield put({ type: 'PATIENTS_LOAD_DONE', patients: patientsRes });
      yield put({ type: 'PATIENTS_LOAD_FAIL' });
    } catch (err) {
      console.log('fetchPosts catch error', err); // eslint-disable-line
    }
  }
}

export default function* patients() {
  yield* [
    fork(sagaGetPatients),
  ];
}

