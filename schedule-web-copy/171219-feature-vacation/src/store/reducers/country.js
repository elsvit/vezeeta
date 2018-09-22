import { COUNTRY } from '../actions/country';

const initialState = {
  Countries: [],
  loaded: false,
  loading: false,
};

export default (state = initialState, { type, ...action }) => {
  switch (type) {
  case COUNTRY.LOAD:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case COUNTRY.LOAD_DONE: {
    const newState = Object.assign(
      {},
      state,
      { Countries: [...action.countries] },
      { loaded: true },
      { loading: false },
    );
    return newState;
  }
  case COUNTRY.LOAD_FAIL:
    return Object.assign({}, state, { loaded: false }, { loading: false });
  default:
    return state;
  }
};
