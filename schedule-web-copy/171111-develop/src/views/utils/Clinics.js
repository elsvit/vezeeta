const flattenClinics = (clinics) => {
  const branches = [];
  const rooms = [];
  const doctors = [];
  const doctorsKeys = [];

  clinics.forEach((clinic) => {
    clinic.Branches.forEach((branch) => {
      branches.push(branch);

      branch.Rooms.forEach((room) => {
        rooms.push(room);

        room.Doctors.forEach((doctor) => {
          if (!doctorsKeys.includes(doctor.AccountKey)) {
            doctorsKeys.push(doctor.AccountKey);
            doctors.push(doctor);
          }
        });
      });
    });
  });

  return {
    branches,
    rooms,
    doctors,
  };
};

const getRoomsInBranches = (branches, branchesKeys) =>
  branches
    .filter((branch) => branchesKeys.includes(branch.BranchKey))
    .map((branch) => branch.Rooms)
    .reduce((prevRooms, nextRooms) => prevRooms.concat(nextRooms), []);

const getDoctorsInRooms = (rooms, roomsKeys) => {
  const doctors = [];
  const doctorsKeys = [];

  rooms.forEach((room) => {
    if (roomsKeys.includes(room.RoomKey)) {
      room.Doctors.forEach((doctor) => {
        if (!doctorsKeys.includes(doctor.AccountKey)) {
          doctorsKeys.push(doctor.AccountKey);
          doctors.push(doctor);
        }
      });
    }
  });

  return doctors;
};

const getDoctorsInfo = (rooms) => {
  const res = [];

  rooms.forEach((room) => {
    room.Doctors.forEach((doctor) => {
      res.push({
        RoomKey: room.RoomKey,
        AccountKey: doctor.AccountKey,
        DoctorName: doctor.DoctorName,
      });
    });
  });

  return res;
};

export default {
  flattenClinics,
  getRoomsInBranches,
  getDoctorsInRooms,
  getDoctorsInfo,
};
