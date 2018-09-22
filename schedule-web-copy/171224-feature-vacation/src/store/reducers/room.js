import { ROOM } from '../actions/room';

const initialState = {
  list: [],
  loaded: false,
  loading: false,
  rooms: [],
  roomScheduleType: [],
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
  case ROOM.LOAD:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case ROOM.LOAD_DONE: {
    let roomsObj = {};
    if (payload.rooms && payload.rooms.data) {
      roomsObj = payload.rooms.data;
    }
    return Object.assign(
      {},
      state,
      roomsObj,
      { loaded: true },
      { loading: false },
    );
  }
  case ROOM.LOAD_SUCCESS:
    return { ...state, list: payload.rooms };
  case ROOM.SAVE:
    return Object.assign({}, state, { loaded: false }, { loading: true });
  case ROOM.SAVE_DONE: {
    let roomsObj = {};
    if (payload.rooms && payload.rooms.data) {
      roomsObj = payload.rooms.data;
    }
    return Object.assign(
      {},
      state,
      roomsObj,
      { loaded: true },
      { loading: false },
    );
  }
  case ROOM.SAVE_SUCCESS:
    return { ...state, list: payload.rooms };
  default:
    return state;
  }
};
