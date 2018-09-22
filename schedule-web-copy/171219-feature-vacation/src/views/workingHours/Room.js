import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button,
  RadioButton,
  Spinner,
  ComboBox,
} from '@vezeeta/web-components';

import { saveWorkingHours } from '../../store/actions/room';
import { loadClinics } from '../../store/actions/clinics';
import Day from './Day';

const allowReservationWindow = [
  {
    data: {
      placeholder: 'Accept all bookings',
      value: -1,
      searchable: 'Accept all bookings',
    },
    component: <div>Accept all bookings</div>,
  },
  {
    data: {
      placeholder: 'By starting of working hours',
      value: 0,
      searchable: 'By starting of working hours',
    },
    component: <div>By starting of working hours</div>,
  },
  {
    data: {
      placeholder: '1 Hour before working hours',
      value: 1,
      searchable: '1 Hour before working hours',
    },
    component: <div>1 Hour before working hours</div>,
  },
  {
    data: {
      placeholder: '2 Hour before working hours',
      value: 2,
      searchable: '2 Hour before working hours',
    },
    component: <div>2 Hour before working hours</div>,
  },
  {
    data: {
      placeholder: '4 Hour before working hours',
      value: 4,
      searchable: '4 Hour before working hours',
    },
    component: <div>4 Hour before working hours</div>,
  },
  {
    data: {
      placeholder: '6 Hour before working hours',
      value: 6,
      searchable: '6 Hour before working hours',
    },
    component: <div>6 Hour before working hours</div>,
  },
  {
    data: {
      placeholder: '8 Hour before working hours',
      value: 8,
      searchable: '8 Hour before working hours',
    },
    component: <div>8 Hour before working hours</div>,
  },
  {
    data: {
      placeholder: 'Block same day bookings',
      value: 9,
      searchable: 'Block same day bookings',
    },
    component: <div>Block same day bookings</div>,
  },
];

const mapStateToProps = (state) => ({
  Loaded: state.room.loaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveWorkingHours,
      loadClinics,
    },
    dispatch,
  );

const shiftsDefault = {
  StartTime: null,
  EndTime: null,
  SlotDuration: null,
  SlotsPerShift: null,
  ScheduleId: null,
  AccountKey: null,
};

const allDays = {
  Sunday: null,
  Monday: null,
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: null,
  Saturday: null,
};

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDoctorType: this.props.selectedDoctorType,
      selectedRoomReservationWindow: this.props.selectedRoomReservationWindow,
      isLoading: false,
      isLoadingButton: false,
      days: this.getDays(props.room),
      doctorTypeKey: this.props.selectedDoctorType,
      roomDoctors: this.props.roomDoctors,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      days: this.getDays(nextProps.room),
      doctorTypeKey: nextProps.selectedDoctorType,
      roomDoctors: nextProps.roomDoctors,
    });
    if (this.props.Loaded !== true && this.state.isLoadingButton === nextProps.Loaded) {
      this.setState({
        isLoadingButton: !nextProps.Loaded,
      }, () => this.props.shouldComponentRestart());
    }
  }

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

  saveChanges = () => {
    const saveObject = {
      ActionMaker: 'Doctor',
      WeekDetails: [
        {
          DayOfWeek: 'Sunday',
          DayShifts: allDays.Sunday.state.dayDisable
            ? []
            : allDays.Sunday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
        {
          DayOfWeek: 'Monday',
          DayShifts: allDays.Monday.state.dayDisable
            ? []
            : allDays.Monday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
        {
          DayOfWeek: 'Tuesday',
          DayShifts: allDays.Tuesday.state.dayDisable
            ? []
            : allDays.Tuesday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
        {
          DayOfWeek: 'Wednesday',
          DayShifts: allDays.Wednesday.state.dayDisable
            ? []
            : allDays.Wednesday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
        {
          DayOfWeek: 'Thursday',
          DayShifts: allDays.Thursday.state.dayDisable
            ? []
            : allDays.Thursday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
        {
          DayOfWeek: 'Friday',
          DayShifts: allDays.Friday.state.dayDisable
            ? []
            : allDays.Friday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
        {
          DayOfWeek: 'Saturday',
          DayShifts: allDays.Saturday.state.dayDisable
            ? []
            : allDays.Saturday.state.allShifts
              .filter((shift) => shift !== undefined && shift !== null)
              .map((shift) => shift.state.shiftDetails.shift),
        },
      ],
    };
    const SetAllowReservationWindowObj = this.props.roomDoctors.map((doctor) => ({
      AccountKey: doctor.AccountKey,
      RoomKey: this.props.roomKey,
      AllowReservationWindow: this.blockVez.state.apiValue,
    }));
    const SetScheduleTypeObj = this.props.roomDoctors.map((doctor) => ({
      AccountKey: doctor.AccountKey,
      RoomKey: this.props.roomKey,
      ScheduleType: this.scheduleType.state.value,
    }));

    this.props.saveWorkingHours(saveObject, SetAllowReservationWindowObj, SetScheduleTypeObj);
    this.setState({
      selectedDoctorType: this.scheduleType.state.value,
      selectedRoomReservationWindow: this.blockVez.state.apiValue,
      isLoadingButton: true,
    });
  };

  render() {
    const daysRender = this.state.days.map((day) => (
      <Day
        className={day.name}
        key={day.key}
        ref={(ref) => {
          allDays[day.name] = ref;
        }}
        dayKey={day.key}
        dayName={day.name}
        disable={day.shifts.length === 0}
        shifts={day.shifts.length !== 0 ? day.shifts : [shiftsDefault]}
        doctorTypeKey={this.state.doctorTypeKey}
        roomDoctors={this.state.roomDoctors}
        roomKey={this.props.roomKey}
      />
    ));

    if (!this.state.isLoading) {
      return (
        <div className="list--container">
          <div className="list--title-container working-hours-list-title">

            <div className="working-hours-controls">
              <RadioButton
                options={this.props.doctorTypes}
                ref={(ref) => {
                  this.scheduleType = ref;
                }}
                selected={this.state.selectedDoctorType}
                listAlignment="flex-row"
              />
              <ComboBox
                className="blocks-input"
                items={allowReservationWindow}
                placeholder="Reservation Window Option"
                ref={(comboBox) => {
                  this.blockVez = comboBox;
                }}
                select={this.state.selectedRoomReservationWindow}
                noIcon
                noSearch
              />
            </div>

            <Button
              onClick={this.saveChanges}
              isLoading={this.state.isLoadingButton}
              // disable={this.state.isLoadingButton}
              // showLoadingOnClick
              LoadingText="Saving"
            >
              {'Save Changes'}
            </Button>
          </div>
          <div className="week-container">{daysRender}</div>
        </div>
      );
    }
    return (
      <div
        className="loading-container"
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
  room: PropTypes.array,
  roomKey: PropTypes.string,
  doctorTypes: PropTypes.array,
  roomDoctors: PropTypes.array,
  selectedDoctorType: PropTypes.number,
  selectedRoomReservationWindow: PropTypes.number,
  saveWorkingHours: PropTypes.func,
  shouldComponentRestart: PropTypes.func,
  Loaded: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
