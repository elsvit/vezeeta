import { fork, take, put, select, call } from 'redux-saga/effects'; // eslint-disable-line
import { API } from '@vezeeta/web-utils';
import { VACATION } from '../actions/vacation';
import ClinicsUtils from '../../views/utils/Clinics';

function* sagaGetVacation() {
  while (true) {
    const action = yield take(VACATION.LOAD);
    // const startDate = '01/01/2000'; // eslint-disable-line
    // const endDate = '12/31/2099'; // eslint-disable-line
    const startDate = action.startDate || '01/01/2000';
    const endDate = action.endDate || '12/31/2099';
    const bodyRequest = action.selectedDoctors.map((doctor) => ({
      AccountRoom: {
        AccountKey: doctor.AccountKey,
        RoomKey: doctor.RoomKey,
      },
      From: startDate,
      To: endDate,
    }));
    try {
      const apiObj = new API();
      const res = yield apiObj.post(
        'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/GetVacations',
        bodyRequest,
        [
          {
            key: 'Language',
            value: 'ar-EG',
          },
        ],
      );
      if (Math.floor(res.status / 100) === 2) {
        const clinicsData = ClinicsUtils.flattenClinics(action.clinics);
        const doctorsNames = ClinicsUtils.getDoctorsNames(clinicsData.doctors);
        const roomsNames = ClinicsUtils.getRoomNames(clinicsData.rooms);
        const vacationArr = res.data.map((doctor) => {
          const DoctorName = doctorsNames[doctor.AccountKey];
          const RoomName = roomsNames[doctor.RoomKey];
          const modelArr = doctor.Model ? doctor.Model : [];
          const modelArrLen = modelArr.length;
          const Model = [];
          for (let i = 0; i < modelArrLen; i += 1) {
            const modelFrom = new Date(modelArr[i].From);
            const modelTo = new Date(modelArr[i].To);
            Model[i] = {};
            Model[i].From = `${modelFrom.getMonth() +
              1}/${modelFrom.getDate()}/${modelFrom.getFullYear()}`; // eslint-disable-line
            Model[i].To = `${modelTo.getMonth() +
              1}/${modelTo.getDate()}/${modelTo.getFullYear()}`; // eslint-disable-line
          }
          return {
            Model,
            AccountKey: doctor.AccountKey,
            RoomKey: doctor.RoomKey,
            DoctorName,
            RoomName,
          };
        });
        yield put({ type: VACATION.LOAD_DONE, vacation: vacationArr });
      } else {
        yield put({ type: VACATION.LOAD_FAIL });
      }
    } catch (err) {
      yield put({ type: VACATION.LOAD_FAIL });
    }
  }
}

function getBodySetVacation(vacationIn, IsDeleted = 0) {
  const setVacationObj = {
    ActionMaker: 'Doctor',
    AccountRoomActions: [],
  };
  const vacationArr = vacationIn || [];
  const vacationArrLen = vacationArr.length;
  for (let i = 0; i < vacationArrLen; i += 1) {
    setVacationObj.AccountRoomActions[i] = {};
    setVacationObj.AccountRoomActions[i].AccountKey = vacationArr[i].accountKey;
    setVacationObj.AccountRoomActions[i].RoomKey = vacationArr[i].roomKey;
    setVacationObj.AccountRoomActions[i].Model = [];
    setVacationObj.AccountRoomActions[i].Model.push({
      From: vacationArr[i].vacationFrom,
      To: vacationArr[i].vacationTo,
      IsDeleted,
    });
  }
  return setVacationObj;
}

function* sagaSetVacation() {
  while (true) {
    const action = yield take(VACATION.SET);
    try {
      const bodyReq = getBodySetVacation(action.setVacation, 0);
      const apiObj = new API();
      const res = yield apiObj.post(
        // eslint-disable-line
        'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/SetVacations',
        bodyReq,
        [
          {
            key: 'Language',
            value: 'er-EG',
          },
        ],
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({
          type: VACATION.SET_DONE,
          vacation: bodyReq.AccountRoomActions,
        });
      } else {
        yield put({ type: VACATION.SET_FAIL, res });
      }
    } catch (err) {
      yield put({ type: VACATION.SET_FAIL, err });
    }
  }
}

function* sagaDeleteVacation() {
  while (true) {
    const action = yield take(VACATION.DELETE);
    try {
      const bodyReq = getBodySetVacation(action.deleteVacation, 1);
      const apiObj = new API();
      const res = yield apiObj.post(
        'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/SetVacations',
        bodyReq,
        [
          {
            key: 'Language',
            value: 'er-EG',
          },
        ],
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({
          type: VACATION.DELETE_DONE,
          vacation: action.deleteVacation,
        });
      } else {
        yield put({ type: VACATION.DELETE_FAIL, res });
      }
    } catch (err) {
      yield put({ type: VACATION.DELETE_FAIL, err });
    }
  }
}

function* sagaCountReservationInRange() {
  while (true) {
    const action = yield take(VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD);
    try {
      const bodyReq = [...action.data];
      const apiObj = new API();
      const res = yield apiObj.post(
        'http://vezeeta-reservationapi-staging.drbridge.com/api/Reservation/CountReservationsInRange',
        bodyReq,
        [],
      );
      if (Math.floor(res.status / 100) === 2) {
        const reservationInRange = res.data;
        yield put({
          type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_DONE,
          reservationInRange,
        });
      } else {
        yield put({
          type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_FAIL,
          res,
        });
      }
    } catch (err) {
      yield put({ type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_FAIL, err });
    }
  }
}

export default function* vacation() {
  yield* [
    fork(sagaGetVacation),
    fork(sagaSetVacation),
    fork(sagaDeleteVacation),
    fork(sagaCountReservationInRange),
  ];
}
