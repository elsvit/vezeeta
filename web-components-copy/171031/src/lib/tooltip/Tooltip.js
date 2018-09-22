import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '../index';
import './Tooltip.scss';

class Tooltip extends Component {
  constructor() {
    super();

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);

    this.state = {
      message: 'Put Your Tooltip Message',
    };
  }

  /**
   * Show tooltip component and hide it after 6 seconds
   * @param {string} message
   */
  showTooltip(message) {
    this.setState(
      {
        message,
      },
      () => {
        this.tooltip.style.display = 'block';
        setTimeout(() => {
          this.tooltip.style.display = 'none';
        }, 10000);
      },
    );
  }

  /**
   * Hide tooltip component
   */
  hideTooltip() {
    this.tooltip.style.display = 'none';
  }

  render() {
    return (
      <div
        className={`tooltip ${this.props.tooltipAlignment}`}
        ref={(tooltip) => {
          this.tooltip = tooltip;
        }}
      >
        <Text>{this.state.message}</Text>
      </div>
    );
  }
}

Tooltip.propTypes = {
  tooltipAlignment: PropTypes.string,
};

export default Tooltip;
