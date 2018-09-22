import { takeEvery, put } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import { CLINICS } from '../actions/clinics';
import FilterUtils from '../../views/utils/Filter';

function* loadClinics() {
  // const clinics = yield fetch('/clinics.json').then((res) => res.json());
  // yield put({ type: CLINICS.LOAD_SUCCESS, clinics: clinics.Data.Clinics });
  try {
    const apiObj = new API();
    const clinicsRes = yield apiObj.get(
      'https://accountmanagement-api-staging.drbridge.com/api/Account/GetAccountStructure',
      [
        {
          key: 'AccountKey',
          value: 'acce81aa039e3977af8',
        },
      ],
    );
    if (Math.floor(clinicsRes.status / 100) === 2) {
      yield put({ type: 'CLINICS_LOAD_DONE', clinics: clinicsRes });
      yield put({
        type: CLINICS.LOAD_SUCCESS,
        clinics: clinicsRes.data.Clinics,
      });
    } else {
      yield put({ type: 'CLINICS_LOAD_FAIL' });
    }
  } catch (err) {
    console.log('fetchPosts catch error', err); //eslint-disable-line
    yield put({ type: 'CLINICS_LOAD_FAIL' });
  }
}

function* filterClinics(action) {
  const clinics = yield FilterUtils.filterClinics(
    action.clinics,
    action.filterData,
  );
  yield put({ type: CLINICS.FILTER_SUCCESS, clinics });
}

function* clinicsSaga() {
  yield takeEvery(CLINICS.LOAD, loadClinics);
  yield takeEvery(CLINICS.FILTER, filterClinics);
}

export default clinicsSaga;
