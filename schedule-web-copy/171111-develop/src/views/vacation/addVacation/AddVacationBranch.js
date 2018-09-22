import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ComboBox, Checkbox, Button } from '@vezeeta/web-components';

import DateInput from '../dateInput/DateInput';

class AddVacationBranch extends Component {
  constructor(props) {
    super(props);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onClickAddBranchVacation = this.onClickAddBranchVacation.bind(this);
    this.handleSendSMS = this.handleSendSMS.bind(this);
    this.state = {
      startDate: '',
      startCalendarShow: false,
      endDate: '',
      endCalendarShow: false,
      selectedBranch: 'All Branches',
      selectedRoom: 'All Rooms',
      branches: this.setBranchesCombo(this.props.clinics),
      rooms: this.setRoomsCombo(this.props.clinics, 'All Rooms'),
      sendSMS: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clinics !== this.props.clinics) {
      const { clinics } = nextProps;
      this.setState({
        branches: this.setBranchesCombo(clinics),
        rooms: this.setRoomsCombo(clinics),
      });
    }
  }

  onChangeStartDate(data) {
    this.setState({
      startDate: data.date,
      startCalendarShow: data.date === '',
    });
    console.log('AddVacationBranch42 onChangeStartDate date', data.date);
  }

  onChangeEndDate(data) {
    this.setState({
      endDate: data.date,
      endCalendarShow: data.date === '',
    });
  }

  onClickAddBranchVacation() {
    console.log('handleSelectRoom132 branch', this.state.selectedBranch, ' room', this.state.selectedRoom, ' sendSMS', this.state.sendSMS);
  }

  setBranchesCombo(clinics) {
    const branches = [
      {
        data: {
          placeholder: 'All Branches',
          value: 'All Branches',
          searchable: ['All Branches'],
        },
        component: <div>All Branches</div>,
      },
    ];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          const obj = {
            data: {
              placeholder: branchesArr[i2].BranchName,
              value: branchesArr[i2].BranchKey,
              searchable: [branchesArr[i2].BranchName],
            },
            component: <div>{ branchesArr[i2].BranchName }</div>,
          };
          branches.push(obj);
        }
      }
    }
    return branches;
  }

  setRoomsCombo(clinics, selectedBranch = 'All Branches') {
    const rooms = [
      {
        data: {
          placeholder: 'All Rooms',
          value: 'All Rooms',
          searchable: ['All Rooms'],
        },
        component: <div>All Rooms</div>,
      },
    ];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          const branchId = branchesArr[i2].BranchKey;
          if (selectedBranch === 'All Branches' || selectedBranch === branchId) {
            if (branchesArr[i2].Rooms) {
              const roomsArr = branchesArr[i2].Rooms;
              const roomsArrLen = roomsArr.length;
              for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
                const obj = {
                  data: {
                    placeholder: roomsArr[i3].RoomName,
                    value: roomsArr[i3].RoomKey,
                    searchable: [roomsArr[i3].RoomName],
                  },
                  component: <div>{ roomsArr[i3].RoomName }</div>,
                };
                rooms.push(obj);
              }
            }
          }
        }
      }
    }
    return rooms;
  }

  handleSelectBranch(val) {
    this.setState({
      selectedBranch: val,
      rooms: this.setRoomsCombo(this.props.clinics, val),
    });
  }

  handleSelectRoom(val) {
    this.setState({
      selectedRoom: val,
    });
    console.log('handleSelectRoom132', val);
  }

  handleSendSMS(val) {
    this.setState({
      sendSMS: val,
    });
  }

  render() {
    const { branches, rooms } = this.state;
    // const { clinics } = this.props;
    return (
      <div className={this.props.className} id="add-vacation-branch">
        <Text className="bold fs-20">Branch&Rooms</Text>
        <div className="add-vacation-branch-block">
          <div className="add-vacation-branch-select-branch">
            <ComboBox
              items={branches}
              placeholder="All Branches"
              setData={(val) => { this.handleSelectBranch(val); }}
              select=""
            />
          </div>
          <div className="add-vacation-branch-select-room">
            <ComboBox
              items={rooms}
              placeholder="All Rooms"
              setData={(val) => { this.handleSelectRoom(val); }}
              select=""
            />
          </div>
        </div>
        <div className="block">
          <hr className="separator block" />
        </div>
        <div className="add-vacation-doctor-inline block">
          <div className="add-vacation-doctor-select-date">
            <Text className="bold fs-20">From</Text>
            <DateInput
              className="input-date-label-class"
              placeholder="Input Start Date"
              onChange={this.onChangeStartDate}
              minDate="01/01/2000"
              maxDate={this.state.endDate}
              date={this.state.startDate}
              showCalendar={this.state.startCalendarShow}
              label={this.state.startDate}
            />
          </div>
        </div>
        <hr className="separator" />
        <div className="add-vacation-doctor-inline">
          <div className="add-vacation-doctor-select-date">
            <Text className="bold fs-20">To</Text>
            <div className="add-vacation-end-date">
              <DateInput
                className="input-date-label-class"
                placeholder="Input End Date"
                onChange={this.onChangeEndDate}
                minDate={this.state.startDate}
                maxDate="01/01/2100"
                date={this.state.endDate}
                showCalendar={this.state.endCalendarShow}
                label={this.state.endDate}
              />
            </div>
          </div>
        </div>
        <hr className="separator" />
        <div className="add-vacation-branch-block">
          <Text className="bold fs-20">100 Reservation Canceled</Text>
        </div>
        <div className="add-vacation-branch-block">
          <Checkbox
            label="Send SMS for Patient"
            isChecked={this.state.sendSMS}
            onChange={this.handleSendSMS}
            htmlFor=""
          />
        </div>
        <div className="add-vacation-branch-block" >
          <div className="add-vacation-branch-cancel" id="add-vacation-branch-cancel">
            <div className="add-vacation-button-left ">
              <Button
                className="fs-16 add-vacation-button-cancel"
                onClick={this.props.onClickCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div className="add-vacation-button-right" id="add-vacation-branch-add">
            <Button
              className="fs-16"
              onClick={this.onClickAddBranchVacation}
            >
              Add Vacation
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddVacationBranch.propTypes = {
  onClickCancel: PropTypes.func,
  className: PropTypes.string,
  clinics: PropTypes.array,
};

export default AddVacationBranch;

//     {
//       data: {
//         placeholder: 'All Branches',
//         value: 'All Branches',
//         searchable: ['All Branches'],
//       },
//       component: <div>All Branches</div>,
//     },
