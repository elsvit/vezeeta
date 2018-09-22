import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from '@vezeeta/web-components';

import { getDateRangeLabel } from '../../Helpers';
import { CONFIRMATION_SELECT_TYPES } from '../../Constants';
import Doctor from './Doctor';
import './DoctorsList.scss';

class DoctorsList extends Component {
  getConfirmationOptions = (doctorConfirmation) => {
    const thirdWeekStartDate = new Date(doctorConfirmation.Model[2].From);
    const thirdWeekEndDate = new Date(doctorConfirmation.Model[2].To);
    const fourthWeekStartDate = new Date(doctorConfirmation.Model[3].From);
    const fourthWeekEndDate = new Date(doctorConfirmation.Model[3].To);
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

  getSelectedOptions = (doctorConfirmation) => {
    const res = [];
    const confirmationItemsIds = Object.values(CONFIRMATION_SELECT_TYPES);

    doctorConfirmation.Model.forEach((confirmationItem, index) => {
      if (confirmationItem.IsConfirmed) {
        res.push(confirmationItemsIds[index]);
      }
    });

    return res;
  };

  render() {
    // TODO: send dynamic room and branches
    const doctorsList = this.props.doctorsConfirmations.map((doctorConfirmation) => (
      <Doctor
        key={`${doctorConfirmation.RoomKey}-${doctorConfirmation.AccountKey}`}
        name={doctorConfirmation.DoctorName}
        branch="Helioplis"
        room="Room 1"
        confirmationOptions={this.getConfirmationOptions(doctorConfirmation)}
        selectedOptions={this.getSelectedOptions(doctorConfirmation)}
        accountKey={doctorConfirmation.AccountKey}
        roomKey={doctorConfirmation.RoomKey}
        changeSelectedOptions={this.props.changeSelectedOptions}
      />
    ));

    const loading = (
      <div className="confirmations-loading">
        <Spinner />
      </div>
    );

    return (
      <div className="list--container">
        <div className="list--title-container">
          <span className="list--title">Doctors to Confirm</span>
          <Button
            onClick={this.props.saveConfirmations}
            className="confirmation-doctors-title-btn"
          >
            Save Changes
          </Button>
        </div>
        <div>{this.props.isLoading ? loading : doctorsList}</div>
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
