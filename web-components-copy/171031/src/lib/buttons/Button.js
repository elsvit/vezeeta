import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

// TODO: deprecate type prop

function Button(props) {
  const className = ` ${props.className}`;

  return (
    <button
      className={`btn btn--${props.type}${className}`}
      onClick={props.onClick}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disable: PropTypes.bool,
};

Button.defaultProps = {
  type: 'red',
  className: '',
  disable: false,
};

export default Button;
