import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subheading, CheckboxList } from '@vezeeta/web-components';

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
        <Subheading className="confirmation-doctor-name">
          Doctor {name}
        </Subheading>
        <Subheading className="confirmation-doctor-speciality">
          {`${branch} - ${room}`}
        </Subheading>
        <div className="confirmation-doctor-weeks-container">
          <CheckboxList
            items={confirmationOptions}
            isAllSelected={selectedOptions.isAllSelected}
            selectedIds={selectedOptions.selectedIds}
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
  selectedOptions: PropTypes.object,
  changeSelectedOptions: PropTypes.func,
  roomKey: PropTypes.string,
  accountKey: PropTypes.string,
  branch: PropTypes.string,
  room: PropTypes.string,
};

export default Doctor;
