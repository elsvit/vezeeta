import React from 'react';
import { FILTER_NAMES, ALL_BRANCHES_VALUE } from '../Constants';

const createFilterSection = (
  type,
  name,
  filters,
  placeholder,
  selectOptions,
) => ({
  type,
  name,
  filters,
  placeholder,
  ...selectOptions,
});

const createBranchesSection = (branches, selectOptions) => {
  const filters = branches.map((branch) => ({
    data: {
      placeholder: branch.BranchName,
      value: branch.BranchKey,
      searchable: [branch.BranchName],
    },
    component: <div>{branch.BranchName}</div>,
  }));
  filters.unshift({
    data: {
      placeholder: 'All Branches',
      value: ALL_BRANCHES_VALUE,
      searchable: ['All Branches'],
    },
    component: <div>All Branches</div>,
  });
  return createFilterSection(
    'combo',
    FILTER_NAMES.BRANCHES,
    filters,
    'Branches',
    selectOptions,
  );
};

const createRoomsSection = (rooms, selectOptions) => {
  const filters = rooms.map((room) => ({
    id: room.RoomKey,
    label: room.RoomName,
  }));
  filters.unshift({
    label: 'All rooms',
    isAllCheckbox: true,
  });
  return createFilterSection(
    'check',
    FILTER_NAMES.ROOMS,
    filters,
    'Rooms',
    selectOptions,
  );
};

const createRadioRoomsSection = (rooms, selectOptions) => {
  const filters = rooms.map((room) => ({
    name: 'room',
    value: room.RoomKey,
    component: <div>{room.RoomName}</div>,
  }));
  return createFilterSection(
    'radio',
    FILTER_NAMES.ROOMS,
    filters,
    'Rooms',
    selectOptions,
  );
};

const createDoctorsSection = (doctors, selectOptions) => {
  const filters = doctors.map((doctor) => ({
    id: doctor.AccountKey,
    label: doctor.DoctorName,
  }));
  filters.unshift({
    label: 'All doctors',
    isAllCheckbox: true,
  });
  return createFilterSection(
    'check',
    FILTER_NAMES.DOCTORS,
    filters,
    'Doctors',
    selectOptions,
  );
};

const filterClinics = (clinics, filterData) =>
  clinics.map((clinic) => ({
    ...clinic,
    Branches: clinic.Branches.filter((branch) =>
      !filterData[FILTER_NAMES.BRANCHES] ||
        filterData[FILTER_NAMES.BRANCHES] === ALL_BRANCHES_VALUE ||
        branch.BranchKey === filterData[FILTER_NAMES.BRANCHES]).map((branch) => ({
      ...branch,
      Rooms: branch.Rooms.filter((room) =>
        !filterData[FILTER_NAMES.ROOMS] ||
          filterData[FILTER_NAMES.ROOMS].includes(room.RoomKey)).map((room) => ({
        ...room,
        Doctors: room.Doctors.filter((doctor) =>
          !filterData.DOCTORS ||
            filterData.DOCTORS.includes(doctor.AccountKey)),
      })),
    })),
  }));

export default {
  createBranchesSection,
  createRoomsSection,
  createDoctorsSection,
  createRadioRoomsSection,
  filterClinics,
};
