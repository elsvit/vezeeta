import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Filter } from '@vezeeta/web-components';
import {
  // setVacationFilterSelectedBranch,
  // setVacationFilterSelectedRooms,
  // setVacationFilterSelectedDoctors,
  createVacationFiltered,
} from '../../../store/actions/vacation';

const mapStateToProps = (state) => ({
  vacationFiltered: state.vacation.Filtered,
  filteredCreated: state.vacation.filteredCreated,
  clinics: state.clinics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // setVacationFilterSelectedBranch,
  // setVacationFilterSelectedRooms,
  // setVacationFilterSelectedDoctors,
  createVacationFiltered,
}, dispatch);

class VacationFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacationFiltered: this.props.vacationFiltered,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.vacationFiltered !== nextProps.vacationFiltered ||
      this.props.filteredCreated !== nextProps.filteredCreated ||
      this.props.vacationFiltered.doctors.keys !== nextProps.vacationFiltered.doctors.keys
    ) {
      const newState = {};
      newState.vacationFiltered = { ...nextProps.vacationFiltered };
      this.setState(newState);
    }
  }

  onChangeFilter = (data) => {
    const {
      clinics,
    } = this.props;
    const selectedBranch = this.state.vacationFiltered.branches.selectedValue;
    const selectedDoctors = this.state.vacationFiltered.rooms.selectedIds;
    const selectedRooms = this.state.vacationFiltered.rooms.selectedIds;
    if (data.Branches !== undefined && data.Branches !== selectedBranch) {
      this.props.createVacationFiltered({
        clinics,
        branches: data.Branches,
        rooms: undefined,
        doctors: undefined,
      });
    } else if (data.Rooms !== undefined && data.Rooms.length !== selectedRooms.length) {
      this.props.createVacationFiltered({
        clinics,
        branches: selectedBranch,
        rooms: data.Rooms,
        doctors: undefined,
      });
    } else if (data.Doctors !== undefined && data.Doctors.length !== selectedDoctors.length) {
      this.props.createVacationFiltered({
        clinics,
        branches: selectedBranch,
        rooms: selectedRooms,
        doctors: data.Doctors,
      });
    }
  }

  createBranchesSection(vacationFiltered) {
    const selectedValue = vacationFiltered.branches.selectedValue;
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
    return branchesSection;
  }

  createRoomsSection(vacationFiltered) {
    let isAllSelected = true;
    const roomsFilterAr = vacationFiltered.rooms.names;
    const roomsIdAr = vacationFiltered.rooms.keys;
    const roomsFilterArLen = roomsFilterAr.length;
    const roomsIdArLen = roomsIdAr.length;
    if (vacationFiltered.rooms.selectedIds !== undefined && vacationFiltered.rooms.selectedIds.length < roomsIdArLen) {
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
    if (roomsFilterArLen === roomsIdArLen) {
      for (let i = 0; i < roomsIdArLen; i += 1) {
        const obj = {
          id: roomsIdAr[i],
          label: roomsFilterAr[i],
        };
        roomsSection.filters.push(obj);
      }
    }
    return roomsSection;
  }

  createDoctorsSection(vacationFiltered) {
    let isAllSelected = true;
    const docNameAr = vacationFiltered.doctors.names;
    const docIdAr = vacationFiltered.doctors.keys;
    const docNameArLen = docNameAr.length;
    const docIdArLen = docIdAr.length;
    if (
      vacationFiltered.doctors.selectedIds && vacationFiltered.doctors.selectedIds.length < docIdArLen
    ) {
      isAllSelected = false;
    }
    const doctorsSection = {
      type: vacationFiltered.doctors.type,
      name: vacationFiltered.doctors.name,
      placeholder: vacationFiltered.doctors.placeholder,
      isAllSelected,
      selectedIds: vacationFiltered.doctors.selectedIds,
      filters: [
        {
          label: 'All doctors',
          isAllCheckbox: true,
        },
      ],
    };
    if (docNameArLen === docIdArLen) {
      for (let i = 0; i < docIdArLen; i += 1) {
        const obj = {
          id: docIdAr[i],
          label: docNameAr[i],
        };
        doctorsSection.filters.push(obj);
      }
    }
    return doctorsSection;
  }

  render() {
    const { vacationFiltered } = this.state;
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
  filteredCreated: PropTypes.bool,
  // setVacationFilterSelectedBranch: PropTypes.func,
  // setVacationFilterSelectedRooms: PropTypes.func,
  // setVacationFilterSelectedDoctors: PropTypes.func,
  createVacationFiltered: PropTypes.func,
  clinics: PropTypes.object,
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
