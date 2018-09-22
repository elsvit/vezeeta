import React, { Component } from 'react';
import Api from '../../components/apis/Api.js';
import config from '../../config';
import ComboBox from '../../components/comboBox/ComboBox';

class PatientSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.keywordChange = this.keywordChange.bind(this);
    this.apiWrapper = new Api();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  async keywordChange(value) {
    this.setState({ value });
    let patientData = await this.apiWrapper.get(
      `${config.cdoctorsApiHost}${config.getPatientsListUrl}?keyword=${value}&page=1&pageSize=100`,
      [
        {
          key: 'ClinicKey',
          value: 'clnc8c1fff89af1dacc0'
        },
        {
          key: 'Authorization',
          value: '9913fb'
        },
        {
          key: 'Language',
          value: 'ar-EG'
        }
      ] //Remove this
    ).data;

    if (patientData === undefined) return;

    let suggestions = [];
    patientData.forEach(function(element) {
      suggestions.push({
        data: {
          placeholder: element.PatientName,
          value: element.PatientKey
        },
        component: <div>element.PatientName</div>
      });
    });

    this.setState({ suggestions: suggestions });
  }

  render() {
    let data = [
      {
        data: { placeholder: 'ahmed', value: 'ahmed', searchable: ['ahmed'] },
        component: <div>ahmed</div>
      },
      {
        data: { placeholder: 'adel', value: 'adel', searchable: ['adel'] },
        component: <div>adel</div>
      },
      {
        data: { placeholder: 'ramy', value: 'ramy', searchable: ['ramy'] },
        component: <div>ramy</div>
      }
    ];

    return <ComboBox items={data} placeholder="Search By Patient" />;
  }
}

export default PatientSearchContainer;
