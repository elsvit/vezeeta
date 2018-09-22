import { connect } from 'react-redux';

import Confirmation from './Confirmation';
import { loadClinics, filterClinics } from '../../store/actions/clinics';
import { fetchConfirmations } from '../../store/actions/confirmations';

const mapStateToProps = (state) => ({
  clinics: state.clinics.list,
  filteredClinics: state.clinics.filteredList,
});

const mapDispatchToProps = (dispatch) => ({
  loadClinics: (clinics) => dispatch(loadClinics(clinics)),
  filterClinics: (clinics, filterData) =>
    dispatch(filterClinics(clinics, filterData)),
  fetchConfirmations: (keys) => dispatch(fetchConfirmations(keys)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
