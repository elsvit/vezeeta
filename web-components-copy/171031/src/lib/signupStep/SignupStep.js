import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Title, Subheading } from '../index';
import Colors from '!!sass-variable-loader!../shared/Colors.scss'; // eslint-disable-line
import './SignupStep.scss';

function SignupStep(props) {
  let backButton;
  if (!props.hideBackButton || props.hideBackButton === false) {
    backButton = (
      <button className="back-btn" onClick={props.backBtnAction}>
        <Icon name="back_arrow" width={14} color={Colors.vezeetaBlue} />
      </button>
    );
  } else {
    backButton = <div className="reserve-back-btn" />;
  }

  return (
    <div className="signup-step">
      <div className="back-container">{backButton}</div>
      <div className="content-container">
        <Title className="title">{props.title}</Title>
        <Subheading className="subheading">{props.desc}</Subheading>
      </div>
    </div>
  );
}

SignupStep.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  hideBackButton: PropTypes.bool,
  backBtnAction: PropTypes.func,
};

export default SignupStep;
