import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Filter } from '@vezeeta/web-components';
import {
  createVacationFiltered,
} from '../../../store/actions/vacation';

const mapStateToProps = (state) => ({
  vacationFiltered: state.vacation.Filtered,
  filteredCreated: state.vacation.filteredCreated,
  clinics: state.clinics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createVacationFiltered,
}, dispatch);

class VacationFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacationFiltered: this.props.vacationFiltered,
    };
  }
  /*
   * Change state if props changed
   * @param (string) this.props.vacationFiltered
   * @param (string) nextProps.vacationFiltered
   * @param (string) this.props.filteredCreated
   * @param (string) nextProps.filteredCreated
   * @param (string) this.props.vacationFiltered.doctors.keys
   * @param (string) nextProps.vacationFiltered.doctors.keys
   */
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
  /*
   * Change filter data
   * @param (obj) data
   */
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
  /*
   * create Branches Section fo filter
   * @param (obj) vacationFiltered
   */
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
  /*
   * create Branches Section fo filter
   * @param (obj) vacationFiltered
   */
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
  /*
   * create Doctors Section fo filter
   * @param (obj) vacationFiltered
   */
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
  createVacationFiltered: PropTypes.func,
  clinics: PropTypes.object,
};

VacationFilterContainer.defaultProps = {
  selectedBranch: 'All Branches', // eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationFilterContainer);
