import { fork, take, put, select } from 'redux-saga/effects'; // eslint-disable-line
import { API } from '@vezeeta/web-utils';

// function* sagaGetVacation() {
//   let i = 30;
//   while (i) {
//     i -= 1;
//     yield take('VACATION_LOAD');
//     // will change when receive API :
//     yield put({ type: 'VACATION_LOAD_DONE', vacation: [] });
//   }
// }

function* sagaGetVacation() {
  const startDate = "01/01/2000"; // eslint-disable-line
  const endDate = "12/31/2099"; // eslint-disable-line
  const action = yield take('VACATION_LOAD');
  // const state = yield select();
  console.log('sagaGetVacation19 action', action);
  const clinics = action.clinics.Clinics ? action.clinics.Clinics : [];
  const clinicsLen = clinics.length;
  const bodyRequest = []; // eslint-disable-line
  const roomKeyArr = []; // eslint-disable-line
  const roomNameArr = []; // eslint-disable-line
  const doctorKeyArr = []; // eslint-disable-line
  const doctorNameArr = []; // eslint-disable-line
  console.log('sagaGetVacation27 clinics', clinics, ' clinicsLen', clinicsLen);
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
            console.log('sagaGetVacation33 roomKey', RoomKey);
            if (rooms[i3].Doctors && rooms[i3].Doctors.length > 0) {
              const doctors = rooms[i3].Doctors;
              const doctorsLen = doctors.length;
              for (let i4 = 0; i4 < doctorsLen; i4 += 1) {
                const AccountKey = doctors[i4].AccountKey;
                console.log('sagaGetVacation39 AccountKey', AccountKey);
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
  console.log('sagaGetVacation53 bodyRequest', bodyRequest);

  try {
    const apiObj = new API();
    const bodyReq1 = [
      {
        AccountRoom: {
          AccountKey: 'accb6abfc111246987f',
          RoomKey: 'roomb68855803d2a1625',
        },
        From: '11/09/2017',
        To: '11/12/2017',
      },
      {
        AccountRoom: {
          AccountKey: 'accac8eea95ce5344d2',
          RoomKey: 'roomb68855803d2a1625',
        },
        From: '11/23/2017',
        To: '11/24/2017',
      },
    ];
    const bodyReq2 = bodyReq1.concat(bodyRequest);
    const res = yield apiObj.post(
      'http://vezeeta-scheduleapi-staging.drbridge.com/api/Vacation/GetVacations',
      bodyReq2,
      [
        {
          key: 'Language',
          value: 'ar-EG',
        },
      ],
    );
    if (Math.floor(res.status / 100) === 2) {
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
      console.log('sagaGetVacation104 vacationArr', vacationArr);
      yield put({ type: 'VACATION_LOAD_DONE', vacation: vacationArr });
    } else {
      yield put({ type: 'VACATION_LOAD_FAIL' });
    }
  } catch (err) {
    console.log('fetchPosts catch error', err); //eslint-disable-line
    yield put({ type: 'VACATION_LOAD_FAIL' });
  }
}

export default function* vacation() {
  yield* [
    fork(sagaGetVacation),
  ];
}

