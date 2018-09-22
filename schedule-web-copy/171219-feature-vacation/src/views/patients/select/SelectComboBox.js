import React from 'react';
import PropTypes from 'prop-types';
import { ComboBox } from '@vezeeta/web-components';

const Select = (props) => (
  <ComboBox
    className={props.className}
    items={props.options.map((val) => (
      {
        data: {
          placeholder: val.text,
          value: val.value,
          searchable: val.text,
        },
        component: <div>{ val.text }</div>,
      }
    ))}
    select={props.selectedValue}
    onChange={props.onChange}
    placeholder={props.placeholder}
  />
);

Select.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool, // eslint-disable-line
  disabledRows: PropTypes.bool, // eslint-disable-line
  iconSize: PropTypes.number, // eslint-disable-line
  formId: PropTypes.string, // eslint-disable-line
  name: PropTypes.string, // eslint-disable-line
  maxRows: PropTypes.number, // eslint-disable-line
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool, // eslint-disable-line
  selectedValue: PropTypes.string,
  title: PropTypes.string, // eslint-disable-line
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

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { ComboBox } from '@vezeeta/web-components';
//
// class Select extends Component { // eslint-disable-line
//   render() {
//     return (
//       <ComboBox
//         className={this.props.className}
//         items={this.props.options.map((val) => (
//           {
//             data: {
//               placeholder: val.text,
//               value: val.value,
//               searchable: val.text,
//             },
//             component: <div>{ val.text }</div>,
//           }
//         ))}
//         select={this.props.selectedValue}
//         onChange={this.props.onChange}
//         placeholder={this.props.placeholder}
//       />
//     );
//   }
// }
