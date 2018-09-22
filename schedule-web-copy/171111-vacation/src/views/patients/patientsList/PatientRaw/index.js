import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

import { MODAL_NAMES } from '../../../Constants';
import { getGenderText, getAge } from '../../../Helpers';
import './index.scss';

class PatientRaw extends PureComponent {
  render() {
    const {
      FullName,
      MobilePhone,
      PatientId,
      Gender,
      BirthDate,
      InsuranceProvider,
    } = this.props.patient;
    let age = '';
    if (BirthDate) {
      age = getAge(BirthDate);
    }
    const insuranceProviderName = InsuranceProvider && InsuranceProvider.Name ? InsuranceProvider.Name : '';
    const ageTxt = age ? ''.concat(age, 'Y') : '';
    const genderTxt = getGenderText(Gender);
    const ageGender = ''.concat(ageTxt, '-', genderTxt);
    const patientIdTxt = PatientId ? 'ID:'.concat(PatientId) : '';
    return (
      <div className="patient-list-row appointment patient-list">
        <div className="width-90">
          <div className="width-100">
            <div className="width-40">
              <div className="patients-list-raw-vezeeta-blue">
                <Text
                  className="block blue-text bold fs-18 cursor-pointer"
                  onClick={() => this.props.openModal(MODAL_NAMES.PATIENT_DETAILS, { patient: this.props.patient })}
                >
                  { FullName }
                </Text>
              </div>
              <div className="patients-list-raw-helper-grey">
                <Text className="block bold fs-16">
                  { ageGender }
                </Text>
              </div>
            </div>

            <div className="width-30">
              <div className="patients-list-raw-helper-grey">
                <Text className="block bold fs-16 overflow-hide">
                  {MobilePhone}
                </Text>
              </div>
              <div className="patients-list-raw-helper-grey">
                <Text className="block bold fs-16 overflow-hide">
                  {patientIdTxt}
                </Text>
              </div>
            </div>

            <div className="width-30">
              <div className="patients-list-raw-helper-grey">
                <Text className="block bold fs-16 overflow-hide">
                  {insuranceProviderName}
                </Text>
              </div>
              <div className="patients-list-raw-helper-grey">
                <Text className="block bold fs-16">
                  Last Reservation
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="width-10">
          <div
            className="width-100 patients-list-icon"
            onClick={() => this.props.openModal(MODAL_NAMES.EDIT_PATIENT, { patient: this.props.patient })}
            onKeyDown={() => {}}
          >
            <Icon
              name="edit"
              width={30}
              height={30}
              color={Colors.blueOne}
            />
          </div>
        </div>
      </div>
    );
  }
}

PatientRaw.propTypes = {
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
    Gender: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
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
  openModal: PropTypes.func,
};

PatientRaw.defaultProps = {
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

export default PatientRaw;

