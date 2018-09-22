import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PatientsList from './PatientsList';

const mapStateToProps = (state) => ({
  patients: state.patients.Patients,
  patientsLoading: state.patients.loading,
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class PatientsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textForSearch: this.props.textForSearch,
    };
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
      patient.MobilePhone.toLowerCase().indexOf(textForSearch.toLowerCase()) !== -1 ||
      patient.PatientKey.toLowerCase().indexOf(textForSearch.toLowerCase()) !== -1
    ));

    return filteredPatients;
  }

  render() {
    const { patients, patientsLoading } = this.props;
    const { textForSearch } = this.state;
    const filteredPatients = this.findSearchedPatients(patients, textForSearch);
    return (
      <PatientsList
        patients={filteredPatients}
        patientsLoading={patientsLoading}
        openModal={this.props.openModal}
      />
    );
  }
}

PatientsListContainer.propTypes = {
  patients: PropTypes.array,
  patientsLoading: PropTypes.bool,
  openModal: PropTypes.func,
  textForSearch: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsListContainer);
