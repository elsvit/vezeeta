import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Confirm from './Confirm';

class ConfirmContainer extends Component { // eslint-disable-line
  render() {
    console.log('ConfirmContainer10 props', this.props);
    return (
      <div>
        <Confirm
          data={this.props.data}
          text={this.props.text}
          submitConfirm={this.props.submitConfirm}
        />
      </div>
    );
  }
}

ConfirmContainer.propTypes = {
  data: PropTypes.object,
  text: PropTypes.string,
  submitConfirm: PropTypes.func,
};

export default ConfirmContainer;


