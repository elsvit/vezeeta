import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ComboBox, Text } from '@vezeeta/web-components';

import { searchPatients } from '../../store/actions/patients';

class PatientSearchContainer extends Component {
  componentWillMount() {
    this.props.searchPatients('');
  }

  onTyping = (keyword) => {
    this.props.searchPatients(keyword);
  };

  getPatientsComboData = () =>
    this.props.patients.map((patient) => ({
      data: {
        placeholder: patient.FullName,
        value: patient.PatientKey,
        searchable: [patient.FullName],
      },
      component: <Text>{patient.FullName}</Text>,
    }));

  render() {
    return (
      <ComboBox
        icon="search"
        iconWidth="16"
        items={this.getPatientsComboData()}
        placeholder="Search By Patient"
        onTyping={this.onTyping}
        onChange={this.props.onChange}
      />
    );
  }
}

PatientSearchContainer.propTypes = {
  patients: PropTypes.array,
  searchPatients: PropTypes.func,
  onChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  patients: state.patients.searchedList,
});

const mapDispatchToProps = (dispatch) => ({
  searchPatients: (keyword) => dispatch(searchPatients(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearchContainer);
