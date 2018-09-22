import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vezeeta/web-components';

import VacationCalendarContainer from './vacationFilter/VacationCalendarContainer';
import VacationFilterContainer from './vacationFilter/VacationFilterContainer';
import VacationListContainer from './vacationList/VacationListContainer';
import AddVacation from './addVacation/AddVacation';
import './Vacation.scss';

class Vacation extends PureComponent {
  render() {
    const userType = this.props.userType; // eslint-disable-line
    return (
      <div className="schedule-card">
        <div>
          <VacationCalendarContainer />
          <VacationFilterContainer />
        </div>

        <div className="list--container">
          <div className="list--title-container">
            <span className="list--title">Doctors vacations</span>
            <Button onClick={this.props.onClickAddVacation}>
              Add Vacation
            </Button>
          </div>

          <VacationListContainer />
        </div>

        <AddVacation
          showAddVacation={this.props.showAddVacation}
          onClickAddVacation={this.props.onClickAddVacation}
        />
      </div>
    );
  }
}

Vacation.propTypes = {
  userType: PropTypes.string,
  onClickAddVacation: PropTypes.func,
  showAddVacation: PropTypes.bool,
};

export default Vacation;
