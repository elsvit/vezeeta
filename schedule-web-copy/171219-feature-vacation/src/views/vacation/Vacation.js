import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from '@vezeeta/web-components';

import AddVacationBranch from './addVacationTabs/AddBranchVacation';
import AddVacationDoctor from './addVacationTabs/AddDoctorVacation';
import VacationCalendarContainer from './vacationFilter/VacationCalendarContainer';
import VacationFilterContainer from './vacationFilter/VacationFilterContainer';
import VacationListContainer from './vacationList/VacationListContainer';
import './Vacation.scss';

class Vacation extends PureComponent {
  /*
   * Show Modal
   */
  showModal() {
    if (this.modal) {
      this.modal.showModal();
    }
  }

  /*
   * Hide Modal
   */
  hideModal() {
    if (this.modal) {
      this.modal.hideModal();
    }
  }

  render() {
    const {
      clinics,
      onClickAddVacation,
      onHide,
      submitAddVacation,
      setVacationSaving,
    } = this.props;

    const addVacationBranchTab = (
      <AddVacationBranch
        onClickCancel={onHide}
        submitAddVacation={(data) => submitAddVacation(data)}
        clinics={clinics}
        vacationSaving={setVacationSaving}
      />
    );

    const addVacationDoctorTab = (
      <AddVacationDoctor
        onClickCancel={onHide}
        submitAddVacation={(data) => submitAddVacation(data)}
        clinics={clinics}
        vacationSaving={setVacationSaving}
      />
    );

    const tabs = [];
    tabs.push({
      tabName: 'Branch',
      tabPage: addVacationBranchTab,
    });
    tabs.push({
      tabName: 'Doctor',
      tabPage: addVacationDoctorTab,
    });

    return (
      <div className="schedule-card vacation-page">
        <Modal
          className="vacation-modal"
          ref={(modal) => { this.modal = modal; }}
          tabs={tabs}
        />
        <div>
          <VacationCalendarContainer />
          <VacationFilterContainer />
        </div>

        <div className="list--container">
          <div className="list--title-container">
            <span className="list--title">Doctors And Branches Vacation</span>
            <Button
              className="bg-color-red vacation-button"
              onClick={onClickAddVacation}
            >
              Add Vacation
            </Button>
          </div>
          <VacationListContainer />
        </div>
      </div>
    );
  }
}

Vacation.propTypes = {
  onClickAddVacation: PropTypes.func,
  submitAddVacation: PropTypes.func,
  onHide: PropTypes.func,
  setVacationSaving: PropTypes.bool,
  clinics: PropTypes.array,
};

export default Vacation;

