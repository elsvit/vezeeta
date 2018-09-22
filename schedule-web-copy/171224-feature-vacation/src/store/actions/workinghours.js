export const WORKINGHOURS = {
  FILTER: 'WORKINGHOURS_FILTER',
  FILTER_SUCCESS: 'WORKINGHOURS_FILTER_SUCCESS',
  GET_ROOM_DETAILS: 'WORKINGHOURS_GET_ROOM_DETAILS',
  GET_ROOM_DETAILS_SUCCESS: 'WORKINGHOURS_GET_ROOM_DETAILS_SUCCESS',
  GET_ROOM_DETAILS_FAIL: 'WORKINGHOURS_GET_ROOM_DETAILS_FAIL',
};

export const filterWorkingHours = (days, filterData) => ({
  type: WORKINGHOURS.FILTER,
  days,
  filterData,
});

export const getRoomDetails = (clinics) => ({
  type: WORKINGHOURS.GET_ROOM_DETAILS,
  clinics,
});

export const getRoomDetailsSuccess = (
  roomScheduleTypes,
  roomReservationWindow,
) => ({
  type: WORKINGHOURS.GET_ROOM_DETAILS_SUCCESS,
  roomScheduleTypes,
  roomReservationWindow,
});

export const getRoomDetailsFail = (error) => ({
  type: WORKINGHOURS.GET_ROOM_DETAILS_FAIL,
  error,
});
