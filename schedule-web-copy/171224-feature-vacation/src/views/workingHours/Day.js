import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { Heading, SwitchButton, LabelWithIcon } from '@vezeeta/web-components';

import Shift from './Shift';


const shiftsDefault = {
  key: 1,
  details: {
    StartTime: null,
    EndTime: null,
    SlotDuration: null,
    SlotsPerShift: null,
    ScheduleId: null,
    AccountKey: null,
  },
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingButton: props.isLoading,
      dayDisable: props.disable,
      allShifts: [],
      shifts: props.shifts.map((shift, index) => {
        const shiftDetails = {
          key: index,
          details: shift,
        };
        return shiftDetails;
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.shifts !== nextProps.shifts &&
      this.state.shifts.length === 0
    ) {
      this.getInputsValues();
      this.setState({
        shifts: nextProps.shifts,
      });
    }
    if (
      this.state.isLoadingButton !== nextProps.isLoading
    ) {
      this.setState({
        isLoadingButton: nextProps.isLoading,
      });
    }
  }

  shouldComponentUpdate(_, nextState) {
    if (
      this.state.isLoadingButton !== nextState.isLoadingButton && this.state.isLoadingButton === false
    ) {
      return false;
    }

    return true;
  }

  /**
   * Deletes a specific specialty from this.state.specialties and this.branch
   * @param {number} index
   */
  removeShift = (index) => {
    this.setState({
      shifts: update(this.state.shifts, { $splice: [[index, 1]] }),
      allShifts: update(this.state.allShifts, { $splice: [[index, 1]] }),
    });
  };

  addShift = () => {
    this.setState({
      shifts: update(this.state.shifts, {
        $push: [shiftsDefault],
      }),
    });
  };

  toggleDay = () => {
    const isChecked = this.switchButton.getCheckValue();
    this.setState({
      dayDisable: isChecked,
    });
  };

  render() {
    let disableClass;
    const disableAddShiftButton = false;

    const shifts = (
      this.state.shifts.map((shift, index) => (
        <Shift
          className="shift flex-row"
          key={shift.key}
          ref={(ref) => {
            this.state.allShifts[index] = ref;
          }}
          shiftIndex={index}
          shiftDetails={shift.details}
          doctorTypeKey={this.props.doctorTypeKey}
          removeShift={this.removeShift}
          roomDoctors={this.props.roomDoctors}
          roomKey={this.props.roomKey}
          disable
        />
      ))
    );

    if (!this.state.dayDisable) {
      disableClass = '';
    } else {
      disableClass = 'disable';
    }

    return (
      <div className={classnames('day', this.props.className, disableClass)}>
        <div className="day-title-container flex-row">
          <Heading className="day-title">{this.props.dayName}</Heading>
          <SwitchButton
            htmlFor={this.props.dayName}
            onChange={this.toggleDay}
            isChecked={!this.state.dayDisable}
            ref={(switchButton) => {
              this.switchButton = switchButton;
            }}
          />
        </div>

        <div className="shifts-container">
          {shifts}

          <LabelWithIcon
            onClick={this.addShift}
            disable={disableAddShiftButton}
          >
          Add shift
          </LabelWithIcon>
        </div>
      </div>
    );
  }
}

Day.propTypes = {
  className: PropTypes.string,
  dayName: PropTypes.string,
  shifts: PropTypes.array,
  roomDoctors: PropTypes.array,
  roomKey: PropTypes.string,
  doctorTypeKey: PropTypes.number,
  disable: PropTypes.bool,
  isLoading: PropTypes.bool,
};

Day.defaultProps = {
  className: '',
  disable: false,
};

export default Day;
