import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vezeeta/web-components';

import './Patients.scss';

import Search from './Search';
import PatientsListContainer from './patientsList/PatientsListContainer';
import EditPatient from './editPatient/EditPatient';
import AddPatient from './addPatient/AddPatient';

class Patients extends PureComponent {
  render() {
    const userType = this.props.userType;  // eslint-disable-line
    const searchPlaceholder = 'Search By Patient Name, ID, Mobile Number';
    return (
      <div id="Patients">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="row patients-header">
                <div className="col-xs-7">
                  <div className="patients-search">
                    <Search
                      placeholder={searchPlaceholder}
                      onChange={this.props.onChangeSearch}
                    />
                  </div>
                </div>
                <div className="col-xs-5">
                  <div className="patients-button">
                    <Button
                      className="fs-16"
                      onClick={this.props.onClickAddPatient}
                    >
                      Add New Patient
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div>
                  <PatientsListContainer
                    textForSearch={this.props.textForSearch}
                    onClickEditPatient={this.props.onClickEditPatient}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <EditPatient
          showEditPatient={this.props.showEditPatient}
          submitEditPatient={this.props.submitEditPatient}
          closeEditPatient={this.props.closeEditPatient}
        />
        <AddPatient
          showAddPatient={this.props.showAddPatient}
          submitAddPatient={this.props.submitAddPatient}
          closeAddPatient={this.props.closeAddPatient}
        />
      </div>
    );
  }
}

Patients.propTypes = {
  userType: PropTypes.string,
  textForSearch: PropTypes.string,
  onChangeSearch: PropTypes.func,
  onClickEditPatient: PropTypes.func,
  onClickAddPatient: PropTypes.func,
  showEditPatient: PropTypes.bool,
  showAddPatient: PropTypes.bool,
  submitAddPatient: PropTypes.func,
  submitEditPatient: PropTypes.func,
  closeEditPatient: PropTypes.func,
  closeAddPatient: PropTypes.func,
};

export default Patients;
