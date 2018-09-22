import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

import './index.scss';

class PatientRaw extends PureComponent {
  render() {
    const {
      PatientKey,
      FullName,
      MobilePhone,
      PatientId,
      Gender,
      BirthDate,
      InsuranceProvider,
    } = this.props.patient;
    console.log('PatientRaw23 patient', this.props.patient);
    const now = new Date();
    const birthDate = BirthDate ? new Date(BirthDate) : '';
    let age = '';
    if (birthDate) {
      const nowYear = now.getFullYear();
      const birthYear = birthDate.getFullYear();
      age = nowYear - birthYear;
    }
    const insuranceProviderName = InsuranceProvider && InsuranceProvider.Name ? InsuranceProvider.Name : '';
    const ageTxt = age ? age + 'Y' : ''; // eslint-disable-line
    const genderTxt = Gender ? '-' + Gender : ''; // eslint-disable-line
    const ageGender = ageTxt + genderTxt;  // eslint-disable-line
    const patientIdTxt = PatientId ? 'ID:' + PatientId : ''; // eslint-disable-line
    return (
      <div className="row appointment">
        <div className="col-xs-11">
          <div className="row">
            <div className="col-xs-4">
              <Text className="block blue-text bold fs-18">
                { FullName }
              </Text>
              <Text className="block fs-16">
                { ageGender }
              </Text>
            </div>

            <div className="col-xs-4">
              <Text className="block bold fs-16">
                {MobilePhone}
              </Text>
              <Text className="block bold fs-16">
                {patientIdTxt}
              </Text>
            </div>

            <div className="col-xs-4">
              <Text className="block bold fs-16">
                {insuranceProviderName}
              </Text>
              <Text className="block bold fs-16">
                {PatientKey}
              </Text>
            </div>
          </div>
        </div>
        <div className="col-xs-1">
          <div className="row">
            <div
              className="col-xs-12 patients-list-icon"
              onClick={() => this.props.onClickEditPatient(PatientKey)}
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
  onClickEditPatient: PropTypes.func,
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

