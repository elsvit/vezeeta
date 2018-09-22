import { takeLatest, put } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import { CONFIRMATIONS } from '../actions/confirmations';
import Urls from '../../Urls';

function* fetchConfirmations(action) {
  const apiWrapper = yield new API();
  const response = yield apiWrapper.post(
    Urls.getConfirmationsUrl,
    action.keys,
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
  yield put({
    type: CONFIRMATIONS.FETCH_SUCCESS,
    confirmations: response.data,
  });
}

function* saveConfirmations(action) {
  const apiWrapper = yield new API();
  const response = yield apiWrapper.post(
    Urls.saveConfirmationsUrl,
    {
      ActionMaker: 'Doctor',
      AccountRoomActions: action.confirmations,
    },
    [
      {
        key: 'Language',
        value: action.language,
      },
    ],
  );
  yield put({
    type: CONFIRMATIONS.SAVE_SUCCESS,
    confirmations: response.data,
  });
}

function* confirmationsSaga() {
  yield takeLatest(CONFIRMATIONS.FETCH, fetchConfirmations);
  yield takeLatest(CONFIRMATIONS.SAVE, saveConfirmations);
}

export default confirmationsSaga;
