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
  startDate: state.vacation.startDate,
  endDate: state.vacation.endDate,
  minDateDefault: state.vacation.minDateDefault,
  maxDateDefault: state.vacation.maxDateDefault,
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
      selectedDoctors: [],
      startDate: this.props.minDateDefault,
      endDate: this.props.maxDateDefault,
    };
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
   * @param (string) nextProps.startDate
   * @param (string) nextProps.endDate
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
    if (nextProps.setVacationSaving !== this.state.setVacationSaving) {
      newState.setVacationSaving = nextProps.setVacationSaving;
      check = true;
    }
    if (nextProps.setVacationSaved !== this.state.setVacationSaved) {
      newState.setVacationSaved = nextProps.setVacationSaved;
      check = true;
    }
    if (nextProps.startDate !== this.props.startDate) {
      newState.startDate = nextProps.startDate;
      check = true;
    }
    if (nextProps.endDate !== this.props.endDate) {
      newState.endDate = nextProps.endDate;
      check = true;
    }
    if (check) {
      this.setState(newState);
    }
  }

  componentDidUpdate(_, prevState) {
    if (
      this.props.clinicsLoaded &&
      (prevState.selectedDoctors !== this.state.selectedDoctors ||
      prevState.startDate !== this.state.startDate ||
      prevState.endDate !== this.state.endDate)
    ) {
      this.props.loadVacation(
        this.props.clinics.Clinics,
        this.state.selectedDoctors,
        this.state.startDate,
        this.state.endDate,
      );
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

  handleFilterChange = (selectedDoctors) => {
    this.setState({
      selectedDoctors,
    });
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

  // /*
  //  * Confirm Delete Vacation
  //  * @param (string) vacationId
  //  */
  // confirmDeleteVacation = () => {
  //   console.log('confirmDelVacation162');
  // };

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
        handleFilterChange={this.handleFilterChange}
      />
    );
  }
}

VacationContainer.propTypes = {
  vacationLoaded: PropTypes.bool,
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
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  minDateDefault: PropTypes.string,
  maxDateDefault: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationContainer);
