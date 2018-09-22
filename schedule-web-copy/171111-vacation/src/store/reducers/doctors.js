import { DOCTOR } from '../actions/doctor';

const defaultState = {
  id: '0',
  name: 'Yurii',
};

export default (state = defaultState, { type, ...action }) => {
  switch (type) {
  case DOCTOR.DOWNLOAD:
    return Object.assign({}, state, action.doctors);
  default:
    return state;
  }
};
