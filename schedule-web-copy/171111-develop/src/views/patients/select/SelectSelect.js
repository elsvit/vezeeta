import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import './Select.scss';

class Select extends Component {
  constructor(props) {
    super(props);
    this.onClickSelect = this.onClickSelect.bind(this);
    this.onClickSelectRow = this.onClickSelectRow.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      className: this.props.className,
      disabled: this.props.disabled,
      disabledRows: this.props.disabledRows,
      iconSize: this.props.iconSize,
      formId: this.props.formId,
      name: this.props.name,
      maxRows: this.props.maxRows,
      options: this.props.options,
      placeholder: this.props.placeholder,
      required: this.props.required,
      selectedValue: this.props.selectedValue + '', // eslint-disable-line
      showRows: false,
      title: this.props.title,
      changedText: '',
      optionsChanged: this.props.options,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.className !== nextProps.className ||
      this.props.disabled !== nextProps.disabled ||
      this.props.disabledRows !== nextProps.disabledRows ||
      this.props.maxRows !== nextProps.maxRows ||
      this.props.options !== nextProps.options ||
      this.props.placeholder !== nextProps.placeholder ||
      this.props.selectedValue !== nextProps.selectedValue ||
      this.props.title !== nextProps.title
    ) {
      this.setState({
        className: nextProps.className,
        disabled: nextProps.disabled,
        disabledRows: nextProps.disabledRows,
        maxRows: nextProps.maxRows,
        options: nextProps.options,
        placeholder: nextProps.placeholder,
        selectedValue: nextProps.selectedValue + '',  // eslint-disable-line
        title: nextProps.title,
        optionsChanged: nextProps.options,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onClickSelectRow(e) {
    const eValue = e.target.value;
    const selectedValue = this.state.selectedValue;
    if (eValue !== selectedValue) {
      this.setState({
        selectedValue: eValue,
        changedText: '',
        showRows: false,
      });
      this.props.onChange(eValue);
    }
  }

  onChangeInput(e) {
    const { options } = this.state;
    const eValue = e.target.value;
    const optionsChanged = [];
    const optionsLen = options.length;
    for (let i = 0; i < optionsLen; i += 1) {
      if (!eValue || options[i].text.toLowerCase().indexOf(eValue.toLowerCase()) !== -1) {
        optionsChanged.push(options[i]);
      }
    }
    this.setState({
      changedText: e.target.value,
      optionsChanged,
    });
  }

  onClickSelect() {
    const disabled = this.state.disabled;
    if (!disabled) {
      this.setState({
        showRows: !this.state.showRows,
      });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showRows: false,
      });
    }
  }

  findArrObjValue(arr, checkProp, checkValue, findProp) {
    const arrLen = arr.length;
    for (let i = 0; i < arrLen; i += 1) {
      if (arr[i][checkProp] === checkValue) return arr[i][findProp];
    }
    return '';
  }

  render() {
    const {
      className,
      disabled,
      disabledRows,
      iconSize,
      formId,
      name,
      maxRows,
      optionsChanged,
      required,
      placeholder,
      selectedValue,
      showRows,
      title,
      changedText,
    } = this.state;
    let selectClassName = !className ? 'select-wrapper' : 'select-wrapper ' + className; // eslint-disable-line
    selectClassName = disabled ? 'select-wrapper-disabled' : selectClassName;
    const showUnderHeaderClassName = showRows ? 'select-under-header' : 'select-under-header-hide'; // eslint-disable-line
    const optionsLen = optionsChanged.length;
    let rowsNum = maxRows;
    const selectStyle = {};
    if (optionsLen <= maxRows) {
      rowsNum = optionsLen;
      selectStyle.overflowY = 'hidden';
    }
    let selectedText = changedText;
    if (selectedValue && !changedText) {
      selectedText = this.findArrObjValue(optionsChanged, 'value', selectedValue, 'text');
    }
    return (
      <div
        className={selectClassName}
        ref={this.setWrapperRef}
      >
        <div
          className="select-header"
          onClick={this.onClickSelect}
          onKeyDown={() => {}}
        >
          <input
            className="select-selected"
            placeholder={placeholder}
            title={title}
            value={selectedText}
            onChange={(val) => { this.onChangeInput(val); }}
          />
          <div className="select-icon">
            <Icon name="dropdown" width={iconSize} color={Colors.vezeetaBlue} />
          </div>
        </div>
        <div className={showUnderHeaderClassName}> {/* eslint-disable-line */}
          <div className="select-rows-style">
            <select
              style={selectStyle}
              disabled={disabledRows}
              form={formId}
              name={name}
              onClick={this.onClickSelectRow}
              required={required}
              size={rowsNum}
              defaultValue={selectedValue}
            >
              {
                optionsChanged.map((option) => { // eslint-disable-line
                  return (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  );
                })
              }
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledRows: PropTypes.bool,
  iconSize: PropTypes.number,
  formId: PropTypes.string,
  name: PropTypes.string,
  maxRows: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selectedValue: PropTypes.string,
  title: PropTypes.string,
};

Select.defaultProps = {
  className: '',
  disabledRows: false,
  disabled: false,
  iconSize: 18,
  formId: '',
  name: '',
  maxRows: 5,
  options: [],
  placeholder: 'select',
  required: false,
  title: '',
};

export default Select;
