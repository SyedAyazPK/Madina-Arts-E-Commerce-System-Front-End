const { REACT_APP_API_URL } = process.env;

const jwtServiceConfig = {
  signIn: 'api/auth/sign-in',
  // signUp: 'api/auth/sign-up',
  signUp: `${REACT_APP_API_URL}/api/v2/auth/register`,
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
};

export default jwtServiceConfig;
