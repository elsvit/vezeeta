import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../index';
import './SocialButton.scss';

// TODO: Replace div with button

function SocialButton(props) {
  const socialClass = ` ${props.social}`;
  const className = ` ${props.className}`;

  return (
    <div
      className={`btn-container--social${socialClass}${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      <div className="icon-container">
        <Icon name={props.social} height={15} color="#fff" />
      </div>
      <div className="text-container">
        <Text>{props.social}</Text>
      </div>
    </div>
  );
}

SocialButton.propTypes = {
  social: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

SocialButton.defaultProps = {
  className: '',
};

export default SocialButton;
