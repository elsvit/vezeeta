import { takeEvery, put } from 'redux-saga/effects';
import { API, STATUS } from '@vezeeta/web-utils';

import { CLINICS, loadClinicsDone, loadClinicsFail } from '../actions/clinics';
import FilterUtils from '../../views/utils/Filter';
import Urls from '../../Urls';

/**
 * Loads clinics from getAccountStructure API
 */
function* loadClinics() {
  try {
    const apiObj = new API();
    const clinicsRes = yield apiObj.get(Urls.getAccountStructure, [
      {
        key: 'AccountKey',
        value: 'accce33b414282cdd81', // TODO: change the account key
      },
    ]);
    if (clinicsRes.status === STATUS.SUCCESS) {
      yield put(loadClinicsDone(clinicsRes));
    } else {
      yield put(loadClinicsFail('Failed to load clinics'));
    }
  } catch (err) {
    yield put(loadClinicsFail('Failed to load clinics'));
  }
}

/**
 * Filter clinics based on action, calling utils/clinics
 * @param {object} action comes from actions/clinics
 */
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
