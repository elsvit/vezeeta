import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Title, Heading, Subheading, Text, Icon } from '../../index';
import './CartProduct.scss';

class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.markAsDeleted = this.markAsDeleted.bind(this);
    this.restoreDefault = this.restoreDefault.bind(this);

    this.state = {
      isDeleted: false,
      deletedClass: '',
    };
  }

  markAsDeleted() {
    this.props.product.setIsToBeRemoved(true);
    this.props.onDelete();

    this.setState({
      isDeleted: true,
      deletedClass: 'cart-product--danger',
    });
  }

  restoreDefault() {
    this.props.product.setIsToBeRemoved(false);
    this.props.onDelete();

    this.setState({
      isDeleted: false,
      deletedClass: '',
    });
  }

  render() {
    let productControls;
    if (!this.state.isDeleted) {
      productControls = (
        <div className="icons-container">
          <button className="edit" onClick={this.props.navigate}>
            <Icon name="edit" width={16} color="#fff" />
          </button>
          <button className="delete" onClick={this.markAsDeleted}>
            <Icon name="delete" width={14} color="#fff" />
          </button>
        </div>
      );
    } else {
      productControls = (
        <div className="icons-container">
          <button className="restore" onClick={this.restoreDefault}>
            <Subheading className="restore-text">Restore</Subheading>
          </button>
        </div>
      );
    }

    return (
      <div className={`cart-product ${this.state.deletedClass}`}>
        <div className="product-header">
          <Heading className="product-name">
            {this.props.product.getProductName()}
          </Heading>
          {productControls}
        </div>

        <div className="items-container">
          {this.props.product.getItems().map((item, index) => (
            <div className="item" key={index}>
              <Subheading className="units">{`${item.getNumberOfUnits()} ${item.getUnit()}`}</Subheading>
              <Text className="branch">{item.getBranchName()}</Text>
              <div className="price-container">
                <Title className="price">{item.getTotalPrice()}</Title>
                <Text className="currency">
                  {`${this.props.currency}/${item.getPaymentCycle()}`}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CartProduct;
