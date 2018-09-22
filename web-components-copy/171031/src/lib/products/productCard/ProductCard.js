import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Subheading, Text } from '../../index';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './ProductCard.scss';

function ProductCard(props) {
  const footerText = props.isRegistered ? 'Subscribed' : props.footerText;

  let loadingClass;
  let iconColor;

  if (props.isLoading) {
    loadingClass = ' loading-card';
    iconColor = Colors.lightGrey;
  } else if (props.isRegistered) {
    loadingClass = ' subscribed';
    iconColor = Colors.helperGrey;
  } else {
    loadingClass = '';
    iconColor = Colors.vezeetaBlue;
  }

  return (
    <div className="product-card">
      <div className={`card-body${loadingClass}`}>
        <div
          className="header"
          style={{
            background: `url(${props.isLoading ? 'none' : props.headerImage})`,
          }}
        >
          <div className="over-lay" />
          <div className="icon">
            <Icon
              name={props.isLoading ? 'radio_button' : props.headerIcon}
              width={props.isLoading ? 20 : props.headerIconWidth}
              color={props.isLoading ? Colors.mediumGrey : 'white'}
            />
          </div>

          <div className="title">
            <Subheading>{props.isLoading ? '' : props.title}</Subheading>
          </div>
        </div>

        <div className="content">
          <Text>{props.isLoading ? '' : props.description}</Text>
        </div>
      </div>

      <div
        className={`footer${loadingClass}`}
        onClick={props.onClick}
        onKeyDown={() => {}}
      >
        <hr className="footer-top-border" />
        <div className="cont">
          <div className="icon">
            <Icon
              name={props.isLoading ? 'radio_button' : props.footerIcon}
              width={props.isLoading ? 19 : props.footerIconWidth}
              color={iconColor}
            />
          </div>
          <Text>{props.isLoading ? '' : footerText}</Text>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  onClick: PropTypes.func,
  headerImage: PropTypes.string,
  headerIcon: PropTypes.string,
  headerIconWidth: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  footerIcon: PropTypes.string,
  footerIconWidth: PropTypes.number,
  footerText: PropTypes.string,
  isRegistered: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ProductCard;
