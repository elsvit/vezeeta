import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Filter } from '@vezeeta/web-components';
import {
  setVacationFilterSelectedBranch,
  setVacationFilterSelectedRooms,
  setVacationFilterSelectedDoctors,
  createVacationFiltered,
} from '../../../store/actions/vacation';

const mapStateToProps = (state) => ({
  vacationFiltered: state.vacation.Filtered,
  filteredCreated: state.clinics.filteredCreated,
  clinics: state.clinics,
  selectedBranch: state.vacation.Filtered.branches.selectedValue,
  selectedRooms: state.vacation.Filtered.rooms.selectedIds,
  selectedDoctors: state.vacation.Filtered.doctors.selectedIds,
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setVacationFilterSelectedBranch,
  setVacationFilterSelectedRooms,
  setVacationFilterSelectedDoctors,
  createVacationFiltered,
}, dispatch);

class VacationFilterContainer extends Component {
  // componentDidMount() {
  //   console.log('VacationFilterContainer33 selectedBranch', this.props.selectedBranch);
  //   if (!this.props.selectedBranch) {
  //     console.log('VacationFilterContainer35 selectedBranch', this.props.selectedBranch);
  //     // this.props.createVacationFiltered({ clinics: this.props.clinics,  });
  //     this.props.setVacationFilterSelectedBranch('All Branches');
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   // const { clinics, selectedBranch, selectedRooms } = this.props;
  //   if (!this.props.selectedBranch && nextProps.selectedBranch === 'All Branches') {
  //     this.props.setVacationFilterSelectedBranch('All Branches');
  //     console.log('componentWillReceiveProps46 selectedBranch', this.props.selectedBranch, 'nxtProps', nextProps.selectedBranch);
  //   }
  //   // if (nextProps.selectedBranch !== this.props.selectedBranch) {
  //   //   console.log('componentWillReceiveProps34 Branches', nextProps.selectedBranch); // eslint-disable-line
  //   //   this.props.createVacationFiltered({clinics, branches: nextProps.selectedBranch});
  //   // } else if (nextProps.selectedRooms !== this.props.selectedRooms) {
  //   //   console.log('componentWillReceiveProps38 Rooms', nextProps.selectedRooms); // eslint-disable-line
  //   //   this.props.createVacationFiltered({clinics, branches: this.props.selectedBranch, rooms: nextProps.selectedRooms});
  //   // } else if (nextProps.selectedDoctors !== this.props.selectedDoctors) {
  //   //
  //   // }
  // }

  onChangeFilter = (data) => {
    const {
      clinics,
      selectedBranch,
      selectedRooms,
      selectedDoctors,
    } = this.props;
    console.log('VacationFilterContainer65 onChangeFilter data', data, ' selectedBranch', selectedBranch, ' selectedRooms', selectedRooms, ' selectedDoctors', selectedDoctors); // eslint-disable-line
    if (data.Branches !== undefined && data.Branches !== selectedBranch) {
      console.log('VacationFilterContainer67 Branches', data.Branches); // eslint-disable-line
      // this.props.setVacationFilterSelectedBranch(data.Branches);
      this.props.createVacationFiltered({
        clinics,
        branches: data.Branches,
      });
    } else if (data.Rooms !== undefined && data.Rooms.length !== selectedRooms.length) {
      console.log('VacationFilterContainer74 Rooms', data.Rooms, data.Rooms.length, selectedRooms.length); // eslint-disable-line
      // this.props.setVacationFilterSelectedRooms(data.Rooms);
      this.props.createVacationFiltered({
        clinics,
        branches: this.props.selectedBranch,
        rooms: data.Rooms,
      });
    } else if (data.Doctors !== undefined && data.Doctors.length !== selectedDoctors.length) {
      console.log('VacationFilterContainer82 Doctors', data.Doctors); // eslint-disable-line
      // this.props.setVacationFilterSelectedDoctors(data.Doctors);
      this.props.createVacationFiltered({
        clinics,
        branches: this.props.selectedBranch,
        rooms: this.props.selectedRooms,
        doctors: data.Doctors,
      });
    }
  }

  createBranchesSection(vacationFiltered) {
    // const selectedValue = !vacationFiltered.branches.selectedValue ? 'All Branches' : vacationFiltered.branches.selectedValue;
    const selectedValue = vacationFiltered.branches.selectedValue;
    // const checkStart = !vacationFiltered.branches.selectedValue;
    const branchesSection = {
      type: vacationFiltered.branches.type,
      name: vacationFiltered.branches.name,
      placeholder: vacationFiltered.branches.placeholder,
      filters: [
        {
          data: {
            placeholder: 'All Branches',
            value: 'All Branches',
            searchable: ['All Branches'],
            selectedValue: 'All Branches',
          },
          component: <div>All Branches</div>,
        },
      ],
      selectedValue,
    };

    const branchesFilterArr = vacationFiltered.branches.names;
    const branchesIdArr = vacationFiltered.branches.keys;
    const branchesFilterArrLen = branchesFilterArr.length;
    const branchesIdArrLen = branchesIdArr.length;
    if (branchesFilterArrLen === branchesIdArrLen) {
      for (let i = 0; i < branchesIdArrLen; i += 1) {
        const obj = {
          data: {
            value: branchesIdArr[i],
            placeholder: branchesFilterArr[i],
            searchable: [branchesFilterArr[i]],
          },
          component: <div>{ branchesFilterArr[i] }</div>,
        };
        branchesSection.filters.push(obj);
      }
    }

    console.log('createBranchesSection98', branchesSection, ' checkStart');
    return branchesSection;
  }

  createRoomsSection(vacationFiltered) {
    let isAllSelected = true;
    if (vacationFiltered.rooms.selectedIds && vacationFiltered.rooms.selectedIds.length > 0) {
      isAllSelected = false;
    }
    const roomsSection = {
      type: vacationFiltered.rooms.type,
      name: vacationFiltered.rooms.name,
      placeholder: vacationFiltered.rooms.placeholder,
      isAllSelected,
      selectedIds: vacationFiltered.rooms.selectedIds,
      filters: [
        {
          label: 'All rooms',
          isAllCheckbox: true,
        },
      ],
    };
    const roomsFilterArr = vacationFiltered.rooms.names;
    const roomsIdArr = vacationFiltered.rooms.keys;
    const roomsFilterArrLen = roomsFilterArr.length;
    const roomsIdArrLen = roomsIdArr.length;
    if (roomsFilterArrLen === roomsIdArrLen) {
      for (let i = 0; i < roomsIdArrLen; i += 1) {
        const obj = {
          id: roomsIdArr[i],
          label: roomsFilterArr[i],
        };
        roomsSection.filters.push(obj);
      }
    }
    return roomsSection;
  }

  createDoctorsSection(vacationFiltered) {
    let isAllSelected = true;
    if (vacationFiltered.doctors.selectedIds && vacationFiltered.doctors.selectedIds.length > 0) {
      isAllSelected = false;
    }
    const doctorsSection = {
      type: vacationFiltered.doctors.type,
      name: vacationFiltered.doctors.name,
      placeholder: vacationFiltered.doctors.placeholder,
      isAllSelected,
      selectedIds: vacationFiltered.rooms.selectedIds,
      filters: [
        {
          label: 'All doctors',
          isAllCheckbox: true,
        },
      ],
    };
    const doctorsFilterArr = vacationFiltered.doctors.names;
    const doctorsIdArr = vacationFiltered.doctors.keys;
    const doctorsFilterArrLen = doctorsFilterArr.length;
    const doctorsIdArrLen = doctorsIdArr.length;
    if (doctorsFilterArrLen === doctorsIdArrLen) {
      for (let i = 0; i < doctorsIdArrLen; i += 1) {
        const obj = {
          id: doctorsIdArr[i],
          label: doctorsFilterArr[i],
        };
        doctorsSection.filters.push(obj);
      }
    }
    return doctorsSection;
  }

  render() {
    const { vacationFiltered } = this.props;
    const branchesSection = this.createBranchesSection(vacationFiltered);
    const roomsSection = this.createRoomsSection(vacationFiltered);
    const doctorsSection = this.createDoctorsSection(vacationFiltered);

    return (
      <Filter
        title="Filter By"
        sections={[
          branchesSection,
          roomsSection,
          doctorsSection,
        ]}
        onChange={this.onChangeFilter}
      />
    );
  }
}

VacationFilterContainer.propTypes = {
  vacationFiltered: PropTypes.object,
  state: PropTypes.object, // eslint-disable-line
  setVacationFilterSelectedBranch: PropTypes.func, // eslint-disable-line
  setVacationFilterSelectedRooms: PropTypes.func, // eslint-disable-line
  setVacationFilterSelectedDoctors: PropTypes.func, // eslint-disable-line
  createVacationFiltered: PropTypes.func, // eslint-disable-line
  clinics: PropTypes.object, // eslint-disable-line
  selectedBranch: PropTypes.string, // eslint-disable-line
  selectedRooms: PropTypes.array, // eslint-disable-line
  selectedDoctors: PropTypes.array, // eslint-disable-line
};

VacationFilterContainer.defaultProps = {
  selectedBranch: 'All Branches', // eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationFilterContainer);

// // fake date for Filter:
// const FILTER_SECTIONS_NAMES = {
//   BRANCHES: 'BRANCHES',
//   ROOMS: 'ROOMS',
//   DOCTORS: 'DOCTORS',
// };
//
// const branchesSection = {
//   type: 'combo',
//   name: FILTER_SECTIONS_NAMES.BRANCHES,
//   filters: [
//     {
//       data: {
//         placeholder: 'All Branches',
//         value: 'All Branches',
//         searchable: ['All Branches'],
//       },
//       component: <div>All Branches</div>,
//     },
//     {
//       data: {
//         placeholder: 'Branch 1',
//         value: 'Branch 1',
//         searchable: ['Branch 1'],
//       },
//       component: <div>Branch 1</div>,
//     },
//     {
//       data: {
//         placeholder: 'Branch 2',
//         value: 'Branch 2',
//         searchable: ['Branch 2'],
//       },
//       component: <div>Branch 2</div>,
//     },
//   ],
//   placeholder: 'Branches',
// };
// const roomsSection = {
//   type: 'check',
//   name: FILTER_SECTIONS_NAMES.ROOMS,
//   filters: [
//     {
//       label: 'All rooms',
//       isAllCheckbox: true,
//     },
//     {
//       id: 2,
//       label: 'Room 1',
//     },
//     {
//       id: 3,
//       label: 'Room 2',
//     },
//   ],
//   placeholder: 'Rooms',
//   isAllSelected: true,
// };
//
// const doctorsSection = {
//   type: 'check',
//   name: FILTER_SECTIONS_NAMES.DOCTORS,
//   filters: [
//     {
//       label: 'All doctors',
//       isAllCheckbox: true,
//     },
//     {
//       id: 5,
//       label: 'Dr Nancy Amr',
//     },
//     {
//       id: 6,
//       label: 'Dr Fadi Aziz',
//     },
//     {
//       id: 7,
//       label: 'Dr Micheal Sadik',
//     },
//   ],
//   placeholder: 'Doctors',
//   isAllSelected: true,
// };
// // end fake date for Filter.
