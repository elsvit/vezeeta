import { takeEvery, put } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

import { ROOM } from '../actions/room';
import Urls from '../../Urls';

function* loadWorkingHours(action) {
  // const clinics = yield fetch('/clinics.json').then((res) => res.json());
  // yield put({ type: CLINICS.LOAD_SUCCESS, clinics: clinics.Data.Clinics });

  try {
    const apiObj = new API();
    const workingHours = yield apiObj.post(
      Urls.getWorkingHours,
      action.keys,
      [
        {
          key: 'Language',
          value: 'ar-EG',
        },
      ],
    );
    if (Math.floor(workingHours.status / 100) === 2) {
      yield put({ type: 'ROOM_LOAD_DONE', rooms: workingHours });
      yield put({
        type: ROOM.LOAD_SUCCESS,
        rooms: workingHours.data,
      });
    } else {
      yield put({ type: 'ROOM_LOAD_FAIL' });
    }
  } catch (err) {
    yield put({ type: 'ROOM_LOAD_FAIL' });
  }
}
function* saveWorkingHours(action) {
  try {
    const apiObj = new API();
    const workingHours = yield apiObj.post(Urls.saveWorkingHours, action.keys, [
      {
        key: 'Language',
        value: 'ar-EG',
      },
    ]);
    const reservationOptions = yield apiObj.post(Urls.SetAllowReservationWindow, action.reservationOptions, [
      {
        key: 'Language',
        value: 'ar-EG',
      },
    ]);
    const setScheduleTypes = yield apiObj.post(Urls.SetScheduleTypes, action.scheduleTypes, [
      {
        key: 'Language',
        value: 'ar-EG',
      },
    ]);
    if (Math.floor(workingHours.status / 100) === 2 && Math.floor(reservationOptions.status / 100) === 2 && Math.floor(setScheduleTypes.status / 100) === 2) {
      yield put({ type: 'ROOM_SAVE_DONE', rooms: workingHours });
      yield put({
        type: ROOM.SAVE_SUCCESS,
        rooms: workingHours.data,
      });
    } else {
      yield put({ type: 'ROOM_SAVE_FAIL' });
    }
  } catch (err) {
    yield put({ type: 'ROOM_SAVE_FAIL' });
  }
}

function* roomSaga() {
  yield takeEvery(ROOM.LOAD, loadWorkingHours);
  yield takeEvery(ROOM.SAVE, saveWorkingHours);
}

export default roomSaga;
