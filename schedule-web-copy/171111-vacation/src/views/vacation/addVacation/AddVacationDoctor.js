import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox, Button, GhostButton, DateInput } from '@vezeeta/web-components';

import './AddVacation.scss';
import Select from '../../patients/select/Select';
import { getFirstObjByProp, getNumsObjInArrByProp } from '../../Helpers';

class AddVacationDoctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onClickAddDoctorVacation = this.onClickAddDoctorVacation.bind(this);
    this.handleSendSMS = this.handleSendSMS.bind(this);
    this.state = {
      startDate: '',
      showStartCalendar: false,
      endDate: '',
      showEndCalendar: false,
      clinics: this.props.clinics,
      branches: this.getBranchesByClinics(this.props.clinics),
      rooms: this.getRoomsByBranch(this.props.clinics, 'All Rooms'),
      doctors: this.getDoctorsByBranchAndRoom(
        this.props.clinics,
        { selectedBranch: 'All Branches', selectedRoom: 'All Rooms' },
      ),
      doctorsRooms: this.getDoctorsRooms(this.props.clinics),
      selectedBranch: 'All Branches',
      selectedRoom: 'All Rooms',
      selectedDoctor: 'All Doctors',
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
        branches: this.getBranchesByClinics(clinics),
        rooms: this.getRoomsByBranch(clinics),
        doctors: this.getDoctorsByBranchAndRoom(clinics),
        doctorsRooms: this.getDoctorsRooms(clinics),
      });
    }
    if (nextProps.vacationSaving !== this.props.vacationSaving) {
      if (nextProps.vacationSaving === false) {
        this.setState({
          vacationSaving: nextProps.vacationSaving,
          selectedDoctor: 'All Doctors',
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

  onClickAddDoctorVacation() {
    const {
      selectedRoom,
      selectedDoctor,
      startDate,
      endDate,
      sendSMS,
      vacationSaving,
      doctorsRooms,
    } = this.state;
    if (!vacationSaving) {
      const accountKey = selectedDoctor;
      const validation = startDate && endDate && accountKey;
      if (validation) {
        const vacation = [];
        if (selectedRoom === undefined || selectedRoom === 'All Rooms') {
          const docRomsObj = getFirstObjByProp(doctorsRooms, 'value', accountKey);
          const docRomsAr = docRomsObj.rooms;
          if (docRomsAr !== false) {
            const docRomsArLen = docRomsAr.length;
            for (let i = 0; i < docRomsArLen; i += 1) {
              const roomKey = docRomsAr[i];
              const data = {
                roomKey,
                accountKey,
                vacationFrom: startDate,
                vacationTo: endDate,
                sendSMS,
              };
              vacation.push(data);
            }
          }
        } else {
          const data = {
            roomKey: selectedRoom,
            accountKey,
            vacationFrom: startDate,
            vacationTo: endDate,
            sendSMS,
          };
          vacation.push(data);
        }
        this.props.submitAddVacation(vacation);
      } else {
        this.showAlert('Input Doctor, From and To date!!!');
      }
    } else {
      this.showAlert('Vacation is saving now!!!');
    }
  }

  onChangeBranch(selectedBranch) {
    this.setState({
      selectedBranch,
      selectedRoom: 'All Rooms',
      rooms: this.getRoomsByBranch(this.state.clinics, selectedBranch),
      doctors: this.getDoctorsByBranchAndRoom(this.state.clinics, { selectedBranch, selectedRoom: 'All Rooms' }),
      selectedDoctor: 'All Doctors',
    });
  }

  onChangeRoom(selectedRoom) {
    const selectedBranch = (selectedRoom === 'All Rooms' || selectedRoom === undefined) ?
      this.state.selectedBranch :
      this.findBranch(selectedRoom);
    this.setState({
      selectedBranch,
      selectedRoom,
      doctors: this.getDoctorsByBranchAndRoom(
        this.state.clinics,
        { selectedBranch, selectedRoom },
      ),
      selectedDoctor: 'All Doctors',
    });
  }

  onChangeDoctor(selectedDoctor) {
    this.setState({
      selectedDoctor,
    });
  }

  getBranchesByClinics(clinics) {
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

  getRoomsByBranch(clinics, selectedBranch = 'All Branches') {
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

  getDoctorsByBranchAndRoom(clinics, selected) {
    const selectedBranch = (selected && selected.selectedBranch) ? selected.selectedBranch : 'All Branches';
    const selectedRoom = (selected && selected.selectedRoom) ? selected.selectedRoom : 'All Rooms';
    const doctors = [
      {
        text: 'All Doctors',
        value: 'All Doctors',
      },
    ];
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
                      if (getFirstObjByProp(doctors, 'value', doctorArr[i4].AccountKey) === false) {
                        const obj = {
                          text: doctorArr[i4].DoctorName,
                          value: doctorArr[i4].AccountKey,
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
    }
    return doctors;
  }

  getDoctorsRooms(clinics) {
    const doctorsRooms = [];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          // const branchKey = branchesArr[i2].BranchKey;
          if (branchesArr[i2].Rooms) {
            const roomsArr = branchesArr[i2].Rooms;
            const roomsArrLen = roomsArr.length;
            for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
              const RoomKey = roomsArr[i3].RoomKey;
              if (roomsArr[i3].Doctors) {
                const doctorArr = roomsArr[i3].Doctors;
                const doctorArrLen = doctorArr.length;
                for (let i4 = 0; i4 < doctorArrLen; i4 += 1) {
                  const accountKey = doctorArr[i4].AccountKey;
                  const docKeyPosArr = getNumsObjInArrByProp(doctorsRooms, 'value', accountKey);
                  if (docKeyPosArr.length > 0) {
                    const docKeyPos = docKeyPosArr[0];
                    doctorsRooms[docKeyPos].rooms.push(RoomKey);
                  } else {
                    const obj = {
                      value: accountKey,
                    };
                    obj.rooms = [];
                    obj.rooms.push(RoomKey);
                    doctorsRooms.push(obj);
                  }
                }
              }
            }
          }
        }
      }
    }
    return doctorsRooms;
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

  findRoom(branchKey, accountKey) {
    const clinics = this.state.clinics || [];
    const clinicsLen = clinics.length;
    for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
      if (clinics[i1].Branches) {
        const branchesArr = clinics[i1].Branches;
        const branchesArrLen = branchesArr.length;
        for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
          const branchId = branchesArr[i2].BranchKey;
          if (branchId === branchKey || branchKey === 'All Branches' || branchKey === undefined) {
            if (branchesArr[i2].Rooms) {
              const roomsArr = branchesArr[i2].Rooms;
              const roomsArrLen = roomsArr.length;
              for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
                const roomKey = roomsArr[i3].RoomKey;
                if (roomsArr[i3].Doctors) {
                  const doctorsArr = roomsArr[i3].Doctors;
                  const doctorsArrLen = doctorsArr.length;
                  for (let i4 = 0; i4 < doctorsArrLen; i4 += 1) {
                    if (doctorsArr[i4].AccountKey === accountKey) {
                      return roomKey;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return 'All Rooms';
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
      doctors,
      selectedBranch,
      selectedRoom,
      selectedDoctor,
      vacationSaving,
      alertShow,
      alertText,
    } = this.state;
    const addVacationButtonClass = !vacationSaving ? 'fs-16' : 'fs-16 add-vacation-button-add-wait';
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
          <Text className="bold fs-20 add-vacation-subblock-100">Doctors</Text>
          <div className="add-vacation-subblock-100">
            <Select
              className="fs-18 grey-text bold"
              options={doctors}
              selectedValue={selectedDoctor}
              onChange={(doctorKey) => this.onChangeDoctor(doctorKey)}
              placeholder="Select doctor"
              maxRows={10}
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
        <div className="add-vacation-doctor-block vacation-helper-block-center">
          <Text className="bold fs-20">100 Reservation Canceled</Text>
        </div>
        <div className="fs-20 add-vacation-doctor-block">
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
          <div className="add-vacation-button-40 ">
            <GhostButton
              className="add-vacation-button-cancel"
              onClick={this.props.onClickCancel}
            >
              Cancel
            </GhostButton>
          </div>
          <div className="add-vacation-button-60">
            <Button
              className={addVacationButtonClass}
              onClick={this.onClickAddDoctorVacation}
            >
              Add Vacation
            </Button>
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

AddVacationDoctor.propTypes = {
  onClickCancel: PropTypes.func,
  submitAddVacation: PropTypes.func,
  className: PropTypes.string,
  clinics: PropTypes.array,
  vacationSaving: PropTypes.bool,
};

export default AddVacationDoctor;

// setBranchesCombo(clinics) {
//   const branches = [
//     {
//       data: {
//         placeholder: 'All Branches',
//         value: 'All Branches',
//         searchable: ['All Branches'],
//       },
//       component: <div>All Branches</div>,
//     },
//   ];
//   const clinicsLen = clinics.length;
//   for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
//     if (clinics[i1].Branches) {
//       const branchesArr = clinics[i1].Branches;
//       const branchesArrLen = branchesArr.length;
//       for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
//         const obj = {
//           data: {
//             placeholder: branchesArr[i2].BranchName,
//             value: branchesArr[i2].BranchKey,
//             searchable: [branchesArr[i2].BranchName],
//           },
//           component: <div>{ branchesArr[i2].BranchName }</div>,
//         };
//         branches.push(obj);
//       }
//     }
//   }
//   return branches;
// }
//
// setRoomsCombo(clinics, selectedBranch = 'All Branches') {
//   const rooms = [
//     {
//       data: {
//         placeholder: 'All Rooms',
//         value: 'All Rooms',
//         searchable: ['All Rooms'],
//       },
//       component: <div>All Rooms</div>,
//     },
//   ];
//   const clinicsLen = clinics.length;
//   for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
//     if (clinics[i1].Branches) {
//       const branchesArr = clinics[i1].Branches;
//       const branchesArrLen = branchesArr.length;
//       for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
//         const branchId = branchesArr[i2].BranchKey;
//         if (selectedBranch === 'All Branches' || selectedBranch === branchId) {
//           if (branchesArr[i2].Rooms) {
//             const roomsArr = branchesArr[i2].Rooms;
//             const roomsArrLen = roomsArr.length;
//             for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
//               const obj = {
//                 data: {
//                   placeholder: roomsArr[i3].RoomName,
//                   value: roomsArr[i3].RoomKey,
//                   searchable: [roomsArr[i3].RoomName],
//                 },
//                 component: <div>{ roomsArr[i3].RoomName }</div>,
//               };
//               rooms.push(obj);
//             }
//           }
//         }
//       }
//     }
//   }
//   return rooms;
// }
//
// setDoctorsCombo(
//   clinics,
//   selected,
// ) {
//   const selectedBranch = (selected && selected.selectedBranch) ? selected.selectedBranch : 'All Branches';
//   const selectedRoom = (selected && selected.selectedRoom) ? selected.selectedRoom : 'All Rooms';
//   console.log('setDoctorsCombo146 selectedBranch', selectedBranch, ' selectedRoom', selectedRoom);
//   const doctors = [
//     {
//       data: {
//         placeholder: 'All Doctors',
//         value: 'All Doctors',
//         searchable: ['All Doctors'],
//       },
//       component: <div>All Doctors</div>,
//     },
//   ];
//   const clinicsLen = clinics.length;
//   for (let i1 = 0; i1 < clinicsLen; i1 += 1) {
//     if (clinics[i1].Branches) {
//       const branchesArr = clinics[i1].Branches;
//       const branchesArrLen = branchesArr.length;
//       for (let i2 = 0; i2 < branchesArrLen; i2 += 1) {
//         const branchId = branchesArr[i2].BranchKey;
//         if (selectedBranch === 'All Branches' || selectedBranch === branchId) {
//           if (branchesArr[i2].Rooms) {
//             const roomsArr = branchesArr[i2].Rooms;
//             const roomsArrLen = roomsArr.length;
//             for (let i3 = 0; i3 < roomsArrLen; i3 += 1) {
//               const roomId = branchesArr[i2].RoomKey;
//               if (selectedRoom === 'All Rooms' || selectedRoom === roomId) {
//                 if (roomsArr[i3].Doctors) {
//                   const doctorArr = roomsArr[i3].Doctors;
//                   const doctorArrLen = doctorArr.length;
//                   for (let i4 = 0; i4 < doctorArrLen; i4 += 1) {
//                     const obj = {
//                       data: {
//                         placeholder: doctorArr[i4].DoctorName,
//                         value: doctorArr[i4].AccountKey,
//                         searchable: [doctorArr[i4].DoctorName],
//                       },
//                       component: <div>{ doctorArr[i4].DoctorName }</div>,
//                     };
//                     doctors.push(obj);
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   return doctors;
// }
