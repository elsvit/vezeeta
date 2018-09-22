import { fork, take, put, takeEvery } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import { PATIENTS } from '../actions/patients';
import Urls from '../../Urls';

function* sagaGetPatients() {
  while (true) {
    yield take('PATIENTS_LOAD');
    try {
      const apiObj = new API();
      let page = 0;
      const keyWord = '';
      const pageSize = 50;
      const url =
        'http://patientsapi-staging.drbridge.com/api/Patients/GetPatientsList';
      let resCheck = false;
      let resLoadElse = false;
      const patientsAr = [];
      let checkNextPage = false;
      do {
        const bodyReq = [
          {
            EntityKey: 'ente4e3d49e0f3f44d2',
            KeyWord: keyWord,
            Page: page,
            PageSize: pageSize,
          },
        ];
        const res = yield apiObj.post(url, bodyReq);
        resCheck = Math.floor(res.status / 100) === 2;
        resLoadElse = false;
        if (resCheck) {
          if (res.data && res.data[0].Model && res.data[0].Model.length > 0) {
            const modelAr = res.data[0].Model;
            const modelArLen = modelAr.length;
            for (let i = 0; i < modelArLen; i += 1) {
              patientsAr.push(modelAr[i]);
            }
            resLoadElse = modelArLen >= pageSize;
          }
        }
        page += 1;
        checkNextPage = resCheck && resLoadElse;
      } while (checkNextPage);
      if (resCheck) {
        yield put({ type: 'PATIENTS_LOAD_DONE', patients: patientsAr });
      } else {
        yield put({ type: 'PATIENTS_LOAD_FAIL' });
      }
    } catch (err) {
      yield put({ type: 'PATIENTS_LOAD_FAIL' });
    }
  }
}

function* sagaFetchPatient() {
  while (true) {
    const action = yield take(PATIENTS.FETCH_PATIENT);
    try {
      const api = new API();
      const body = [action.patientKey];
      const response = yield api.post(Urls.getPatientByKeyUrl, body);

      yield put({
        type: PATIENTS.FETCH_PATIENT_DONE,
        patient: response.data[0],
      });
    } catch (err) {
      // eslint-disable-line
    }
  }
}

function* sagaSearchPatients(action) {
  const api = new API();
  const body = [
    {
      EntityKey: 'ente4e3d49e0f3f44d2',
      KeyWord: action.keyword,
      Page: '0',
      PageSize: '100',
    },
  ];
  const response = yield api.post(Urls.searchPatientsByKeyword, body);

  yield put({
    type: PATIENTS.SEARCH_PATIENTS_DONE,
    patients: response.data[0].Model,
  });
}

function getBodyAddPatient(patientIn, EntityKey) {
  const addPatientBody = [];
  addPatientBody.push({
    EntityKey,
    PatientModel: { ...patientIn },
  });
  return addPatientBody;
}

function* sagaAddPatient() {
  const EntityKey = 'ente4e3d49e0f3f44d2';
  while (true) {
    const action = yield take('ADD_PATIENT');
    try {
      const bodyReq = getBodyAddPatient(action.patient, EntityKey);
      const apiObj = new API();
      const res = yield apiObj.post(
        'http://patientsapi-staging.drbridge.com/api/Patients/AddPatients',
        bodyReq,
      );
      if (Math.floor(res.status / 100) === 2) {
        const patient = { ...action.patient };
        patient.PatientKey = res.data[0];
        yield put({ type: 'ADD_PATIENT_DONE', patient });
      } else {
        yield put({ type: 'ADD_PATIENT_FAIL', res });
      }
    } catch (err) {
      yield put({ type: 'ADD_PATIENT_FAIL', err });
    }
  }
}

function getBodyEditPatient(patientIn) {
  const editPatientBody = { ...patientIn };
  return editPatientBody;
}

function* sagaEditPatient() {
  while (true) {
    const action = yield take('EDIT_PATIENT');
    try {
      const bodyReq = getBodyEditPatient(action.patient);
      const apiObj = new API();
      const res = yield apiObj.post(
        'http://patientsapi-staging.drbridge.com/api/Patients/EditPatient',
        bodyReq,
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({ type: 'EDIT_PATIENT_DONE', patient: action.patient });
      } else {
        yield put({ type: 'EDIT_PATIENT_FAIL', res });
      }
    } catch (err) {
      yield put({ type: 'EDIT_PATIENT_FAIL', err });
    }
  }
}

function getBodyDeletePatient(patientKey) {
  const editPatientBody = [];
  editPatientBody.push(patientKey);
  return editPatientBody;
}

function* sagaDeletePatient() {
  while (true) {
    const action = yield take('DELETE_PATIENT');
    try {
      const bodyReq = getBodyDeletePatient(action.patientKey);
      const apiObj = new API();
      const res = yield apiObj.post(
        'http://patientsapi-staging.drbridge.com/api/Patients/DeletePatients',
        bodyReq,
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({
          type: 'DELETE_PATIENT_DONE',
          patientKey: action.patientKey,
        });
      } else {
        yield put({ type: 'DELETE_PATIENT_FAIL', res });
      }
    } catch (err) {
      yield put({ type: 'DELETE_PATIENT_FAIL', err });
    }
  }
}

export default function* patients() {
  yield takeEvery(PATIENTS.SEARCH_PATIENTS, sagaSearchPatients);
  yield* [
    fork(sagaGetPatients),
    fork(sagaFetchPatient),
    fork(sagaAddPatient),
    fork(sagaEditPatient),
    fork(sagaDeletePatient),
  ];
}
