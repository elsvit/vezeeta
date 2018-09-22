import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckboxList } from '@vezeeta/web-components';
import './Doctor.scss';

class Doctor extends Component {
  handleSelectChange = (value) => {
    const { changeSelectedOptions, accountKey, roomKey } = this.props;

    changeSelectedOptions(value, accountKey, roomKey);
  };

  render() {
    const {
      name,
      confirmationOptions,
      selectedOptions,
      branch,
      room,
    } = this.props;

    return (
      <div className="confirmation-doctor-container">
        <p className="confirmation-doctor-name">Doctor {name}</p>
        <p className="confirmation-doctor-speciality">
          {`${branch} - ${room}`}
        </p>
        <div className="confirmation-doctor-weeks-container">
          <CheckboxList
            items={confirmationOptions}
            selectedIds={selectedOptions}
            onChange={this.handleSelectChange}
          />
        </div>
      </div>
    );
  }
}

Doctor.propTypes = {
  name: PropTypes.string,
  confirmationOptions: PropTypes.array,
  selectedOptions: PropTypes.array,
  changeSelectedOptions: PropTypes.func,
  roomKey: PropTypes.string,
  accountKey: PropTypes.string,
  branch: PropTypes.string,
  room: PropTypes.string,
};

export default Doctor;
