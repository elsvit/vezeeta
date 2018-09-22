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

import './EditPatient.scss';
import DateInput from '../../vacation/dateInput/DateInput';


const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class EditPatient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.patient, // eslint-disable-line
    };
  }

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
    const { showEditPatient } = this.props; // eslint-disable-line
    console.log('EditPatient46 showEditPatient', showEditPatient);
    const addVacationClass = showEditPatient ? 'patients-edit-patient' : 'patients-edit-patient-hide';
    const components = this.setComponents();
    const phonePrefixes = this.setPhonePrefixes();
    return (
      <div className={addVacationClass} id="patients-edit-patient">
        <div className="patients-edit-patient-tab">
          <div className="patients-edit-patient-header">
            <Text className="patients-edit-patient-header-title bold fs-20">
              Edit Patient
            </Text>
            <span
              className="patients-edit-patient-header-close bold fs-20"
              onClick={this.props.closeEditPatient}
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
              <div className="patients-edit-patient-subblock">
                <InputField
                  className="fs-18 grey-text bold patients-edit-patient-input"
                  placeholder="Patient Name *"
                  onTyping={() => {}}
                />
              </div>
            </div>
            <div className="col-xs-2">
              <div className="patients-edit-patient-subblock">
                <Text className="fs-18 grey-text bold">
                  Gender
                </Text>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="patients-edit-patient-subblock">
                <RadioButton
                  key="radioButton"
                  className="patients-edit-patient-gender-radiobuttons"
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
                <div className="patients-edit-patient-subblock">
                  <ComboBox
                    className="fs18 bold grey-text patients-edit-patient-combobox patients-edit-patient-phoneprefix"
                    items={phonePrefixes}
                    placeholder="+02"
                    setData={() => {}}
                    select=""
                  />
                </div>
              </div>
              <div className="col-xs-10">
                <div className="patients-edit-patient-subblock">
                  <InputField
                    className="fs-18 grey-text bold patients-edit-patient-input"
                    placeholder="Patient Mobile Number *"
                    onTyping={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="raw">
              <div className="col-xs-6">
                <div className="patients-edit-patient-subblock-datainput">
                  <DateInput
                    className=""
                    placeholder="Birth Date"
                    onChange={() => {}}
                    minDate=""
                    maxDate="01/01/2100"
                    date="01/01/1995"
                    label=""
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="patients-edit-patient-subblock">
                  <InputField
                    className="fs-18 grey-text bold patients-edit-patient-input"
                    placeholder="Patient ID"
                    onTyping={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="raw">
              <div className="col-xs-12">
                <div className="patients-edit-patient-subblock">
                  <ComboBox
                    className="fs18 bold grey-text patients-edit-patient-combobox"
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
                <div className="patients-edit-patient-subblock">
                  <ComboBox
                    className="fs18 bold grey-text patients-edit-patient-combobox"
                    items={phonePrefixes}
                    placeholder="Relative"
                    setData={() => {}}
                    select=""
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="patients-edit-patient-subblock">
                  <InputField
                    className="fs-18 grey-text bold patients-edit-patient-input"
                    placeholder="Relative Name"
                    onTyping={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="patients-edit-patient-branch-block" >
              <div className="patients-edit-patient-branch-cancel" id="patients-edit-patient-branch-cancel">
                <div className="patients-edit-patient-button-left ">
                  <Button
                    className="fs-16 patients-edit-patient-button-cancel"
                    onClick={this.props.closeEditPatient}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="patients-edit-patient-button-right" id="patients-edit-patient-branch-add">
                <Button
                  className="fs-16"
                  onClick={this.props.submitEditPatient}
                >
                  Edit Patient
                </Button>
              </div>
            </div>
          </div>

        </div>
        <div className="patients-edit-patient-opacity">  {/* eslint-disable-line */}
        </div>
      </div>
    );
  }
}

EditPatient.propTypes = {
  closeEditPatient: PropTypes.func,
  showEditPatient: PropTypes.bool,
  submitEditPatient: PropTypes.func, // eslint-disable-line
  patient: PropTypes.shape({
    Address: PropTypes.string,
    BirthDate: PropTypes.string,
    CountryCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    CountryIsoCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    EmailAddress: PropTypes.string,
    FullName: PropTypes.string.isRequired,
    PatientKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    PatientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    Gender: PropTypes.string,
    HomeNumber: PropTypes.string,
    IsDeleted: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    MobilePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    PatientRelativeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Notes: PropTypes.string,
    RelativeName: PropTypes.string,
    InsuranceProvider: PropTypes.shape({
      InsuranceProviderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      InsuranceProviderKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      InsuranceKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Name: PropTypes.string,
      NameArabic: PropTypes.string,
    }),
    InsuranceProviderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  // onClickEditPatient: PropTypes.func,
};

EditPatient.defaultProps = {
  patient: {
    Address: '',
    BirthDate: '',
    CountryCode: '',
    CountryIsoCode: '',
    EmailAddress: '',
    Gender: '',
    HomeNumber: '',
    Identifier: '',
    PatientRelativeId: '',
    RelativeName: '',
    InsuranceProvider: {
      InsuranceProviderId: '',
      InsuranceProviderKey: '',
    },
    InsuranceProviderId: '',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPatient);
