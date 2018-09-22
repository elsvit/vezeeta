import { combineReducers } from 'redux';
import doctors from './doctors';
import clinics from './clinics';
import patient from './patient';
import appointments from './appointments';
import confirmations from './confirmations';
import workinghours from './workinghours';
import user from './user';
import vacation from './vacation';
import patients from './patients';
import room from './room';
import country from './country';

export default combineReducers({
  workinghours,
  doctors,
  clinics,
  patient,
  room,
  appointments,
  confirmations,
  user,
  vacation,
  patients,
  country,
});
