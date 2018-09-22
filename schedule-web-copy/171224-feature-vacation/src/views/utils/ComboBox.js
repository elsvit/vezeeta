import React from 'react';
import { Text } from '@vezeeta/web-components';
import { VISIT_TYPES, INSURANCE_PROVIDERS, RELATIVE_TYPES } from '../Constants';

const createOption = (label, value) => ({
  data: {
    placeholder: label,
    value,
    searchable: [label],
  },
  component: <Text>{label}</Text>,
});

const getOptionsFromConstant = (constant) =>
  Object.values(constant).map((value) => createOption(value, value));

export const getVisitTypesOptions = () => getOptionsFromConstant(VISIT_TYPES);

export const getCountryCodeOptions = (countries) =>
  countries.map((country) =>
    createOption(country.CountryCode, country.CountryCode));

export const getBranchesOptions = (branches) =>
  branches.length > 0 &&
  branches.map((branch) => createOption(branch.BranchName, branch.BranchKey));

export const getInsuranceOptions = () =>
  getOptionsFromConstant(INSURANCE_PROVIDERS);

export const getRelativesOptions = () => getOptionsFromConstant(RELATIVE_TYPES);
