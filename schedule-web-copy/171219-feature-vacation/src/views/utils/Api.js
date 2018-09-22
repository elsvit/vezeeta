export const requestFailed = (response) =>
  Math.floor(response.status / 100) !== 2;

export const requestWithError = (response) => !response.data[0].Success;

export const getRequestError = (response) => response.data[0].Errors[0].Message;
