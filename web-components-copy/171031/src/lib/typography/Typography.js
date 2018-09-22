import React from 'react';
import PropTypes from 'prop-types';

import './Typography.scss';

function Title(props) {
  const className = ` ${props.className}`;
  return (
    <h1
      className={`title${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      {props.children}
    </h1>
  );
}

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Title.defaultProps = {
  className: '',
};

function Heading(props) {
  const className = ` ${props.className}`;

  return (
    <h3
      className={`heading${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      {props.children}
    </h3>
  );
}

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: '',
};

function Subheading(props) {
  const className = ` ${props.className}`;

  return (
    <h3
      className={`subheading${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      {props.children}
    </h3>
  );
}

Subheading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Subheading.defaultProps = {
  className: '',
};

function Text(props) {
  const className = ` ${props.className}`;

  return (
    <label
      htmlFor={props.htmlFor}
      className={`body${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      {props.children}
    </label>
  );
}

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func,
  htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
  htmlFor: '',
};

function Caption(props) {
  const className = ` ${props.className}`;

  return (
    <span
      className={`caption${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      {props.children}
    </span>
  );
}

Caption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Caption.defaultProps = {
  className: '',
};

export { Title, Heading, Subheading, Text, Caption };
export default Text;
