import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

// TODO: deprecate type prop

class Button extends Component {
  render() {
    return (
      <button
        className={`btn btn--${this.props.type} ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Button;
