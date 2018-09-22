import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentDidMount() {
    this.updateProgress(this.props.currentStep);
  }

  /**
   * Takes the current function and generate the percentage then change the
   * indicator width
   * @param {number} currentStep
   */
  updateProgress(currentStep) {
    const width = currentStep / this.props.totalSteps;
    this.indicator.style.width = `${width * 100}%`;
  }

  render() {
    return (
      <div
        className="progress-bar"
        ref={(div) => {
          this.container = div;
        }}
      >
        <div
          className="indicator"
          ref={(div) => {
            this.indicator = div;
          }}
        />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
