import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ComboBox, Checkbox, Button } from '@vezeeta/web-components';

import DateInpute from '../dateInput/DateInput';

class AddVacationDoctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onClickAddDoctorVacation = this.onClickAddDoctorVacation.bind(this);
    this.handleSendSMS = this.handleSendSMS.bind(this);
    this.state = {
      startDate: '',
      showStartCalendar: false,
      endDate: '',
      showEndCalendar: false,
      sendSMS: false,
      selectedBranch: 'All Branches',
      selectedRoom: 'All Rooms',
      branches: this.setBranchesCombo(this.props.clinics),
      rooms: this.setRoomsCombo(this.props.clinics, 'All Rooms'),
      doctors: this.setDoctorsCombo(
        this.props.clinics,
        { selectedBranch: 'All Branches', selectedRoom: 'All Rooms' },
      ),
      selectedDoctor: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clinics !== this.props.clinics) {
      const { clinics } = nextProps;
      this.setState({
        branches: this.setBranchesCombo(clinics),
        rooms: this.setRoomsCombo(clinics),
        doctors: this.setDoctorsCombo(clinics),
      });
    }
  }

  onChangeStartDate(data) {
    this.setState({
      startDate: data.date,
      showStartCalendar: data.date === '',
    });
  }

  onChangeEndDate(data) {
    this.setState({
      endDate: data.date,
      showEndCalendar: data.date === '',
    });
  }

  onClickAddDoctorVacation() {
    console.log(
      'onClickAddDoctorVacation45 doctor',
      this.state.selectedBranch,
      this.state.selectedRoom,
      this.state.selectedDoctor,
      this.state.sendSMS,
    );
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

  setDoctorsCombo(
    clinics,
    selected,
  ) {
    const selectedBranch = (selected && selected.selectedBranch) ? selected.selectedBranch : 'All Branches';
    const selectedRoom = (selected && selected.selectedRoom) ? selected.selectedRoom : 'All Rooms';
    console.log('setDoctorsCombo146 selectedBranch', selectedBranch, ' selectedRoom', selectedRoom);
    const doctors = [
      {
        data: {
          placeholder: 'All Doctors',
          value: 'All Doctors',
          searchable: ['All Doctors'],
        },
        component: <div>All Doctors</div>,
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
                const roomId = branchesArr[i2].RoomKey;
                if (selectedRoom === 'All Rooms' || selectedRoom === roomId) {
                  if (roomsArr[i3].Doctors) {
                    const doctorArr = roomsArr[i3].Doctors;
                    const doctorArrLen = doctorArr.length;
                    for (let i4 = 0; i4 < doctorArrLen; i4 += 1) {
                      const obj = {
                        data: {
                          placeholder: doctorArr[i4].DoctorName,
                          value: doctorArr[i4].AccountKey,
                          searchable: [doctorArr[i4].DoctorName],
                        },
                        component: <div>{ doctorArr[i4].DoctorName }</div>,
                      };
                      doctors.push(obj);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return doctors;
  }

  findBranch(roomKey) {
    const clinics = this.props.clinics || [];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          const branchId = branchesArr[i2].BranchKey;
          if (branchesArr[i2].Rooms) {
            const roomsArr = branchesArr[i2].Rooms;
            const roomsArrLen = roomsArr.length;
            for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
              if (roomsArr[i3].RoomKey === roomKey) {
                return branchId;
              }
            }
          }
        }
      }
    }
    return false;
  }

  handleSelectBranch(selectedBranch) {
    this.setState({
      selectedBranch,
      selectedRoom: 'All Rooms',
      rooms: this.setRoomsCombo(this.props.clinics, selectedBranch),
      doctors: this.setDoctorsCombo(this.props.clinics, { selectedBranch, room: 'All Rooms' }),
    });
  }

  handleSelectRoom(selectedRoom) {
    let selectedBranch = this.state.selectedBranch;
    if (selectedBranch === 'All Branches' || !selectedBranch) {
      selectedBranch = this.findBranch(selectedRoom);
    }
    this.setState({
      selectedBranch,
      selectedRoom,
      doctors: this.setDoctorsCombo(
        this.props.clinics,
        { selectedBranch, selectedRoom },
      ),
    });
    console.log('handleSelectRoom199', selectedRoom, selectedBranch);
  }

  handleSelectDoctor(selectedDoctor) {
    this.setState({
      selectedDoctor,
    });
  }

  handleSendSMS(val) {
    this.setState({
      sendSMS: val,
    });
  }

  render() {
    const { branches, rooms, doctors } = this.state;
    return (
      <div className={this.props.className} id="add-vacation-doctor">
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
        <Text className="bold fs-20">Search</Text>
        <div className="add-vacation-doctor-block">
          <div className="add-vacation-doctor-search">
            <ComboBox
              items={doctors}
              placeholder="Search By Doctor"
              onChange={(val) => { this.handleSelectDoctor(val); }}
            />
          </div>
        </div>
        <div className="add-vacation-doctor-inline block">
          <div className="add-vacation-doctor-select-date">
            <Text className="bold fs-20">From</Text>
            <DateInpute
              className="input-date-label-class"
              placeholder="Input Start Date"
              onChange={this.onChangeStartDate}
              minDate="01/01/2000"
              maxDate={this.state.endDate}
              date={this.state.startDate}
              showCalendar={this.state.showStartCalendar}
              label={this.state.startDate}
            />
          </div>
        </div>
        <hr className="separator" />
        <div className="add-vacation-doctor-inline">
          <div className="add-vacation-doctor-select-date">
            <Text className="bold fs-20">To</Text>
            <div className="add-vacation-end-date">
              <DateInpute
                className="input-date-label-class"
                placeholder="Input End Date"
                onChange={this.onChangeEndDate}
                minDate={this.state.startDate}
                maxDate="01/01/2100"
                date={this.state.endDate}
                showCalendar={this.state.showEndCalendar}
                label={this.state.endDate}
              />
            </div>
          </div>
        </div>
        <hr className="separator" />
        <div className="add-vacation-doctor-block">
          <Text className="bold fs-20">100 Reservation Canceled</Text>
        </div>
        <div className="add-vacation-doctor-block">
          <Checkbox
            label="Send SMS for Patient"
            isChecked={this.state.sendSMS}
            onChange={this.handleSendSMS}
            htmlFor=""
          />
        </div>
        <div className="add-vacation-doctor-block" >
          <div className="add-vacation-doctor-cancel" id="add-vacation-doctor-cancel">
            <div className="add-vacation-button-left ">
              <Button
                className="fs-16 add-vacation-button-cancel"
                onClick={this.props.onClickCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div className="add-vacation-button-right" id="add-vacation-doctor-add">
            <Button
              className="fs-16"
              onClick={this.onClickAddDoctorVacation}
            >
              Add Vacation
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddVacationDoctor.propTypes = {
  onClickCancel: PropTypes.func,
  className: PropTypes.string,
  clinics: PropTypes.array,
};

export default AddVacationDoctor;
