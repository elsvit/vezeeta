import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, LazyLoading, Subheading } from '@vezeeta/web-components';

import { getDateRangeLabel } from '../../Helpers';
import { CONFIRMATION_SELECT_TYPES } from '../../Constants';
import Doctor from './Doctor';
import './Doctor.scss';
import './DoctorsList.scss';

class DoctorsList extends Component {
  /**
   * Get weeks checkbox list from doctor confirmation object
   * @param {object} doctorConfirmation
   */
  getConfirmationOptions = (doctorConfirmation) => {
    // Get third and force weeks dates
    const thirdWeekStartDate = new Date(doctorConfirmation.Model[2].From);
    const thirdWeekEndDate = new Date(doctorConfirmation.Model[2].To);
    const fourthWeekStartDate = new Date(doctorConfirmation.Model[3].From);
    const fourthWeekEndDate = new Date(doctorConfirmation.Model[3].To);

    // Generate range label for third and force weeks
    const thirdWeekLabel = getDateRangeLabel(
      thirdWeekStartDate,
      thirdWeekEndDate,
    );

    const fourthWeekLabel = getDateRangeLabel(
      fourthWeekStartDate,
      fourthWeekEndDate,
    );

    return [
      { label: 'Confirm all', isAllCheckbox: true },
      { id: CONFIRMATION_SELECT_TYPES.THIS_WEEK, label: 'This Week' },
      { id: CONFIRMATION_SELECT_TYPES.NEXT_WEEK, label: 'Next Week' },
      { id: CONFIRMATION_SELECT_TYPES.THIRD_WEEK, label: thirdWeekLabel },
      { id: CONFIRMATION_SELECT_TYPES.FOURTH_WEEK, label: fourthWeekLabel },
    ];
  };

  /**
   * Get selected dates from doctor confirmation object
   * @param {object} doctorConfirmation
   */
  getSelectedOptions = (doctorConfirmation) => {
    const selectedIds = [];
    const confirmationItemsIds = Object.values(CONFIRMATION_SELECT_TYPES);

    // Loop through doctor weeks model and return confirmed weeks
    doctorConfirmation.Model.forEach((confirmationItem, index) => {
      if (confirmationItem.IsConfirmed) {
        selectedIds.push(confirmationItemsIds[index]);
      }
    });
    const isAllSelected =
      selectedIds.length === doctorConfirmation.Model.length;

    return {
      isAllSelected,
      selectedIds,
    };
  };

  /**
   * Creates lazy loading doctor block
   */
  getLoadingDoctor = () => (
    <LazyLoading>
      <div className="confirmation-doctor-container no-animation">
        <div className="text doctor-name" />
        <div className="text doctor-room" />

        <div className="no-animation week-container">
          <div className="no-animation week">
            <div className="photo" />
            <div className="text" />
          </div>

          <div className="no-animation week">
            <div className="photo" />
            <div className="text" />
          </div>

          <div className="no-animation week">
            <div className="photo" />
            <div className="text" />
          </div>

          <div className="no-animation week">
            <div className="photo" />
            <div className="text" />
          </div>
        </div>
      </div>
    </LazyLoading>
  );

  /**
   * Render multiple loading list of doctor blocks
   */
  createLoadingDoctorsList = () => {
    const list = [];
    for (let counter = 0; counter < 5; counter += 1) {
      list.push(this.getLoadingDoctor());
    }
    return list;
  };

  render() {
    // Create a list of doctors
    const loadingDoctorsList = this.createLoadingDoctorsList();
    const doctorsList = this.props.doctorsConfirmations.map((doctorConfirmation) => (
      <Doctor
        key={`${doctorConfirmation.RoomKey}-${doctorConfirmation.AccountKey}`}
        name={doctorConfirmation.DoctorName}
        branch={doctorConfirmation.BranchName}
        room={doctorConfirmation.RoomName}
        confirmationOptions={this.getConfirmationOptions(doctorConfirmation)}
        selectedOptions={this.getSelectedOptions(doctorConfirmation)}
        accountKey={doctorConfirmation.AccountKey}
        roomKey={doctorConfirmation.RoomKey}
        changeSelectedOptions={this.props.changeSelectedOptions}
      />
    ));

    return (
      <div className="list--container">
        <div className="list--title-container">
          <Subheading className="list--title">Doctors to Confirm</Subheading>
          <Button
            onClick={this.props.saveConfirmations}
            className="list--btn"
            disable={this.props.isLoading}
            disableText="Save changes"
          >
            Save changes
          </Button>
        </div>
        <div className="list--content">
          {this.props.isLoading ? loadingDoctorsList : doctorsList}
        </div>
      </div>
    );
  }
}

DoctorsList.propTypes = {
  doctorsConfirmations: PropTypes.array,
  changeSelectedOptions: PropTypes.func,
  saveConfirmations: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default DoctorsList;
