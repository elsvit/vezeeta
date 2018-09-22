import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Typography.scss';

class Title extends Component {
  render() {
    return (
      <h1 className="title" onClick={this.props.onClick}>
        {this.props.children}
      </h1>
    );
  }
}

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func
};

class Subheading extends Component {
  render() {
    return (
      <h3 className="subheading" onClick={this.props.onClick}>
        {this.props.children}
      </h3>
    );
  }
}

Subheading.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

class Text extends Component {
  render() {
    return (
      <label
        className="body"
        htmlFor={this.props.htmlFor}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </label>
    );
  }
}

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  onClick: PropTypes.func,
  htmlFor: PropTypes.string
};

class Caption extends Component {
  render() {
    return (
      <span className="caption" onClick={this.props.onClick}>
        {this.props.children}
      </span>
    );
  }
}

Caption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  onClick: PropTypes.func
};

export { Title, Subheading, Text, Caption };
export default Text;
