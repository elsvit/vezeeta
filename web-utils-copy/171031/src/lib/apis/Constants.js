const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  CONFLICT: 409,
  INVALID: 400,
  NOT_AUTHORIZED: 401,
  NOTFOUND: 404,
};

const FIELDS = {
  EMAIL: 'Email',
  COUNTRY_CODE: 'CountryCode',
  MOBILE_NUMBER: 'Mobile',
  FIRST_NAME: 'FirstName',
  LAST_NAME: 'LastName',
  PASSWORD: 'Password',
};

export { STATUS, FIELDS };
export default STATUS;
