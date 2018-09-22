import { CONFIRMATIONS } from '../actions/confirmations';

const initialState = {
  list: [],
  isLoading: false,
  isConfirmationSaved: false,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
  case CONFIRMATIONS.FETCH:
  case CONFIRMATIONS.SAVE:
    return {
      ...state,
      isLoading: true,
    };
  case CONFIRMATIONS.FETCH_SUCCESS:
    return {
      ...state,
      list: payload.confirmations,
      isLoading: false,
    };
  case CONFIRMATIONS.SAVE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isConfirmationSaved: true,
    };
  default:
    return state;
  }
};
