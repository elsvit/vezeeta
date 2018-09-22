import { USER } from '../actions/user';

const defaultState = {
  type: 'admin',
};

export default (state = defaultState, { type, ...action }) => {
  switch (type) {
  case USER.SET:
    return Object.assign({}, state, action.user);
  default:
    return state;
  }
};
