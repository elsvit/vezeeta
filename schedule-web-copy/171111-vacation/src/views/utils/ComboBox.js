import React from 'react';
import { Text } from '@vezeeta/web-components';
import {
  VISIT_TYPES,
  COUNTRY_CODES,
  INSURANCE_PROVIDERS,
  RELATIVE_TYPES,
} from '../Constants';

const createOption = (label, value, isSelected = false) => ({
  data: {
    placeholder: label,
    value,
    searchable: [label],
  },
  component: <Text>{label}</Text>,
  isSelected,
});

const getOptionsFromConstant = (constant, selectedValue = '') =>
  Object.values(constant).map((value) =>
    createOption(value, value, value === selectedValue));

export const getVisitTypesOptions = () => getOptionsFromConstant(VISIT_TYPES);

export const getCountryCodeOptions = () =>
  getOptionsFromConstant(COUNTRY_CODES, COUNTRY_CODES.EGYPT);

export const getInsuranceOptions = () =>
  getOptionsFromConstant(INSURANCE_PROVIDERS);

export const getRelativesOptions = () => getOptionsFromConstant(RELATIVE_TYPES);

export const getSelectTimeOptions = () => {
  const options = [];

  for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += 30) {
      const hours = h < 10 ? `0${h}` : h;
      const minutes = m < 10 ? `0${m}` : m;
      const timeLabel = `${hours}:${minutes}`;
      const timeValue = `${hours}:${minutes}:00`;

      options.push(createOption(timeLabel, timeValue));
    }
  }

  return options;
};
