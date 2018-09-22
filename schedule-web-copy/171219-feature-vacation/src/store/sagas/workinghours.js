import { takeEvery, put } from 'redux-saga/effects';
import { API, STATUS } from '@vezeeta/web-utils';

import {
  WORKINGHOURS,
  getRoomDetailsSuccess,
  getRoomDetailsFail,
} from '../actions/workinghours';
import FilterUtils from '../../views/utils/Filter';
import ClinicsUtils from '../../views/utils/Clinics';
import Urls from '../../Urls';

function* filterWorkingHours(action) {
  const allShifts = yield FilterUtils.filterClinics(
    action.days,
    action.filterData,
  );
  yield put({ type: WORKINGHOURS.FILTER_SUCCESS, allShifts });
}

function* getRoomDetails(action) {
  const apiScheduleTypes = new API();
  const apiReservationWindow = new API();
  const clinicsData = ClinicsUtils.flattenClinics(action.clinics);
  const AllScheduleTypes = yield apiScheduleTypes.post(
    Urls.GetScheduleTypes,
    clinicsData.rooms.map((room) => ({
      AccountKey: clinicsData.branches[0].Rooms[0].Doctors[0].AccountKey,
      RoomKey: room.RoomKey,
    })),
    [
      {
        key: 'Language',
        value: 'ar-EG',
      },
    ],
  );
  const AllowReservationWindow = yield apiReservationWindow.post(
    Urls.GetAllowReservationWindow,
    clinicsData.rooms.map((room) => ({
      AccountKey: clinicsData.branches[0].Rooms[0].Doctors[0].AccountKey,
      RoomKey: room.RoomKey,
    })),
    [
      {
        key: 'Language',
        value: 'ar-EG',
      },
    ],
  );

  if (
    AllScheduleTypes.status === STATUS.SUCCESS &&
    AllowReservationWindow.status === STATUS.SUCCESS
  ) {
    clinicsData.rooms.map((room, index) => {
      const scheduleTypeItem = AllScheduleTypes.data[index];
      if (scheduleTypeItem) {
        scheduleTypeItem.RoomKey = room.RoomKey;
      }
    });

    yield put(getRoomDetailsSuccess(AllScheduleTypes, AllowReservationWindow));
  } else {
    yield put(getRoomDetailsFail('Failed to load room details'));
  }
}

function* workinghoursSaga() {
  yield takeEvery(WORKINGHOURS.FILTER, filterWorkingHours);
  yield takeEvery(WORKINGHOURS.GET_ROOM_DETAILS, getRoomDetails);
}

export default workinghoursSaga;
