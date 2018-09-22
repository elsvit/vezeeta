import { fork, take, put, select, call } from 'redux-saga/effects'; // eslint-disable-line
import { API, STATUS } from '@vezeeta/web-utils';
import { VACATION } from '../actions/vacation';
import Urls from '../../Urls';

function* sagaGetVacation() {
  const startDate = '01/01/2000';
  const endDate = '12/31/2099';
  const action = yield take(VACATION.LOAD);
  const clinics = action.clinics.Clinics ? action.clinics.Clinics : [];
  const clinicsLen = clinics.length;
  const bodyRequest = [];
  const roomKeyArr = [];
  const roomNameArr = [];
  const doctorKeyArr = [];
  const doctorNameArr = [];
  for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
    if (clinics[i1].Branches && clinics[i1].Branches.length > 0) {
      const branches = clinics[i1].Branches;
      const branchesLen = branches.length;
      for (let i2 = 0; i2 < branchesLen; i2 += 1) {
        if (branches[i1].Rooms && branches[i1].Rooms.length > 0) {
          const rooms = branches[i2].Rooms;
          const roomsLen = rooms.length;
          for (let i3 = 0; i3 < roomsLen; i3 += 1) {
            const RoomKey = rooms[i3].RoomKey;
            roomKeyArr.push(rooms[i3].RoomKey);
            roomNameArr.push(rooms[i3].RoomName);
            if (rooms[i3].Doctors && rooms[i3].Doctors.length > 0) {
              const doctors = rooms[i3].Doctors;
              const doctorsLen = doctors.length;
              for (let i4 = 0; i4 < doctorsLen; i4 += 1) {
                const AccountKey = doctors[i4].AccountKey;
                bodyRequest.push({
                  AccountRoom: {
                    AccountKey,
                    RoomKey,
                  },
                  From: startDate,
                  To: endDate,
                });
                doctorKeyArr.push(AccountKey);
                doctorNameArr.push(doctors[i4].DoctorName);
              }
            }
          }
        }
      }
    }
  }
  try {
    const apiObj = new API();
    const res = yield apiObj.post(
      Urls.getVacations,
      // 'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/GetVacations',
      bodyRequest,
      [
        {
          key: 'Language',
          value: 'ar-EG',
        },
      ],
    );
    if (res.status === STATUS.SUCCESS) {
      const vacationArr = res.data.map((doctor) => {
        const posDoc = doctorKeyArr.indexOf(doctor.AccountKey);
        const DoctorName = posDoc !== -1 ? doctorNameArr[posDoc] : 'NoName Doctor';
        const posRoom = roomKeyArr.indexOf(doctor.RoomKey);
        const RoomName = posRoom !== -1 ? roomNameArr[posRoom] : 'NoName Room';
        const modelArr = (doctor.Model) ? doctor.Model : [];
        const modelArrLen = modelArr.length;
        const Model = [];
        for (let i = 0; i < modelArrLen; i += 1) {
          const modelFrom = new Date(modelArr[i].From);
          const modelTo = new Date(modelArr[i].To);
          Model[i] = {};
          Model[i].From = (modelFrom.getMonth() + 1) + '/' + modelFrom.getDate() + '/' + modelFrom.getFullYear(); // eslint-disable-line
          Model[i].To = (modelTo.getMonth() + 1) + '/' + modelTo.getDate() + '/' + modelTo.getFullYear(); // eslint-disable-line
        }
        return ({
          Model,
          AccountKey: doctor.AccountKey,
          RoomKey: doctor.RoomKey,
          DoctorName,
          RoomName,
        });
      });
      yield put({ type: VACATION.LOAD_DONE, vacation: vacationArr });
    } else {
      yield put({ type: VACATION.LOAD_FAIL });
    }
  } catch (err) {
    yield put({ type: VACATION.LOAD_FAIL });
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
        Urls.setVacations,
        // 'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/SetVacations',
        bodyReq,
        [
          {
            key: 'Language',
            value: 'er-EG',
          },
        ],
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({ type: VACATION.SET_DONE, vacation: bodyReq.AccountRoomActions });
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
        Urls.setVacations,
        // 'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/SetVacations',
        bodyReq,
        [
          {
            key: 'Language',
            value: 'er-EG',
          },
        ],
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({ type: VACATION.DELETE_DONE, vacation: action.deleteVacation });
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
        Urls.countReservationsInRange,
        // 'http://vezeeta-reservationapi-staging.drbridge.com/api/Reservation/CountReservationsInRange',
        bodyReq,
        [],
      );
      if (Math.floor(res.status / 100) === 2) {
        const reservationInRange = res.data;
        yield put({ type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_DONE, reservationInRange });
      } else {
        yield put({ type: VACATION.COUNT_RESERVATIONS_IN_RANGE.LOAD_FAIL, res });
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

