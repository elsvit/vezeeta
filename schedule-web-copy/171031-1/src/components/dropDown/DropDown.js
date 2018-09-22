// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import { Tooltip } from '../Components';
// import { Config, User } from '../../views/signup/_objects/_Objects';
// import './DropDown.scss';

// class DropDown extends Component {
//   constructor(props) {
//     super(props);

//     this.toggleDropDown = this.toggleDropDown.bind(this);
//     this.hideDropDown = this.hideDropDown.bind(this);
//     this.updateValue = this.updateValue.bind(this);
//     this.showTooltip = this.showTooltip.bind(this);

//     this.config = Config.getInstance();
//     this.user = User.getInstance();

//     this.state = {
//       isDropDownOpened: false,
//       disableClick: false,
//       value: {},
//       isLoading: this.props.items ? false : true,
//       placeholder: this.props.component,
//       items: this.props.items
//     };
//   }

//   /**
//    * Checks if the items props changed and updates it
//    * @param {object} nextProps
//    */
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.items !== this.state.items && nextProps.items.length !== 0) {
//       this.setState({
//         items: nextProps.items,
//         isLoading: false
//       });
//     }

//     if (
//       nextProps.component !== this.state.component &&
//       nextProps.component.length !== 0
//     ) {
//       this.setState({
//         placeholder: nextProps.component,
//         isLoading: false
//       });
//     }
//   }

//   /**
//    * Shows/hides the drop-down
//    */
//   toggleDropDown() {
//     this.setState({
//       isDropDownOpened: !this.state.isDropDownOpened
//     });

//     if (!this.state.isDropDownOpened) {
//       this.dropDown.style.display = 'flex';
//     } else {
//       this.dropDown.style.display = 'none';
//     }
//   }

//   /**
//    * Hide the drop-down
//    */
//   hideDropDown() {
//     this.setState({
//       isDropDownOpened: false
//     });
//     this.dropDown.style.display = 'none';
//   }

//   /**
//    *
//    * @param {object} newValue
//    * @param {component} newPlaceholder
//    */
//   updateValue(newValue, newPlaceholder) {
//     this.setState({
//       value: newValue,
//       placeholder: newPlaceholder
//     });
//     if (this.props.setData) {
//       this.props.setData.setCountryId(newValue.idValue);
//       this.props.setData.setCulture(`en-${newValue.isoValue}`);
//     }
//     this.dropDown.style.display = 'none';
//   }

//   /**
//    * Show tooltip beside drop-down
//    */
//   showTooltip(message) {
//     this.tooltip.showTooltip(message);
//   }

//   render() {
//     let dropDown, placeholder, pointerEvents, cursor;
//     if (!this.state.isLoading) {
//       placeholder = this.state.placeholder;
//       dropDown = this.state.items.map((item, itemId) => {
//         return (
//           <li
//             key={itemId}
//             onMouseDown={() => this.updateValue(item.data, item.component)}
//             className="drop-down-item"
//           >
//             {item.component}
//           </li>
//         );
//       });

//       if (
//         location.pathname == '/signup' ||
//         location.pathname == '/signup/' ||
//         location.pathname == '/signup/basic-info' ||
//         location.pathname == '/signup/basic-info/'
//       ) {
//         pointerEvents = 'initial';
//         cursor = 'pointer';
//       } else {
//         pointerEvents = 'none';
//         cursor = 'initial';
//       }
//     }

//     return (
//       <div className="drop-down">
//         <div
//           tabIndex="0"
//           className="value-placeholder"
//           onBlur={this.hideDropDown}
//           onClick={this.toggleDropDown}
//           style={{
//             pointerEvents: pointerEvents,
//             cursor: cursor
//           }}
//           ref={dropDown => (this.dropDown = dropDown)}
//         >
//           {placeholder}
//         </div>
//         <ul className="list" ref={dropDown => (this.dropDown = dropDown)}>
//           {dropDown}
//         </ul>
//         <Tooltip
//           tooltipAlignment="left"
//           ref={tooltip => (this.tooltip = tooltip)}
//         />
//       </div>
//     );
//   }
// }

// DropDown.propTypes = {
//   component: PropTypes.object,
//   items: PropTypes.array,
//   setData: PropTypes.object
// };

// export default DropDown;
