import { combineReducers } from 'redux';
import doctors from './doctors';
import clinics from './clinics';
import patient from './patient';
import appointments from './appointments';
import confirmations from './confirmations';
import user from './user';
import vacation from './vacation';
import patients from './patients';

export default combineReducers({
  doctors,
  clinics,
  patient,
  appointments,
  confirmations,
  user,
  vacation,
  patients,
});
