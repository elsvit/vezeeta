import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  loadVacation,
  createVacationFiltered,
  setVacation,
} from '../../store/actions/vacation';
import Vacation from './Vacation';

const mapStateToProps = (state) => ({
  vacationLoaded: state.vacation.loaded,
  vacationLoading: state.vacation.loading,
  vacation: state.vacation.Vacation,
  newFiltered: state.vacation.newFiltered,
  setVacationSaving: state.vacation.setVacationSaving,
  setVacationSaved: state.vacation.setVacationSaved,
  filteredCreated: state.vacation.filteredCreated,
  clinicsLoaded: state.clinics.loaded,
  clinics: state.clinics,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadVacation,
      createVacationFiltered,
      setVacation,
    },
    dispatch,
  );

class VacationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setVacationSaving: this.props.setVacationSaving,
      setVacationSaved: this.props.setVacationSaved,
    };
  }
  /*
   * Load Vacation
   */
  componentDidMount() {
    if (
      !this.props.vacationLoaded &&
      !this.props.vacationLoading &&
      this.props.clinicsLoaded
    ) {
      this.props.loadVacation();
    }
  }

  /*
   * Change state, if props change
   * @param (bool) nextProps.vacationLoaded
   * @param (bool) nextProps.vacationLoading
   * @param (bool) nextProps.clinicsLoaded
   * @param (bool) nextProps.filteredCreated
   * @param (bool) nextProps.setVacationSaving
   * @param (bool) nextProps.setVacationSaved
   * @param (obj) nextProps.clinics
   * @param (obj) this.props.clinics
   * @param (obj) nextProps.clinics
   * @param (obj) this.props.vacation
   * @param (obj) nextProps.vacation
   * @param (bool) nextProps.newFiltered
   */
  componentWillReceiveProps(nextProps) {
    let check = false;
    const newState = Object.assign({}, this.state);
    if (
      nextProps.vacationLoaded &&
      nextProps.clinicsLoaded &&
      !nextProps.filteredCreated
    ) {
      this.props.createVacationFiltered({ clinics: nextProps.clinics });
    } else if (
      nextProps.vacationLoaded &&
      nextProps.clinicsLoaded &&
      this.props.vacation !== nextProps.vacation
    ) {
      this.props.createVacationFiltered({ clinics: this.props.clinics });
    } else if (nextProps.newFiltered) {
      this.props.createVacationFiltered({ clinics: nextProps.clinics });
    }
    if (
      !nextProps.vacationLoaded &&
      !nextProps.vacationLoading &&
      nextProps.clinicsLoaded
    ) {
      this.props.loadVacation(nextProps.clinics);
    }
    if (nextProps.setVacationSaving !== this.state.setVacationSaving) {
      newState.setVacationSaving = nextProps.setVacationSaving;
      check = true;
    }
    if (nextProps.setVacationSaved !== this.state.setVacationSaved) {
      newState.setVacationSaved = nextProps.setVacationSaved;
      check = true;
    }
    if (check) {
      this.setState(newState);
    }
  }
  /*
   * Show Modal AddVacation
   */
  onClickAddVacation = () => {
    if (this.modalCont) {
      this.modalCont.showModal();
    }
  };
  /*
   * Hide Modal AddVacation
   */
  onHideAddVacation = () => {
    if (this.modalCont) {
      this.modalCont.hideModal();
    }
  };
  /*
   * Set Vacation
   * @param (object) vacation
   */
  submitAddVacation = (vacation) => {
    if (!this.state.setVacationSaving) {
      this.props.setVacation(vacation);
    }
  };

  render() {
    return (
      <Vacation
        ref={(modalCont) => {
          this.modalCont = modalCont;
        }}
        onClickAddVacation={this.onClickAddVacation}
        submitAddVacation={this.submitAddVacation}
        onHide={this.onHideAddVacation}
        setVacationSaving={this.state.setVacationSaving}
        clinics={this.props.clinics.Clinics}
      />
    );
  }
}

VacationContainer.propTypes = {
  vacationLoaded: PropTypes.bool,
  vacationLoading: PropTypes.bool,
  setVacationSaving: PropTypes.bool,
  setVacationSaved: PropTypes.bool,
  vacation: PropTypes.array,
  newFiltered: PropTypes.bool,
  filteredCreated: PropTypes.bool,
  clinicsLoaded: PropTypes.bool,
  clinics: PropTypes.object,
  loadVacation: PropTypes.func,
  setVacation: PropTypes.func,
  createVacationFiltered: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationContainer);
