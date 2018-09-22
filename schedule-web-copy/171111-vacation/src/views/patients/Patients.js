import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Search } from '@vezeeta/web-components'; // eslint-disable-line

// import Search from './search';
import { MODAL_NAMES } from '../Constants';
import './Patients.scss';

import PatientsListContainer from './patientsList/PatientsListContainer';

class Patients extends PureComponent {
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
    const searchPlaceholder = 'Search By Patient Name, ID, Mobile Number';
    const {
      modalData,
      openedModal,
      getModalTabs,
    } = this.props;
    return (
      <div id="Patients">
        {!!this.props.openedModal && (
          <Modal
            ref={(modal) => { this.modal = modal; }}
            tabs={getModalTabs(openedModal, {
              ...modalData,
            })}
          />
        )}
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="patients-col">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="row patients-header">
                      <div className="width-70">
                        <div className="patients-search">
                          <Search
                            placeholder={searchPlaceholder}
                            onChange={this.props.onChangeSearch}
                          />
                        </div>
                      </div>
                      <div className="width-30">
                        <div className="patients-button">
                          <Button
                            className="fs-16"
                            onClick={() => this.props.openModal(MODAL_NAMES.ADD_PATIENT, {})}
                          >
                            Add New Patient
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <PatientsListContainer
                    textForSearch={this.props.textForSearch}
                    openModal={this.props.openModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Patients.propTypes = {
  textForSearch: PropTypes.string,
  onChangeSearch: PropTypes.func,
  openModal: PropTypes.func,
  openedModal: PropTypes.string,
  getModalTabs: PropTypes.func,
  modalData: PropTypes.shape({
    tabs: PropTypes.array,
  }),
};

export default Patients;
