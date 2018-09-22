import { CLINICS } from '../actions/clinics';

const initialState = {
  list: [],
  filteredList: [],
  Clinics: [],
  loaded: false,
  loading: false,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
  case CLINICS.LOAD:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case CLINICS.LOAD_DONE: {
    let clinicsObj = {};
    if (payload.clinics && payload.clinics.data) {
      clinicsObj = payload.clinics.data;
    }
    return Object.assign(
      {},
      state,
      clinicsObj,
      { loaded: true },
      { loading: false },
    );
  }
  case CLINICS.LOAD_SUCCESS:
    return { ...state, list: payload.clinics };
  case CLINICS.FILTER_SUCCESS:
    return { ...state, filteredList: payload.clinics };
  default:
    return state;
  }
};
