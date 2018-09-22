import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Text,
  ComboBox,
  // Checkbox,
  RadioButton, // eslint-disable-line
  Button,
  Icon,
  InputField,
} from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import './AddPatient.scss';
import DateInput from '../../vacation/dateInput/DateInput';


const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class AddPatient extends PureComponent {
  onChangeRadioButton(e) {
    console.log('onChangeRadioButton e', e);
  }
  setDataRadioButton(e) {
    console.log('setDataRadioButton e', e);
  }
  setComponents() {
    const result = [];
    result.push(<div>
      <Icon
        key={result.length}
        name="male"
        width={25}
        height={35}
        color={Colors.helperGrey}
      />
    </div>);// eslint-disable-line
    result.push(<div>
      <Icon
        key={result.length}
        name="female"
        width={25}
        height={35}
        color={Colors.helperGrey}
      />
    </div>);// eslint-disable-line
    return result;
  }
  setPhonePrefixes() {
    const result = [
      {
        data: {
          placeholder: '+02',
          value: '02',
          searchable: ['+02'],
        },
        component: <div>+02</div>,
      },
      {
        data: {
          placeholder: '+03',
          value: '03',
          searchable: ['+03'],
        },
        component: <div>+03</div>,
      },
    ];
    return result;
  }

  render() {
    const { showAddPatient } = this.props; // eslint-disable-line
    console.log('AddPatient46 showAddPatient', showAddPatient);
    const addVacationClass = showAddPatient ? 'patients-add-patient' : 'patients-add-patient-hide';
    const now = new Date();
    const nowDate = (+now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear(); // eslint-disable-line
    console.log('AddPatient107 nowDate', nowDate);
    const components = this.setComponents();
    const phonePrefixes = this.setPhonePrefixes();
    return (
      <div className={addVacationClass} id="patients-add-patient">
        <div className="patients-add-patient-tab">
          <div className="patients-add-patient-header">
            <Text className="patients-add-patient-header-title bold fs-20">
              Add New Patient
            </Text>
            <span
              className="patients-add-patient-header-close bold fs-20"
              onClick={this.props.closeAddPatient}
              onKeyDown={() => {}}
            >
              <Icon
                name="close"
                width={20}
                height={20}
                color={Colors.mediumGrey}
              />
            </span>
          </div>

          <div className="raw">
            <div className="col-xs-12">
              <hr className="separator block" />
            </div>
          </div>
          <div className="raw">
            <div className="col-xs-6">
              <div className="patients-add-patient-subblock">
                <InputField
                  className="fs-18 grey-text bold patients-add-patient-input"
                  placeholder="Patient Name *"
                  onTyping={() => {}}
                />
              </div>
            </div>
            <div className="col-xs-2">
              <div className="patients-add-patient-subblock">
                <Text className="fs-18 grey-text bold">
                  Gender
                </Text>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="patients-add-patient-subblock">
                <RadioButton
                  key="radioButton"
                  className="patients-add-patient-gender-radiobuttons"
                  selected={0}
                  options={[
                    {
                      value: 0,
                      name: 'name1',
                      component: components[0],
                    },
                    {
                      value: 1,
                      name: 'name1',
                      component: components[1],
                    },
                  ]}
                  listAlignment="flex-row"
                  setData={this.setDataRadioButton}
                  onChange={this.onChangeRadioButton}
                />
              </div>
            </div>

            <div className="raw">
              <div className="col-xs-2">
                <div className="patients-add-patient-subblock">
                  <ComboBox
                    className="fs18 bold grey-text patients-add-patient-combobox patients-add-patient-phoneprefix"
                    items={phonePrefixes}
                    placeholder="+02"
                    setData={() => {}}
                    select=""
                  />
                </div>
              </div>
              <div className="col-xs-10">
                <div className="patients-add-patient-subblock">
                  <InputField
                    className="fs-18 grey-text bold patients-add-patient-input"
                    placeholder="Patient Mobile Number *"
                    onTyping={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="raw">
              <div className="col-xs-6">
                <div className="patients-add-patient-subblock-datainput">
                  <DateInput
                    className=""
                    placeholder="Birth Date"
                    onChange={() => {}}
                    minDate="01/01/1888"
                    maxDate={nowDate}
                    date=""
                    label=""
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="patients-add-patient-subblock">
                  <InputField
                    className="fs-18 grey-text bold patients-add-patient-input"
                    placeholder="Patient ID"
                    onTyping={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="raw">
              <div className="col-xs-12">
                <div className="patients-add-patient-subblock">
                  <ComboBox
                    className="fs18 bold grey-text patients-add-patient-combobox"
                    items={phonePrefixes}
                    placeholder="Select Insurance"
                    setData={() => {}}
                    select=""
                  />
                </div>
              </div>
            </div>

            <div className="raw">
              <div className="col-xs-6">
                <div className="patients-add-patient-subblock">
                  <ComboBox
                    className="fs18 bold grey-text patients-add-patient-combobox"
                    items={phonePrefixes}
                    placeholder="Relative"
                    setData={() => {}}
                    select=""
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="patients-add-patient-subblock">
                  <InputField
                    className="fs-18 grey-text bold patients-add-patient-input"
                    placeholder="Relative Name"
                    onTyping={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="patients-add-patient-branch-block" >
              <div className="patients-add-patient-branch-cancel" id="patients-add-patient-branch-cancel">
                <div className="patients-add-patient-button-left ">
                  <Button
                    className="fs-16 patients-add-patient-button-cancel"
                    onClick={this.props.closeAddPatient}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="patients-add-patient-button-right" id="patients-add-patient-branch-add">
                <Button
                  className="fs-16"
                  onClick={this.props.submitAddPatient}
                >
                  Add Patient
                </Button>
              </div>
            </div>
          </div>

        </div>
        <div className="patients-add-patient-opacity">  {/* eslint-disable-line */}
        </div>
      </div>
    );
  }
}

AddPatient.propTypes = {
  showAddPatient: PropTypes.bool,
  submitAddPatient: PropTypes.func,
  closeAddPatient: PropTypes.func,
  // clinics: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);
