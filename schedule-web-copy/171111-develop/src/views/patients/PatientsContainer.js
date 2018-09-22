import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Patients from './Patients';
// import { changeTextForSearch } from '../../store/actions/patients';

const mapStateToProps = (state) => ({
  userType: state.user.type,
  patients: state.patients.Patients,
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // changeTextForSearch,
}, dispatch);

class PatientsContainer extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onClickEditPatient = this.onClickEditPatient.bind(this);
    this.onClickAddPatient = this.onClickAddPatient.bind(this);
    this.state = {
      textForSearch: '',
      showEditPatient: false,
      showAddPatient: false,
    };
  }

  onChangeSearch(textForSearch) {
    this.setState({
      textForSearch,
    });
  }

  onClickEditPatient(PatientKey) {
    console.log('onClickEditPatient39', PatientKey);
    this.setState({
      showEditPatient: true,
      showAddPatient: false,
    });
  }

  onClickAddPatient() {
    this.setState({
      showAddPatient: !this.state.showAddPatient,
      showEditPatient: false,
    });
  }

  closeEditPatient = () => {
    console.log('closeEditPatient');
    this.setState({
      showEditPatient: false,
    });
  }

  closeAddPatient = () => {
    console.log('closeAddPatient');
    this.setState({
      showAddPatient: false,
    });
  }

  submitAddPatient() {
    console.log('submitAddPatient');
  }

  submitEditPatient() {
    console.log('submitEditPatient');
  }

  render() {
    const { userType } = this.props;
    return (
      <Patients
        userType={userType}
        onChangeSearch={this.onChangeSearch}
        textForSearch={this.state.textForSearch}
        onClickAddPatient={this.onClickAddPatient}
        onClickEditPatient={this.onClickEditPatient}
        showAddPatient={this.state.showAddPatient}
        showEditPatient={this.state.showEditPatient}
        submitAddPatient={this.submitAddPatient}
        submitEditPatient={this.submitEditPatient}
        closeEditPatient={this.closeEditPatient}
        closeAddPatient={this.closeAddPatient}
      />
    );
  }
}

PatientsContainer.propTypes = {
  userType: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
