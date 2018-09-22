import { take, put, fork } from 'redux-saga/effects';
import { API } from '@vezeeta/web-utils';

// import { COUNTRY } from '../actions/country';

function* sagaLoadCountry() {
  while (true) {
    yield take('COUNTRY_LOAD');
    try {
      const apiObj = new API();
      const res = yield apiObj.get(
        'http://static-api-staging.drbridge.info/api/Country/GetCountries',
        [],
      );
      if (Math.floor(res.status / 100) === 2) {
        yield put({ type: 'COUNTRY_LOAD_DONE', countries: res.data });
      } else {
        yield put({ type: 'COUNTRY_LOAD_FAIL' });
      }
    } catch (err) {
      yield put({ type: 'COUNTRY_LOAD_FAIL' });
    }
  }
}

export default function* patients() {
  yield* [
    fork(sagaLoadCountry),
  ];
}

