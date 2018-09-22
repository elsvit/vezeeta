import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { API } from '@vezeeta/web-utils';
import {
  Title,
  Button,
  RadioButton,
  Spinner,
  ComboBox,
} from '@vezeeta/web-components';

import Urls from '../../Urls';
import Day from './Day';

const shiftsDefault = {
  StartTime: null,
  EndTime: null,
  SlotDuration: null,
  SlotsPerShift: null,
  ScheduleId: null,
  AccountKey: null,
};

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      days: [],
      daysAvailability: [],
      doctorTypeKey: this.props.selectedDoctorType,
    };
  }

  componentDidMount() {
    const getWorkingHours = new API();
    const getWorkingHoursBody = [
      {
        AccountKey: 'accb6abfc111246987f',
        RoomKey: 'roomb68855803d2a1625',
      },
    ];
    const getWorkingHoursHeader = [
      {
        key: 'Language',
        value: 'ar-EG',
      },
    ];

    getWorkingHours
      .post(Urls.getWorkingHours, getWorkingHoursBody, getWorkingHoursHeader)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            isLoading: false,
            days: this.getDays(response.data[0].Model),
            daysAvailability: this.getDaysAvailability(response.data[0].Model),
          });
        }
      });
  }

  onChangeDoctorType = (val) => {
    this.setState({
      doctorTypeKey: val,
    });
  };

  getDays = (roomDays) => {
    const roomDaysArray = [];
    roomDays.map((roomDay, index) => {
      const roomDayModel = {
        key: index,
        name: roomDay.DayOfWeek,
        shifts: roomDay.DayShifts,
        disable: roomDay.DayShifts.length === 0,
      };
      roomDaysArray.push(roomDayModel);
    });
    return roomDaysArray;
  };

  getDaysAvailability = (roomDays) => {
    const daysAvailabilityArray = [];
    roomDays.map((roomDay, index) => {
      const dayAvailabilityModel = {
        key: index,
        disable: roomDay.DayShifts.length === 0,
      };
      daysAvailabilityArray.push(dayAvailabilityModel);
    });
    return daysAvailabilityArray;
  };

  updateDaysAvailability = (dayKey, isChecked) => {
    this.setState({
      daysAvailability: update(this.state.daysAvailability, {
        [dayKey]: { disable: { $set: !isChecked } },
      }),
    });

    if (this.state.days[dayKey].shifts.length === 0) {
      this.setState({
        days: update(this.state.days, {
          [dayKey]: {
            shifts: {
              $set: [shiftsDefault],
            },
          },
        }),
      });
    }
  };

  saveChanges = () => {
    console.log('saveChanges');
  };

  render() {
    const daysRender = this.state.days.map((day) => {
      if (day.shifts.length !== 0) {
        return (
          <Day
            className={day.name}
            key={day.key}
            dayKey={day.key}
            dayName={day.name}
            disable={this.state.daysAvailability[day.key].disable}
            shifts={day.shifts}
            doctorTypeKey={this.state.doctorTypeKey}
            onChange={this.updateDaysAvailability}
          />
        );
      }

      return (
        <Day
          className={day.name}
          key={day.key}
          dayKey={day.key}
          dayName={day.name}
          disable={this.state.daysAvailability[day.key].disable}
          shifts={[shiftsDefault]}
          doctorTypeKey={this.state.doctorTypeKey}
          onChange={this.updateDaysAvailability}
        />
      );
    });

    if (!this.state.isLoading) {
      return (
        <div className="room">
          <div className="room-title-container flex-row">
            <div className="flex-row top">
              <div className="room-titles-container flex-row">
                {/*
                  <Text className="doctor-name">
                  {`( ${this.props.doctorName} )`}
                  </Text>
                */}
                <Title className="room-title">{this.props.title}</Title>
              </div>
              <RadioButton
                options={this.props.doctorTypes}
                setData={(val) => this.onChangeDoctorType(val)}
                selected={this.props.selectedDoctorType}
                listAlignment="flex-row"
              />
              <ComboBox
                className="block-veez "
                placeholder="Options (Block Vez)"
                ref={(comboBox) => {
                  this.blockVez = comboBox;
                }}
                noIcon
              />
            </div>
            <Button onClick={this.saveChanges}>Save Changes</Button>
          </div>
          <div className="week-container">{daysRender}</div>
        </div>
      );
    }
    return (
      <div
        className="loading"
        ref={(spinner) => {
          this.spinner = spinner;
        }}
      >
        <Spinner />
      </div>
    );
  }
}

Room.propTypes = {
  title: PropTypes.string,
  doctorTypes: PropTypes.array,
  selectedDoctorType: PropTypes.string,
};

export default Room;
