import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import VacationRaw from './Vacation';

import './VacationList.scss';

// eslint-disable-next-line
class VacationDoctorsList extends PureComponent {
  constructor(props) {
    super(props);
    this.getVacationDoctorsList = this.getVacationDoctorsList.bind(this);
  }

  getVacationDoctorsList() {
    const result = [];
    const vacation = this.props.vacation;
    const selectedIds = this.props.selectedIds;
    const startDateObj = new Date(this.props.startDate);
    const endDateObj = new Date(this.props.endDate);
    const startDate = startDateObj.getTime();
    const endDate = endDateObj.getTime();
    const vacationLen = vacation ? vacation.length : 0;
    console.log('getVacationDoctorsList20 vacation', vacation, ' selectedIds', selectedIds);
    for (let i = 0; i < vacationLen; i += 1) {
      if (vacation[i].Model) {
        const model = vacation[i].Model;
        const modelLen = model.length;
        for (let i2 = 0; i2 < modelLen; i2 += 1) {
          const modelFromObj = new Date(model[i2].From);
          const modelToObj = new Date(model[i2].To);
          const modelFrom = modelFromObj.getTime();
          const modelTo = modelToObj.getTime();
          const check1 = selectedIds.indexOf(vacation[i].AccountKey) !== -1;
          const check2 = (modelFrom >= startDate && modelFrom <= endDate);
          const check3 = (modelTo >= startDate && modelTo <= endDate);
          if (
            check1 &&
            (check2 ||
              check3
            )) {
            result.push(<VacationRaw
              key={i + '-' + i2} // eslint-disable-line
              accountKey={vacation[i].AccountKey}
              roomKey={vacation[i].RoomKey}
              doctorName={vacation[i].DoctorName}
              roomName={vacation[i].RoomName}
              vacationStart={model[i2].From}
              vacationEnd={model[i2].To}
              deleteVacation={this.props.deleteVacation}
            />);
          }
        }
      }
    }
    return result;
  }

  render() {
    const vacationDoctorlist = this.getVacationDoctorsList();
    return (
      <div className="vacations--container">
        {vacationDoctorlist}
      </div>
    );
  }
}

VacationDoctorsList.propTypes = {
  vacation: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  selectedIds: PropTypes.array,
  deleteVacation: PropTypes.func,
};

export default VacationDoctorsList;
