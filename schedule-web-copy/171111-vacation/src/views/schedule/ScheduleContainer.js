import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '@vezeeta/web-components';

import Schedule from './Schedule';
import { MODAL_NAMES } from '../Constants';
import { loadClinics, filterClinics } from '../../store/actions/clinics';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedModal: null,
      modalData: {},
    };
  }

  componentWillMount() {
    this.props.loadClinics();
  }

  openModal = (modalName, modalData) => {
    if (MODAL_NAMES[modalName]) {
      this.setState(
        {
          openedModal: modalName,
          modalData,
        },
        showModal,
      );
    }
  };

  resetModalData = () => {
    this.setState({
      openedModal: null,
      modalData: {},
    });
  };

  render() {
    return (
      <Schedule
        openModal={this.openModal}
        resetModalData={this.resetModalData}
        openedModal={this.state.openedModal}
        modalData={this.state.modalData}
        clinics={this.props.clinics}
      />
    );
  }
}

ScheduleContainer.propTypes = {
  clinics: PropTypes.array,
  loadClinics: PropTypes.func,
};

const mapStateToProps = (state) => ({
  clinics: state.clinics.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadClinics: (clinics) => dispatch(loadClinics(clinics)),
  filterClinics: (clinics, filterData) =>
    dispatch(filterClinics(clinics, filterData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
