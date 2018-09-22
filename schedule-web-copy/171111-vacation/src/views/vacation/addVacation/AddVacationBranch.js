import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox, Button, GhostButton, DateInput } from '@vezeeta/web-components';

import './AddVacation.scss';
import Select from '../../patients/select/Select';

class AddVacationBranch extends Component {
  constructor(props) {
    super(props);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onClickAddBranchVacation = this.onClickAddBranchVacation.bind(this);
    this.handleSendSMS = this.handleSendSMS.bind(this);
    this.state = {
      startDate: '',
      showStartCalendar: false,
      endDate: '',
      showEndCalendar: false,
      clinics: this.props.clinics,
      branches: this.setBranchesSelect(this.props.clinics),
      rooms: this.setRoomsSelect(this.props.clinics, 'All Rooms'),
      doctors: this.setDoctorsSelect(
        this.props.clinics,
        { selectedBranch: 'All Branches', selectedRoom: 'All Rooms' },
      ),
      selectedBranch: 'All Branches',
      selectedRoom: 'All Rooms',
      sendSMS: false,
      vacationSaving: this.props.vacationSaving,
      alertShow: false,
      alertText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clinics !== this.props.clinics) {
      const { clinics } = nextProps;
      this.setState({
        clinics,
        branches: this.setBranchesSelect(clinics),
        rooms: this.setRoomsSelect(clinics),
        doctors: this.setDoctorsSelect(clinics),
      });
    }
    if (nextProps.vacationSaving !== this.props.vacationSaving) {
      if (nextProps.vacationSaving === false) {
        this.setState({
          vacationSaving: nextProps.vacationSaving,
          selectedBranch: 'All Branches',
        });
      } else {
        this.setState({
          vacationSaving: nextProps.vacationSaving,
        });
      }
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

  onClickAddBranchVacation() {
    const {
      doctors,
      selectedBranch,
      startDate,
      endDate,
      sendSMS,
      vacationSaving,
    } = this.state;
    if (!vacationSaving) {
      const validation = startDate && endDate && doctors.length > 0;
      if (validation) {
        const doctorsLen = doctors.length;
        const vacation = [];
        for (let i = 0; i < doctorsLen; i += 1) {
          const roomKey = doctors[i].roomKey;
          const accountKey = doctors[i].accountKey;
          const data = {
            branchKey: selectedBranch,
            roomKey,
            accountKey,
            vacationFrom: startDate,
            vacationTo: endDate,
            sendSMS,
          };
          vacation.push(data);
        }
        this.props.submitAddVacation(vacation);
      } else {
        this.showAlert('Input Branch, Room, From and To Date!');
      }
    } else {
      this.showAlert('Vacation is saving now!');
    }
  }

  onChangeBranch(selectedBranch) {
    this.setState({
      selectedBranch,
      selectedRoom: 'All Rooms',
      rooms: this.setRoomsSelect(this.state.clinics, selectedBranch),
      doctors: this.setDoctorsSelect(this.state.clinics, { selectedBranch, selectedRoom: 'All Rooms' }),
    });
  }

  onChangeRoom(selectedRoom) {
    const selectedBranch = (selectedRoom === 'All Rooms' || selectedRoom === undefined) ?
      this.state.selectedBranch :
      this.findBranch(selectedRoom);
    this.setState({
      selectedBranch,
      selectedRoom,
      doctors: this.setDoctorsSelect(
        this.state.clinics,
        { selectedBranch, selectedRoom },
      ),
    });
  }

  setBranchesSelect(clinics) {
    const branches = [
      {
        text: 'All Branches',
        value: 'All Branches',
      },
    ];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          const obj = {
            text: branchesArr[i2].BranchName,
            value: branchesArr[i2].BranchKey,
          };
          branches.push(obj);
        }
      }
    }
    return branches;
  }

  setRoomsSelect(clinics, selectedBranch = 'All Branches') {
    const rooms = [
      {
        text: 'All Rooms',
        value: 'All Rooms',
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
                  text: roomsArr[i3].RoomName,
                  value: roomsArr[i3].RoomKey,
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

  setDoctorsSelect(clinics, selected) {
    const selectedBranch = (selected && selected.selectedBranch) ? selected.selectedBranch : 'All Branches';
    const selectedRoom = (selected && selected.selectedRoom) ? selected.selectedRoom : 'All Rooms';
    const doctors = [];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          const branchKey = branchesArr[i2].BranchKey;
          if (selectedBranch === branchKey || selectedBranch === 'All Branches' || selectedBranch === undefined) {
            if (branchesArr[i2].Rooms) {
              const roomsArr = branchesArr[i2].Rooms;
              const roomsArrLen = roomsArr.length;
              for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
                const RoomKey = roomsArr[i3].RoomKey;
                if (selectedRoom === RoomKey || selectedRoom === 'All Rooms' || selectedRoom === undefined) {
                  if (roomsArr[i3].Doctors) {
                    const doctorArr = roomsArr[i3].Doctors;
                    const doctorArrLen = doctorArr.length;
                    for (let i4 = 0; i4 < doctorArrLen; i4 += 1) {
                      const obj = {
                        roomKey: RoomKey,
                        accountKey: doctorArr[i4].AccountKey,
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
    const clinics = this.state.clinics || [];
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
    return 'All Branches';
  }

  handleSendSMS(val) {
    this.setState({
      sendSMS: val,
    });
  }

  showAlert = (err) => {
    this.setState({
      alertShow: true,
      alertText: err,
    });
    setTimeout(() => {
      this.setState({
        alertShow: false,
        alertText: '',
      });
    }, 5000);
  }

  closeAlert = () => {
    this.setState({
      alertShow: false,
      alertText: '',
    });
  }

  render() {
    const {
      branches,
      rooms,
      selectedBranch,
      selectedRoom,
      vacationSaving,
      alertShow,
      alertText,
    } = this.state;
    const addVacationButtonClass = !vacationSaving ? ' fs-18' : ' fs-18 bald add-vacation-button-add-wait';
    return (
      <div className={this.props.className}>
        <div className="add-vacation-doctor-block">
          <Text className="bold fs-20 add-vacation-subblock-100">Branch&Rooms</Text>
          <div className="add-vacation-subblock-50-left">
            <Select
              className="fs-18 grey-text bold"
              options={branches}
              selectedValue={selectedBranch}
              onChange={this.onChangeBranch}
              placeholder="Select branch"
            />
          </div>
          <div className="add-vacation-subblock-50-right">
            <Select
              className="fs-18 grey-text bold"
              options={rooms}
              selectedValue={selectedRoom}
              onChange={this.onChangeRoom}
              placeholder="Select room"
            />
          </div>
        </div>
        <div className="add-vacation-doctor-block">
          <Text className="bold fs-20 add-vacation-subblock-100">From</Text>
          <div className="add-vacation-doctor-select-date add-vacation-subblock-100">
            <DateInput
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
        <div className="add-vacation-separator" />
        <div className="add-vacation-doctor-block">
          <Text className="bold fs-20 add-vacation-subblock-100">To</Text>
          <div className="add-vacation-subblock-100">
            <DateInput
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
        <div className="add-vacation-separator" />
        <div className="add-vacation-doctor-block">
          <Text className="bold fs-20">100 Reservation Canceled</Text>
        </div>
        <div className="add-vacation-doctor-block">
          <div className="add-vacation-checkbox">
            <Checkbox
              label="Send SMS for Patient"
              isChecked={this.state.sendSMS}
              onChange={this.handleSendSMS}
              htmlFor=""
            />
          </div>
        </div>
        <div className="add-vacation-doctor-block" >
          <div className="add-vacation-button-40">
            <GhostButton
              className="fs-18 bold add-vacation-button-cancel"
              onClick={this.props.onClickCancel}
            >
              Cancel
            </GhostButton>
          </div>
          <div className="fs-18 bold add-vacation-button-right">
            <div className="add-vacation-button-60">
              <Button
                className={addVacationButtonClass}
                onClick={this.onClickAddBranchVacation}
              >
                Add Vacation
              </Button>
            </div>
          </div>
        </div>
        <div
          className={alertShow ? 'vacation-alert-popup-show' : 'vacation-alert-popup-hide'}
          onClick={this.closeAlert}
          onKeyDown={() => {}}
        >
          {alertText}
        </div>
      </div>
    );
  }
}

AddVacationBranch.propTypes = {
  onClickCancel: PropTypes.func,
  submitAddVacation: PropTypes.func,
  className: PropTypes.string,
  clinics: PropTypes.array,
  vacationSaving: PropTypes.bool,
};

export default AddVacationBranch;
