import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '@vezeeta/web-components';
import './VacationList.scss';

// eslint-disable-next-line
class VacationList extends PureComponent {

  render() {
    const { vacationList, vacationLoading } = this.props;
    const loading = (
      <div className="vacation-loading">
        <Spinner />
      </div>
    );
    return (
      <div className="overflow-hidden block vacation-list">
        {vacationLoading ? loading : vacationList}
      </div>
    );
  }
}

VacationList.propTypes = {
  vacationList: PropTypes.array,
  vacationLoading: PropTypes.bool,
};

export default VacationList;
