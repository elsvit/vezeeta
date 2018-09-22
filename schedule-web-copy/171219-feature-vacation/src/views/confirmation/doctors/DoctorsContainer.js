import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SnackBar } from '@vezeeta/web-components';

import {
  fetchConfirmations,
  saveConfirmations,
} from '../../../store/actions/confirmations';
import { CONFIRMATION_SELECT_TYPES } from '../../Constants';
import DoctorsList from './DoctorsList';
import ClinicsUtils from '../../utils/Clinics';

class DoctorsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorsConfirmations: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDoctors !== nextProps.selectedDoctors) {
      this.props.fetchConfirmations(nextProps.selectedDoctors);
    }

    if (this.props.confirmations !== nextProps.confirmations) {
      const clinicsData = ClinicsUtils.flattenClinics(nextProps.clinics);
      const branchesNames = ClinicsUtils.getBranchesNames(clinicsData.branches);
      const roomsNames = ClinicsUtils.getRoomNames(clinicsData.rooms);
      const doctorsNames = ClinicsUtils.getDoctorsNames(clinicsData.doctors);
      const confirmationItemsIds = Object.values(CONFIRMATION_SELECT_TYPES);

      this.setState({
        doctorsConfirmations: nextProps.confirmations.map((confirmation) => ({
          ...confirmation,
          Model: confirmation.Model.map((confirmationItem, index) => ({
            ...confirmationItem,
            From: confirmationItem.From.substring(0, 10),
            To: confirmationItem.To.substring(0, 10),
            id: confirmationItemsIds[index],
          })),
          BranchName: branchesNames[confirmation.RoomKey],
          RoomName: roomsNames[confirmation.RoomKey],
          DoctorName: doctorsNames[confirmation.AccountKey],
          DoctorSpecialty: 'Ophthalmology',
        })),
      });
    }

    // Show confirmation message with changes are saved
    if (nextProps.isConfirmationSaved) {
      this.snackBar.showSnackBar('Changes applied successfully');
    }
  }

  getDoctorsNames = () => {
    const res = {};
    this.props.selectedDoctors.map((doctor) => {
      res[doctor.AccountKey] = doctor.DoctorName;
    });
    return res;
  };

  changeSelectedOptions = (selectedValues, accountKey, roomKey) => {
    const doctorsConfirmations = this.state.doctorsConfirmations.map((confirmation) =>
      (confirmation.RoomKey === roomKey &&
        confirmation.AccountKey === accountKey
        ? {
          ...confirmation,
          Model: confirmation.Model.map((confirmationItem) => ({
            ...confirmationItem,
            IsConfirmed: selectedValues.includes(confirmationItem.id),
          })),
        }
        : confirmation));

    this.setState({
      doctorsConfirmations,
    });
  };

  handleSaveConfirmations = () => {
    this.props.saveConfirmations(this.state.doctorsConfirmations);
  };

  render() {
    return (
      <div>
        <DoctorsList
          doctorsConfirmations={this.state.doctorsConfirmations}
          changeSelectedOptions={this.changeSelectedOptions}
          saveConfirmations={this.handleSaveConfirmations}
          isLoading={this.props.isLoading}
        />
        <SnackBar
          ref={(snackBar) => {
            this.snackBar = snackBar;
          }}
        />
      </div>
    );
  }
}

DoctorsContainer.propTypes = {
  clinics: PropTypes.array,
  selectedDoctors: PropTypes.array,
  confirmations: PropTypes.array,
  fetchConfirmations: PropTypes.func,
  saveConfirmations: PropTypes.func,
  isLoading: PropTypes.bool,
  isConfirmationSaved: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  confirmations: state.confirmations.list,
  isLoading: state.confirmations.isLoading,
  isConfirmationSaved: state.confirmations.isConfirmationSaved,
});

const mapDispatchToProps = (dispatch) => ({
  fetchConfirmations: (keys) => dispatch(fetchConfirmations(keys)),
  saveConfirmations: (confirmations) =>
    dispatch(saveConfirmations(confirmations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsContainer);
