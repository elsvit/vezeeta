export const ROOM = {
  LOAD: 'ROOM_LOAD',
  LOAD_SUCCESS: 'ROOM_LOAD_SUCCESS',
  LOAD_DONE: 'ROOM_LOAD_DONE',
  LOAD_FAIL: 'ROOM_LOAD_FAIL',
  SAVE: 'ROOM_SAVE',
  SAVE_SUCCESS: 'ROOM_SAVE_SUCCESS',
  SAVE_DONE: 'ROOM_SAVE_DONE',
  SAVE_FAIL: 'ROOM_SAVE_FAIL',
};

export const loadWorkingHours = (keys) => ({
  type: ROOM.LOAD,
  keys,
});

export const loadWorkingHoursDone = (rooms) => ({
  type: ROOM.LOAD_DONE,
  rooms,
});

export const loadWorkingHoursFail = (err) => ({
  type: ROOM.LOAD_FAIL,
  err,
});
export const saveWorkingHours = (keys, reservationOptions, scheduleTypes) => ({
  type: ROOM.SAVE,
  keys,
  reservationOptions,
  scheduleTypes,
});

export const saveWorkingHoursDone = (rooms) => ({
  type: ROOM.SAVE_DONE,
  rooms,
});

export const saveWorkingHoursFail = (err) => ({
  type: ROOM.SAVE_FAIL,
  err,
});
