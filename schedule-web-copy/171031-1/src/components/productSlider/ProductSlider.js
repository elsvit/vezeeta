import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Components';
import Colors from '!!sass-variable-loader!../../components/base/Colors.scss';
import './ProductSlider.scss';

class ProductSlider extends Component {
  constructor(props) {
    super(props);

    this.hideSliderController = this.hideSliderController.bind(this);
    this.moveSliderToLeft = this.moveSliderToLeft.bind(this);
    this.moveSliderToRight = this.moveSliderToRight.bind(this);

    this.state = {
      sliderPosition: 0,
      sliderWidth: this.props.children.length * (100 / 3)
    };
  }

  componentDidMount() {
    this.sliderControlLeft.classList.add('hide');
    if (this.props.children.length <= 3) {
      this.hideSliderController();
    } else if (this.props.children.length <= 1) {
      this.hideSliderController();
    }
  }

  /**
   * Checks if the children props changed and updates it
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      if (nextProps.children.length <= 3) {
        this.hideSliderController();
      } else if (nextProps.children.length <= 1) {
        this.hideSliderController();
      } else {
        this.showSliderController();
        this.sliderControlLeft.classList.add('hide');
      }
      setTimeout(() => {
        if (this.sliderWrapper !== null) {
          this.sliderWrapper.style.transition = 'all 0.5s';
        }
      }, 1000);
    }
  }

  /**
   * Hide slider controller
   */
  hideSliderController() {
    this.sliderControlLeft.classList.add('hide');
    this.sliderControlRight.classList.add('hide');
  }

  /**
   * Show slider controller
   */
  showSliderController() {
    this.sliderControlLeft.classList.remove('hide');
    this.sliderControlRight.classList.remove('hide');
  }

  /**
   * Move slider to left direction
   */
  moveSliderToLeft() {
    if (this.props.children.length > 3) {
      if (
        this.state.sliderPosition > -((this.props.children.length - 3) * 234) &&
        this.state.sliderPosition <= 0
      ) {
        this.setState(
          {
            sliderPosition: this.state.sliderPosition - 234
          },
          () => {
            if (
              this.state.sliderPosition >
                -((this.props.children.length - 3) * 234) &&
              this.state.sliderPosition <= 0
            ) {
              this.showSliderController();
            } else {
              this.sliderControlRight.classList.add('hide');
              this.sliderControlLeft.classList.remove('hide');
            }
          }
        );
      }
    }
  }

  /**
   * Move slider to right direction
   */
  moveSliderToRight() {
    if (this.props.children.length > 3) {
      if (
        this.state.sliderPosition < 0 &&
        this.state.sliderPosition >= -((this.props.children.length - 3) * 234)
      ) {
        this.setState(
          {
            sliderPosition: this.state.sliderPosition + 234
          },
          () => {
            if (
              this.state.sliderPosition < 0 &&
              this.state.sliderPosition >=
                -((this.props.children.length - 3) * 234)
            ) {
              this.showSliderController();
            } else {
              this.sliderControlLeft.classList.add('hide');
              this.sliderControlRight.classList.remove('hide');
            }
          }
        );
      }
    }
  }

  render() {
    let slides;

    slides = (
      <div className="slide">
        {this.props.children.map((slide, index) => {
          return (
            <div key={index} data-slide-number={index + 1}>
              {slide}
            </div>
          );
        })}
      </div>
    );

    return (
      <div className="slider">
        <div
          className="slider-control control--left"
          ref={sliderControlLeft =>
            (this.sliderControlLeft = sliderControlLeft)}
        >
          <button className="control--left" onClick={this.moveSliderToRight}>
            <Icon name="arrow_left" height={16} color={Colors.vezeetaBlue} />
          </button>
        </div>
        <div
          className="slider-control control--right"
          ref={sliderControlRight =>
            (this.sliderControlRight = sliderControlRight)}
        >
          <button className="control--right" onClick={this.moveSliderToLeft}>
            <Icon name="arrow_right" height={16} color={Colors.vezeetaBlue} />
          </button>
        </div>
        <div
          className="wrapper slides"
          style={{
            left: `${this.state.sliderPosition}px`,
            width: `calc(${this.props.children.length * (100 / 3)}% - ${this
              .props.children.length >= 3
              ? (this.props.children.length - 3) * 21
              : 0}px)`
          }}
          ref={sliderWrapper => (this.sliderWrapper = sliderWrapper)}
        >
          {slides}
        </div>
      </div>
    );
  }
}

ProductSlider.propTypes = {
  children: PropTypes.array
};

export default ProductSlider;
