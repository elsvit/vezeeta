import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Modal } from '@vezeeta/web-components';

import Confirm from './Confirm';
import './VacationList.scss';

class VacationList extends PureComponent {
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
    const confirmDeleteVacationComponent = (
      <Confirm
        submitFunc={this.props.submitDeleteVacation}
      />
    );
    const { vacationList, vacationLoading } = this.props;
    const loading = (
      <div className="loading-container">
        <Spinner />
      </div>
    );
    const tabs = [];
    tabs.push({
      tabName: 'Delete Vacation?',
      tabPage: confirmDeleteVacationComponent,
    });
    return (
      <div className="overflow-hidden block vacation-list">
        <Modal
          className="vacation-modal"
          ref={(modal) => {
            this.modal = modal;
          }}
          tabs={tabs}
        />
        {vacationLoading ? loading : vacationList}
      </div>
    );
  }
}

VacationList.propTypes = {
  vacationList: PropTypes.array,
  vacationLoading: PropTypes.bool,
  submitDeleteVacation: PropTypes.func,
};

export default VacationList;
