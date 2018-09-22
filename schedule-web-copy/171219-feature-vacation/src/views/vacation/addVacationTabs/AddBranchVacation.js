import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Subheading, Checkbox, Button, GhostButton, DateInput, ComboBox } from '@vezeeta/web-components';

import {
  loadCountReservationInRange,
} from '../../../store/actions/vacation';

const mapStateToProps = (state) => ({
  reservationInRange: state.vacation.reservationInRange,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadCountReservationInRange,
    },
    dispatch,
  );

class AddVacationBranch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: '',
      showStartCalendar: false,
      endDate: '',
      showEndCalendar: false,
      clinics: this.props.clinics,
      branches: this.getBranchesSelect(this.props.clinics),
      rooms: this.getRoomsSelect(this.props.clinics, 'All Rooms'),
      doctors: this.getDoctorsSelect(
        this.props.clinics,
        { selectedBranch: 'All Branches', selectedRoom: 'All Rooms' },
      ),
      selectedBranch: 'All Branches',
      selectedRoom: 'All Rooms',
      sendSMS: false,
      vacationSaving: false,
      alertShow: false,
      alertText: '',
      canceledReservations: 0,
    };
  }

  /*
   * Change state, if props change
   * @param (string) this.props.clinics
   * @param (string) nextProps.clinics
   * @param (bool) this.props.vacationSaving
   * @param (bool) nextProps.vacationSaving
   * @param (array) this.props.reservationInRange
   * @param (array) nextProps.reservationInRange
   */
  componentWillReceiveProps(nextProps) {
    const newState = { ...this.state };
    let check = false;
    if (nextProps.clinics !== this.props.clinics) {
      const { clinics } = nextProps;
      newState.clinics = clinics;
      newState.branches = this.getBranchesSelect(clinics);
      newState.rooms = this.getRoomsSelect(clinics);
      newState.doctors = this.getDoctorsSelect(clinics);
      check = true;
    }
    if (nextProps.reservationInRange !== this.props.reservationInRange) {
      const resLen = nextProps.reservationInRange.length;
      let canceledReservations = 0;
      for (let i = 0; i < resLen; i += 1) {
        canceledReservations += +nextProps.reservationInRange[i].ReservationsCount;
      }
      newState.canceledReservations = canceledReservations;
      check = true;
    }
    if (nextProps.vacationSaving !== this.props.vacationSaving) {
      check = true;
      if (nextProps.vacationSaving === false) {
        newState.vacationSaving = nextProps.vacationSaving;
        newState.selectedBranch = 'All Branches';
      } else {
        newState.vacationSaving = nextProps.vacationSaving;
      }
    }
    if (check) {
      this.setState(newState);
    }
  }

  /*
   * Change StartDate
   * @param (obj) data
   */
  onChangeStartDate = (data) => {
    this.setState({
      startDate: data.date,
      showStartCalendar: data.date === '',
    });
  };

  /*
   * Change EndDate
   * @param (obj) data
   */
  onChangeEndDate = (data) => {
    this.setState({
      endDate: data.date,
      showEndCalendar: data.date === '',
    });
  };

  /*
   * check AddBranchVacation data, if ok > submit
   * @param (string) selectedRoom
   * @param (string) selectedDoctor
   * @param (string) startDate
   * @param (string) endDate
   * @param (bool) sendSMS
   * @param (bool) vacationSaving
   * @param (array) doctorsRooms
   */
  onClickAddBranchVacation = () => {
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

  /*
   * Change state (rooms, doctors...) if branch changed
   * @param (string) selectedBranch
   */
  onChangeBranch = (selectedBranch) => {
    this.setState({
      selectedBranch,
      selectedRoom: 'All Rooms',
      rooms: this.getRoomsSelect(this.state.clinics, selectedBranch),
      doctors: this.getDoctorsSelect(this.state.clinics, { selectedBranch, selectedRoom: 'All Rooms' }),
    });
    this.checkRequiredFieldChanged({ selectedBranch });
  }

  /*
   * Change state (doctors...) if room changed
   * @param (string) selectedRoom
   */
  onChangeRoom = (selectedRoom) => {
    const selectedBranch = (selectedRoom === 'All Rooms' || selectedRoom === undefined) ?
      this.state.selectedBranch :
      this.findBranch(selectedRoom);
    this.setState({
      selectedBranch,
      selectedRoom,
      doctors: this.getDoctorsSelect(
        this.state.clinics,
        { selectedBranch, selectedRoom },
      ),
    });
  };

  /*
   * get Branches By Clinics
   * @param (array) clinics
   * @return (arrays) branches
   */
  getBranchesSelect(clinics) {
    const branches = [
      {
        data: {
          placeholder: 'All Branches',
          value: 'All Branches',
          searchable: 'All Branches',
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

  /*
   * get Rooms
   * @param (array) clinics
   * @param (string) selectedBranch
   * @return (arrays) rooms
   */
  getRoomsSelect(clinics, selectedBranch = 'All Branches') {
    const rooms = [
      {
        data: {
          placeholder: 'All Rooms',
          value: 'All Rooms',
          searchable: 'All Rooms',
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

  /*
   * get DoctorsRooms
   * @param (array) clinics
   * @param (bool) selected
   * @return (arrays) doctors
   */
  getDoctorsSelect(clinics, selected) {
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

  /*
   * check RequiredFieldChanged if ok > loadCountReservationInRange
   * @param (obj) dataIn
   */
  checkRequiredFieldChanged(dataIn) {
    const startDate = dataIn.startDate || this.state.startDate;
    const endDate = dataIn.endDate || this.state.endDate;
    const selectedBranch = dataIn.selectedBranch || this.state.selectedBranch;
    const selectedRoom = dataIn.selectedRoom || this.state.selectedRoom;
    if (
      startDate !== '' &&
      endDate !== '' &&
      (selectedBranch !== 'All Branches' || selectedRoom !== 'All Rooms')
    ) {
      const data = this.getDoctorsSelect(this.state.clinics, { selectedBranch, selectedRoom });
      const dataLen = data.length;
      if (dataLen > 0) {
        for (let i = 0; i < dataLen; i += 1) {
          data[i].From = startDate;
          data[i].To = endDate;
        }
        this.props.loadCountReservationInRange(data);
      }
    }
  }

  /*
   * find Branch bu roomKey
   * @param (string) roomKey
   * @return (string) branchId
   */
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

  handleSendSMS = (val) => {
    this.setState({
      sendSMS: val,
    });
  };

  /*
   * show Alert
   * @param (string) err
   */
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

  /*
   * close Alert
   */
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
      alertShow,
      alertText,
      canceledReservations,
    } = this.state;

    return (
      <div className="vacation-tab-container">
        <div className="tab-block-container">
          <Subheading className="tab-headline">Select a branch</Subheading>
          <div className="tab-content--row">
            <ComboBox
              className="tab-combo-box"
              items={branches}
              select={selectedBranch}
              onChange={this.onChangeBranch}
              ref={(branch) => { this.branchField = branch; }}
              placeholder="Select branch"
              noIcon
            />
            <ComboBox
              className="tab-combo-box"
              items={rooms}
              select={selectedRoom}
              onChange={this.onChangeRoom}
              placeholder="Select room"
              noIcon
            />
          </div>
        </div>

        <div className="tab-block-container">
          <Subheading className="tab-headline">Select vacation duration</Subheading>
          <div className="tab-content--row">
            <DateInput
              className="tab-combo-box"
              placeholder="Choose start date"
              onChange={this.onChangeStartDate}
              minDate="01/01/2010"
              maxDate={this.state.endDate}
              date={this.state.startDate}
              showCalendar={this.state.showStartCalendar}
              label={this.state.startDate}
            />
            <DateInput
              placeholder="Choose end date"
              onChange={this.onChangeEndDate}
              minDate={this.state.startDate}
              maxDate="01/01/2020"
              date={this.state.endDate}
              showCalendar={this.state.showEndCalendar}
              label={this.state.endDate}
            />
          </div>
        </div>

        <div className="tab-block-container center">
          <Subheading className="tab-headline reservations-number"> {canceledReservations} Reservation Canceled</Subheading>
        </div>
        <div className="tab-block-container">
          <Checkbox
            label="Send SMS for Patient"
            isChecked={this.state.sendSMS}
            onChange={this.handleSendSMS}
            htmlFor=""
          />
        </div>
        <div className="tab-block-container tab-buttons-container" >
          <GhostButton
            className="cancel-btn vacation-button"
            onClick={this.props.onClickCancel}
          >
            Cancel
          </GhostButton>
          <Button
            className="bg-color-red vacation-button"
            onClick={this.onClickAddBranchVacation}
          >
            Add Vacation
          </Button>
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
  clinics: PropTypes.array,
  vacationSaving: PropTypes.bool,
  loadCountReservationInRange: PropTypes.func,
  reservationInRange: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVacationBranch);
