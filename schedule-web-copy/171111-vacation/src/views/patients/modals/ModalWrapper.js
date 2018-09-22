import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '@vezeeta/web-components';

import './ModalWrapper.scss';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

const ModalWrapper = (props) => (
  <Modal
    isOpen={props.isOpened}
    className={classnames('modal', props.className)}
  >
    <div className="modal-header">
      <span
        className="modal-arrow"
        onClick={props.goBack || props.closeModal}
        onKeyPress={() => {}}
      >
        <Icon
          name="back_arrow"
          width={20}
          height={20}
          color={Colors.helperGrey}
        />
      </span>
      <span className="modal-header-title">{props.title}</span>
      <span
        className="modal-close"
        onClick={props.closeModal}
        onKeyPress={() => {}}
      >
        <Icon
          name="close"
          width={24}
          height={24}
          color={Colors.helperGrey}
        />
      </span>
    </div>
    <hr className="separator" />
    <div>{props.children}</div>
  </Modal>
);

ModalWrapper.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  goBack: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.object,
};

export default ModalWrapper;
