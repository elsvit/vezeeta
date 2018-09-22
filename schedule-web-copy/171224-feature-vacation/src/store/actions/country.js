export const COUNTRY = {
  LOAD: 'COUNTRY_LOAD',
  LOAD_DONE: 'COUNTRY_LOAD_DONE',
  LOAD_FAIL: 'COUNTRY_LOAD_FAIL',
};

export const loadCountry = () => ({
  type: COUNTRY.LOAD,
});

export const loadCountryDone = (countries) => ({
  type: COUNTRY.LOAD_DONE,
  countries,
});

export const loadCountryFail = (err) => ({
  type: COUNTRY.LOAD_FAIL,
  err,
});
