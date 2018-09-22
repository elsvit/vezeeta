import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, LazyLoading } from '../../index';
import MenuItem from './MenuItem';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './ComboBox.scss';

class ComboBox extends Component {
  constructor(props) {
    super(props);

    this.showMenuList = this.showMenuList.bind(this);
    this.hideMenuList = this.hideMenuList.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updatePlaceholderImg = this.updatePlaceholderImg.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.onTyping = this.onTyping.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.select = this.select.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.filterList = this.filterList.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);
    this.focus = this.focus.bind(this);
    this.aVsAn = this.aVsAn.bind(this);

    this.allItems = this.props.items || [];
    const imgPlaceholder =
      'https://s3-eu-west-1.amazonaws.com/cdn-vezeetastaging/vezeeta-account/assets/img-placeholder.png';

    this.state = {
      placeholder: this.props.placeholder,
      select: this.props.select || undefined,
      placeholderImg: this.props.placeholderImg || imgPlaceholder,
      iconColor: Colors.defaultGrey,
      value: undefined,
      apiValue: undefined,
      isLoading: !this.props.items,
      items: this.props.items,
      isDanger: false,
      errorMessage: `Select ${this.aVsAn()} ${this.props.placeholder.toLowerCase()}`,
    };
  }

  /**
   * Checks if the items props changed and updates it
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.items && nextProps.items.length !== 0) {
      this.setState(
        {
          items: nextProps.items,
          isLoading: false,
        },
        () => {
          if (this.state.select !== undefined) {
            this.select(this.state.select);
          }
        },
      );

      this.allItems = nextProps.items;
    }
  }

  /**
  * Update input's value while writing
  * @param {event} e
  */
  onTyping(e) {
    this.setState({
      value: e.target.value,
      apiValue: undefined,
    });

    this.filterList(e.target.value);
  }

  /**
   * Returns input's value
   */
  getInputValue() {
    if (this.state.value !== undefined) {
      return this.state.value;
    }
  }

  /**
   * Shows/hides the menu list
   */
  showMenuList() {
    this.menu.style.display = 'block';
  }

  /**
   * Hides the list and validate if the user didn't select an item from
   * the list
   */
  hideMenuList() {
    this.menu.style.display = 'none';
    this.validate();
  }

  /**
   * Updates the input value
   * update the apiValue
   * Update the data in the parent component
   * @param {string} newPlaceholder
   */
  updateValue(newValue, newApiValue) {
    this.setState({
      value: newValue,
      apiValue: newApiValue,
      isDanger: false,
      iconColor: Colors.defaultGrey,
    });

    if (this.props.setData) {
      this.props.setData(newApiValue);
    }

    if (this.props.onChange && !this.state.isLoading) this.props.onChange();
  }

  /**
   * If the combobox has an image, this will change the current viewed image
   * @param {object} newImg
   */
  updatePlaceholderImg(newImg) {
    this.setState({
      placeholderImg: newImg,
    });
  }

  /**
   * If the component load items from an API, use this method from the parent
   * component after you get the data from the API
   * @param {array} items
   */
  updateItems(items) {
    this.setState({
      items,
    });
    this.allItems = items;
  }

  /**
   * Select an item directly from the parent component
   * @param {string} value
   */
  select(value) {
    if (!this.state.isLoading) {
      const result = this.state.items.filter((item) => item.data.value === value);
      if (result.length !== 0 || result[0] !== undefined) {
        const item = result[0].data;
        this.updateValue(item.placeholder, item.value);
        this.updatePlaceholderImg(item.img);
      }
    } else {
      this.setState({
        select: value,
      });
    }
  }

  /**
   * Clears the current selected item
   */
  clearSelected() {
    this.updateValue('', undefined);
    this.hideErrorMessage();
  }

  /**
   * Shows an error message
   * @param {string} errorMessage
   */
  showErrorMessage(errorMessage) {
    this.setState({
      isDanger: true,
      errorMessage: this.state.errorMessage || errorMessage,
      iconColor: Colors.vezeetaRed,
    });
  }

  /**
   * Changes isDanger state to true
   */
  hideErrorMessage() {
    this.setState({
      isDanger: false,
      iconColor: Colors.defaultGrey,
    });
  }

  /**
   * Return if the component isDanger
   */
  isValid() {
    if (
      this.state.isDanger ||
      this.state.apiValue === '' ||
      this.state.apiValue === undefined
    ) {
      return false;
    }

    return true;
  }

  /**
   * Filter menu list depends on user's input
   * @param {string} keyword
   */
  filterList(keyword) {
    let result = this.allItems.filter((item) => {
      let found = false;
      item.data.searchable.map((search) => {
        if (search.toLowerCase().includes(keyword.toLowerCase())) {
          found = true;
        }
      });

      if (found) {
        return item;
      }
    });

    if (result.length === 0) {
      result = [{ disable: true, component: <div>No Results found</div> }];
    }

    this.setState({
      items: result,
    });
  }

  /**
   * Validates the combo-box
   */
  validate() {
    if (!this.isValid()) {
      this.showErrorMessage();
    } else {
      this.hideErrorMessage();
    }
  }

  /**
   * Shows the dropdown menu and focuses on input
   */
  focus() {
    this.showMenuList();
    this.input.focus();
  }

  /**
   * Choose a/an
   */
  aVsAn() {
    const regex = /^[aeiyou]$/;
    const firstChar = this.props.placeholder.charAt(0).toLowerCase();

    if (regex.test(firstChar)) {
      return 'an';
    }
    return 'a';
  }

  render() {
    let dangerClass;
    let noIconClass = '';
    const className = ` ${this.props.className}`;

    if (!this.state.isDanger) {
      dangerClass = '';
    } else {
      dangerClass = ' combo-box--danger';
    }
    let inputIcon = '';

    if (this.props.icon) {
      inputIcon = (
        <Icon
          name={this.props.icon}
          width={this.props.iconWidth}
          color={this.state.iconColor}
        />
      );
    } else {
      inputIcon = (
        <img
          src={this.state.placeholderImg}
          className="placeholderImg"
          alt={this.state.placeholderImg}
        />
      );
    }

    if (this.props.noIcon) {
      noIconClass = 'combo-box--no-icon';
    }

    let menuList;
    if (!this.state.isLoading) {
      menuList = this.state.items.map((item, index) => (
        <MenuItem
          key={index}
          item={item.data}
          updateValue={this.updateValue}
          updatePlaceholderImg={this.updatePlaceholderImg}
          component={item.component}
          disable={item.disable}
        />
      ));
    } else {
      menuList = (
        <LazyLoading>
          <div className="text" />
          <div className="text" />
          <div className="text" />
          <div className="text" />
        </LazyLoading>
      );
    }

    return (
      <div className={`combo-box${dangerClass}${className}${noIconClass}`}>
        <div
          className="input-container"
          onClick={this.showMenuList}
          onKeyDown={() => {}}
          onBlur={this.hideMenuList}
          tabIndex="0"
          ref={(div) => {
            this.countryCodeValue = div;
          }}
        >
          {inputIcon}
          <input
            type="text"
            value={this.state.value}
            placeholder={this.state.placeholder}
            onChange={this.onTyping}
            onFocus={this.showMenuList}
            onClick={this.showMenuList}
            onBlur={() => {
              this.validate();
              this.hideMenuList();
            }}
            ref={(input) => {
              this.input = input;
            }}
          />
          <div className="icon-container">
            <Icon name="dropdown" width={18} color={Colors.vezeetaBlue} />
          </div>
        </div>

        <span className="error-message">{this.state.errorMessage}</span>

        <ul
          className="menu"
          ref={(ul) => {
            this.menu = ul;
          }}
        >
          {menuList}
        </ul>
      </div>
    );
  }
}

ComboBox.propTypes = {
  icon: PropTypes.string,
  iconWidth: PropTypes.number,
  placeholderImg: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  items: PropTypes.array,
  setData: PropTypes.func,
  onChange: PropTypes.func,
  select: PropTypes.any,
  className: PropTypes.string,
  noIcon: PropTypes.bool,
};

ComboBox.defaultProps = {
  className: '',
  noIcon: false,
};

export default ComboBox;
