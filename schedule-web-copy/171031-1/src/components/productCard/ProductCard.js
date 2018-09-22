import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Subheading, Text } from '../Components';
import Colors from '!!sass-variable-loader!../../components/base/Colors.scss';
import './ProductCard.scss';

class ProductCard extends Component {
  render() {
    let footerText = this.props.isRegistered
      ? 'Subscribed'
      : this.props.footerText;
    return (
      <div className="product-card">
        <div
          className={`card-body ${this.props.isLoading
            ? 'loading-card'
            : this.props.isRegistered ? 'subscribed' : ''}`}
        >
          <div
            className="header"
            style={{
              background: `url(${this.props.isLoading
                ? 'none'
                : this.props.headerImage})`
            }}
          >
            <div className="over-lay" />
            <div className="icon">
              <Icon
                name={
                  this.props.isLoading ? 'radio_button' : this.props.headerIcon
                }
                width={this.props.isLoading ? 20 : this.props.headerIconWidth}
                color={this.props.isLoading ? Colors.mediumGrey : 'white'}
              />
            </div>

            <div className="title">
              <Subheading>
                {this.props.isLoading ? '' : this.props.title}
              </Subheading>
            </div>
          </div>

          <div className="content">
            <Text>{this.props.isLoading ? '' : this.props.description}</Text>
          </div>
        </div>

        <div
          className={`footer ${this.props.isLoading
            ? 'loading-card'
            : this.props.isRegistered ? 'subscribed' : ''}`}
          onClick={this.props.onClick}
        >
          <hr className="footer-top-border" />
          <div className="cont">
            <div className="icon">
              <Icon
                name={
                  this.props.isLoading ? 'radio_button' : this.props.footerIcon
                }
                width={this.props.isLoading ? 19 : this.props.footerIconWidth}
                color={
                  this.props.isLoading ? (
                    Colors.lightGrey
                  ) : this.props.isRegistered ? (
                    Colors.helperGrey
                  ) : (
                    Colors.vezeetaBlue
                  )
                }
              />
            </div>
            <Text>{this.props.isLoading ? '' : footerText}</Text>
          </div>
        </div>
      </div>
    );
  }
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
  footerIconColor: PropTypes.string,
  footerText: PropTypes.string,
  isRegistered: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default ProductCard;
