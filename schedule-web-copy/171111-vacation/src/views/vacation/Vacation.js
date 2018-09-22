import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Modal } from '@vezeeta/web-components';

import './Vacation.scss';

import AddVacationBranch from './addVacation/AddVacationBranch';
import AddVacationDoctor from './addVacation/AddVacationDoctor';
import VacationCalendarContainer from './vacationFilter/VacationCalendarContainer';
import VacationFilterContainer from './vacationFilter/VacationFilterContainer';
import VacationListContainer from './vacationList/VacationListContainer';

class Vacation extends PureComponent {
  showModal() {
    if (this.modal) {
      this.modal.showModal();
    }
  }

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
        className="add-vacation-branch-active"
        onClickCancel={onHide}
        submitAddVacation={(data) => submitAddVacation(data)}
        clinics={clinics}
        vacationSaving={setVacationSaving}
      />
    );
    const addVacationDoctorTab = (
      <AddVacationDoctor
        className="add-vacation-doctor-active"
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
      <div className="Vacation">
        <Modal
          ref={(modal) => { this.modal = modal; }}
          tabs={tabs}
        />
        <div className="container">
          <div className="row">
            <div className="col-xs-4">
              <div className="vacation-filter-col">
                <VacationCalendarContainer />
              </div>
              <div className="vacation-filter-col">
                <div className="vacation-filter-wrap">
                  <VacationFilterContainer />
                </div>
              </div>
            </div>
            <div className="col-xs-8 vacation-right-col">
              <div className="row ">
                <div className="vacation-right-col-header helper-grey">
                  <div className="col-xs-7">
                    <div className="vacation-title">
                      <Text className="fs-20 font-title">Doctors And Branches Vacation</Text>
                    </div>
                  </div>
                  <div className="col-xs-5">
                    <div className="vacation-button">
                      <Button
                        className="fs-16"
                        onClick={onClickAddVacation}
                      >
                        Add Vacation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vacation-right-col-list">
                <VacationListContainer />
              </div>
            </div>
          </div>
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
