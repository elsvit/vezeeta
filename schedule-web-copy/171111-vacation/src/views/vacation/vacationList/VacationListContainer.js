import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import VacationList from './VacationList';
import VacationRow from './VacationRow';
import SeparateVacationDay from './SeparateVacationDay';
import { deleteVacation } from '../../../store/actions/vacation';

const mapStateToProps = (state) => ({
  doctorSelectedIds: state.vacation.Filtered.doctors.selectedIds,
  roomSelectedIds: state.vacation.Filtered.rooms.selectedIds,
  vacation: state.vacation.Vacation,
  vacationLoading: state.vacation.loading,
  startDate: state.vacation.startDate,
  endDate: state.vacation.endDate,
  minDateDefault: state.vacation.minDateDefault,
  maxDateDefault: state.vacation.maxDateDefault,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteVacation,
}, dispatch);

class VacationListContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      vacation: this.props.vacation,
      doctorSelectedIds: this.props.doctorSelectedIds,
      roomSelectedIds: this.props.roomSelectedIds,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    let check = false;
    if (nextProps.startDate !== this.props.startDate) {
      newState.startDate = nextProps.startDate;
      check = true;
    }
    if (nextProps.endDate !== this.props.endDate) {
      newState.endDate = nextProps.endDate;
      check = true;
    }
    if (nextProps.vacation !== this.props.vacation) {
      newState.vacation = nextProps.vacation;
      check = true;
    }
    if (nextProps.doctorSelectedIds !== this.props.doctorSelectedIds) {
      newState.doctorSelectedIds = nextProps.doctorSelectedIds;
      check = true;
    }
    if (nextProps.roomSelectedIds !== this.props.roomSelectedIds) {
      newState.roomSelectedIds = nextProps.roomSelectedIds;
      check = true;
    }
    if (check) {
      this.setState(newState);
    }
  }

  onClickDeleteVacation = (obj) => {
    const delVacantionAr = [];
    delVacantionAr.push(obj);
    this.props.deleteVacation(delVacantionAr);
  }

  getVacationList = (vacation, doctorSelectedIds, roomSelectedIds, startDateIn, endDateIn) => {
    const result = [];
    const startDateObj = new Date(startDateIn);
    const endDateObj = new Date(endDateIn);
    const startDate = startDateObj.getTime();
    const endDate = endDateObj.getTime();
    const vacationLen = vacation ? vacation.length : 0;
    for (let i = 0; i < vacationLen; i += 1) {
      if (vacation[i].Model) {
        const model = vacation[i].Model;
        const modelLen = model.length;
        for (let i2 = 0; i2 < modelLen; i2 += 1) {
          const modelFromObj = new Date(model[i2].From);
          const modelToObj = new Date(model[i2].To);
          const modelFrom = modelFromObj.getTime();
          const modelTo = modelToObj.getTime();
          const check1 = doctorSelectedIds.indexOf(vacation[i].AccountKey) !== -1;
          const check2 = roomSelectedIds.indexOf(vacation[i].RoomKey) !== -1;
          const check3 = (modelFrom >= startDate && modelFrom <= endDate);
          const check4 = (modelTo >= startDate && modelTo <= endDate);
          if (
            check1 &&
            check2 &&
            (check3 ||
              check4
            )) {
            result.push({
              key: i + '-' + i2, // eslint-disable-line
              accountKey: vacation[i].AccountKey,
              roomKey: vacation[i].RoomKey,
              doctorName: vacation[i].DoctorName,
              roomName: vacation[i].RoomName,
              vacationFrom: model[i2].From,
              vacationTo: model[i2].To,
              deleteVacation: this.onClickDeleteVacation,
            });
          }
        }
      }
    }
    const sortResult = result.sort((a, b) => {
      const aDate = new Date(a.vacationFrom);
      const bDate = new Date(b.vacationFrom);
      const aDateTime = aDate.getTime();
      const bDateTime = bDate.getTime();
      if (aDateTime < bDateTime) return -1;
      if (aDateTime > bDateTime) return 1;
      return 0;
    });
    const sortResultVacationRow = [];
    const sortResultLen = sortResult.length;
    const now = new Date();
    const nowTime = now.getTime();
    let checkAfterToday = true;
    let checkToday = true;
    for (let i = 0; i < sortResultLen; i += 1) {
      const val = sortResult[i];
      const valEndDate = new Date(val.vacationTo);
      const valEndDateTime = valEndDate.getTime();
      const valStartDate = new Date(val.vacationFrom);
      const valStartDateTime = valStartDate.getTime();
      if (i === 0 && nowTime > valEndDateTime) {
        sortResultVacationRow.push(<SeparateVacationDay key="sepBl1" value="Before Today" />);
      } else if (checkAfterToday && nowTime < valStartDateTime) {
        sortResultVacationRow.push(<SeparateVacationDay key="sepBl2" value="After Today" />);
        checkAfterToday = false;
      } else if (checkToday && nowTime >= valStartDateTime && nowTime <= valEndDateTime) {
        sortResultVacationRow.push(<SeparateVacationDay key="sepBl3" value="Today" />);
        checkToday = false;
      }
      sortResultVacationRow.push(<VacationRow
        key={''.concat('vac', i)} // eslint-disable-line
        accountKey={val.accountKey}
        roomKey={val.roomKey}
        doctorName={val.doctorName}
        roomName={val.roomName}
        vacationFrom={val.vacationFrom}
        vacationTo={val.vacationTo}
        deleteVacation={val.deleteVacation}
      />);
    }
    return sortResultVacationRow;
  }

  render() {
    const {
      minDateDefault,
      maxDateDefault,
    } = this.props;
    const {
      startDate,
      endDate,
      vacation,
      doctorSelectedIds,
      roomSelectedIds,
    } = this.state;
    const startDateMod = !startDate ? minDateDefault : startDate;
    const endDateMod = !endDate ? maxDateDefault : endDate;
    const vacationList = this.getVacationList(vacation, doctorSelectedIds, roomSelectedIds, startDateMod, endDateMod);
    return (
      <VacationList
        vacationList={vacationList}
        vacationLoading={this.props.vacationLoading}
      />
    );
  }
}

VacationListContainer.propTypes = {
  doctorSelectedIds: PropTypes.array,
  roomSelectedIds: PropTypes.array,
  vacation: PropTypes.array,
  vacationLoading: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  minDateDefault: PropTypes.string,
  maxDateDefault: PropTypes.string,
  deleteVacation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationListContainer);
