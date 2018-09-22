const noSpaces = /^\S*$/;
const noNumbers = /^([^0-9]*)$/;
const noSpecialChar = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9 ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/;
const max255Char = /^.{0,255}$/;
const passwordLength = /^.{8,50}$/;
const oneNumber = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
const email = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*).([A-Za-z]{2,})$/;
const allNum = /[\d]/;
const creditCardNumber = /^((4\d{3})|(5[1-5]\d{2})|(6011)|(34\d{1})|(37\d{1}))-?\s?\d{4}-?\s?\d{4}-?\s?\d{4}|3[4,7][\d\s-]{15}$/;
const month = /^(0?[1-9]|1[012])$/;
const year = /^\d{2}$/;
const cvv = /^[0-9]{3,4}$/;

export default {
  humanName: [
    {
      regex: noNumbers,
      errorMessage: 'Enter your name with no numbers',
    },
    {
      regex: noSpecialChar,
      errorMessage: 'Enter your name with no special characters',
    },
    {
      regex: max255Char,
      errorMessage: '255 characters allowed',
    },
  ],
  clinicName: [
    {
      regex: max255Char,
      errorMessage: '255 characters allowed',
    },
    {
      regex: noSpecialChar,
      errorMessage: 'Clinic name shouldn\'t contain special characters',
    },
    {
      regex: noNumbers,
      errorMessage: 'Clinic name shouldn\'t contain numbers',
    },
  ],
  password: [
    {
      regex: passwordLength,
      errorMessage: 'Password length should between 8 to 50 character',
    },
    {
      regex: oneNumber,
      errorMessage: 'Password should contain 1 number and 1 character at least',
    },
    {
      regex: noSpaces,
      errorMessage: 'Password shouldn\'t contain spaces',
    },
  ],
  email: [
    {
      regex: noSpaces,
      errorMessage: 'Email shouldn\'t contain space',
    },
    {
      regex: email,
      errorMessage: 'Email isn\'t valid',
    },
    {
      regex: max255Char,
      errorMessage: '255 characters allowed',
    },
  ],
  phoneNumber: [
    {
      regex: allNum,
      errorMessage: 'Mobile number isn\'t valid',
    },
  ],
  creditCard: [
    {
      regex: creditCardNumber,
      errorMessage: 'Enter a valid credit card number',
    },
  ],
  year: [
    {
      regex: year,
      errorMessage: 'Year isn\'t valid',
    },
  ],
  month: [
    {
      regex: month,
      errorMessage: 'Month isn\'t valid',
    },
  ],
  cvv: [
    {
      regex: cvv,
      errorMessage: 'CVV isn\'t valid',
    },
  ],
};
