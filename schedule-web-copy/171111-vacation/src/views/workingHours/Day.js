import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { Heading, SwitchButton, LabelWithIcon } from '@vezeeta/web-components';

import Shift from './Shift';

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayDisable: this.props.disable,
      shifts: this.props.shifts.map((shift, index) => {
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
      this.setState({
        shifts: nextProps.shifts,
      });
    }
  }

  /**
   * Deletes a specific specialty from this.state.specialties and this.branch
   * @param {number} index
   */
  removeShift = (index) => {
    this.setState({
      shifts: update(this.state.shifts, { $splice: [[index, 1]] }),
    });
  };

  addShift = () => {
    const shiftsDefault = {
      key: this.state.shifts.length,
      details: {
        StartTime: null,
        EndTime: null,
        SlotDuration: null,
        SlotsPerShift: null,
        ScheduleId: null,
        AccountKey: null,
      },
    };
    this.setState({
      shifts: update(this.state.shifts, {
        $push: [shiftsDefault],
      }),
    });
  };

  toggleDay = (dayKey, isChecked) => {
    this.setState(
      {
        dayDisable: !isChecked,
      },
      () => {
        this.props.onChange(dayKey, isChecked);
      },
    );
  };

  render() {
    let shifts;
    let disableClass;
    const disableAddShiftButton = false;

    if (!this.state.dayDisable) {
      shifts = (
        <div className={classnames('shifts-container', disableClass)}>
          {this.state.shifts.map((shift, index) => (
            <Shift
              className="shift flex-row"
              key={Math.random()}
              shiftIndex={index}
              shiftDetails={shift.details}
              doctorTypeKey={this.props.doctorTypeKey}
              removeShift={this.removeShift}
              disable
            />
          ))}
          <LabelWithIcon
            onClick={this.addShift}
            disable={disableAddShiftButton}
          >
            Add shift
          </LabelWithIcon>
        </div>
      );
    } else {
      disableClass = 'disable';
    }

    return (
      <div className={classnames('day', this.props.className, disableClass)}>
        <div className="day-title-container flex-row">
          <Heading className="day-title">{this.props.dayName}</Heading>
          <SwitchButton
            htmlFor={this.props.dayName}
            onChange={(val) => this.toggleDay(this.props.dayKey, val)}
            isChecked={!this.props.disable}
          />
        </div>
        {shifts}
      </div>
    );
  }
}

Day.propTypes = {
  className: PropTypes.string,
  dayKey: PropTypes.number,
  onChange: PropTypes.func,
  dayName: PropTypes.string,
  shifts: PropTypes.array,
  doctorTypeKey: PropTypes.string,
  disable: PropTypes.bool,
};

Day.defaultProps = {
  className: '',
  disable: false,
};

export default Day;
