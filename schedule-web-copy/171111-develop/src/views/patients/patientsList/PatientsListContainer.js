import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { loadPatients } from '../../../store/actions/patients';
import PatientsList from './PatientsList';

const mapStateToProps = (state) => ({
  patients: state.patients.Patients,
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadPatients,
}, dispatch);

class PatientsListContainer extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearch = this.onChangeSearch.bind(this);
    this.state = {
      textForSearch: this.props.textForSearch,
    };
  }

  componentDidMount() {
    this.props.loadPatients();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.textForSearch !== nextProps.textForSearch) {
      this.setState({
        textForSearch: nextProps.textForSearch,
      });
    }
  }

  findSearchedPatients(patients, textForSearch) {
    const filteredPatients = patients.filter((patient) => (
      patient.FullName.toLowerCase().indexOf(textForSearch.toLowerCase()) !== -1 ||
      patient.MobilePhone.toLowerCase().indexOf(textForSearch.toLowerCase()) !== -1
    ));

    return filteredPatients;
  }

  render() {
    const { patients } = this.props;
    const { textForSearch } = this.state;
    const filteredPatients = this.findSearchedPatients(patients, textForSearch);
    return (
      <PatientsList
        patients={filteredPatients}
        onClickEditPatient={this.props.onClickEditPatient}
      />
    );
  }
}

PatientsListContainer.propTypes = {
  patients: PropTypes.array,
  loadPatients: PropTypes.func,
  onClickEditPatient: PropTypes.func,
  textForSearch: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsListContainer);
