import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../Components';
import './SocialButton.scss';

class SocialButton extends Component {
  render() {
    return (
      <div
        className={`btn-container ${this.props.social} ${this.props.className}`}
        onClick={this.props.onClick}
      >
        <div className="icon-container">
          <Icon name={this.props.social} height={15} color="#fff" />
        </div>
        <div className="text-container">
          <Text>{this.props.social}</Text>
        </div>
      </div>
    );
  }
}

SocialButton.propTypes = {
  social: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default SocialButton;
