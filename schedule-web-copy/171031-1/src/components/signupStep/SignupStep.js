import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Title, Subheading } from '../Components';
import './SignupStep.scss';

class SignupStep extends Component {
  render() {
    let backButton;
    if (!this.props.hideBackButton) {
      backButton = (
        <button className="back-btn" onClick={this.props.backBtnAction}>
          <Icon name="back_arrow" width={14} color="#0070cd" />
        </button>
      );
    } else {
      backButton = <div className="reserve-back-btn" />;
    }

    return (
      <div className="signup-step">
        <div className="back-container">{backButton}</div>
        <div className="content-container">
          <Title className="title">{this.props.title}</Title>
          <Subheading className="subheading">{this.props.desc}</Subheading>
        </div>
      </div>
    );
  }
}

SignupStep.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  hideBackButton: PropTypes.bool,
  backBtnAction: PropTypes.func
};

export default SignupStep;
