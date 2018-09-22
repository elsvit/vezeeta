export const USER = {
  SET: 'USER_SET',
};

export const setUser = (user) => (
  {
    type: USER.SET,
    user,
  }
);
