import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  loadVacation,
  createVacationFiltered,
} from '../../store/actions/vacation';
import { loadClinics } from '../../store/actions/clinics';
import Vacation from './Vacation';

const mapStateToProps = (state) => ({
  userType: state.user.type,
  vacationLoaded: state.vacation.loaded,
  vacationLoading: state.vacation.loading,
  filteredCreated: state.vacation.filteredCreated,
  clinicsLoaded: state.clinics.loaded,
  clinics: state.clinics,
  // state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadVacation,
      createVacationFiltered,
      loadClinics,
    },
    dispatch,
  );

class VacationContainer extends Component {
  constructor(props) {
    super(props);
    this.onClickAddVacation = this.onClickAddVacation.bind(this);
    this.state = {
      showAddVacation: false,
    };
  }

  componentDidMount() {
    console.log('VacationContainer37 loadVacation');
    this.props.loadClinics();
    if (
      !this.props.vacationLoaded &&
      !this.props.vacationLoading &&
      this.props.clinicsLoaded
    ) {
      this.props.loadVacation();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.vacationLoaded &&
      nextProps.clinicsLoaded &&
      !nextProps.filteredCreated
    ) {
      this.props.createVacationFiltered({ clinics: nextProps.clinics });
    }
    if (
      !nextProps.vacationLoaded &&
      !nextProps.vacationLoading &&
      nextProps.clinicsLoaded
    ) {
      this.props.loadVacation(nextProps.clinics);
    }
  }

  onClickAddVacation() {
    this.setState({
      showAddVacation: !this.state.showAddVacation,
    });
  }

  render() {
    const { userType } = this.props;
    console.log('VacationContainer56 clinics', this.props.clinics);
    return (
      <Vacation
        userType={userType}
        onClickAddVacation={this.onClickAddVacation}
        showAddVacation={this.state.showAddVacation}
        clinics={this.props.clinics.Clinics}
      />
    );
  }
}

VacationContainer.propTypes = {
  userType: PropTypes.string,
  vacationLoaded: PropTypes.bool,
  vacationLoading: PropTypes.bool,
  filteredCreated: PropTypes.bool,
  clinicsLoaded: PropTypes.bool,
  clinics: PropTypes.object,
  loadVacation: PropTypes.func,
  loadClinics: PropTypes.func,
  createVacationFiltered: PropTypes.func, // eslint-disable-line
  // state: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationContainer);
