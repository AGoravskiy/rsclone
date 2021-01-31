const origin = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://nfs-jsu.herokuapp.com';

const getRootRoute = (trailing) => `${origin}/${trailing}`;
const getUserRoute = (trailing) => `${origin}/user/${trailing}`;

export const routes = {
  submitGame: getRootRoute('submit-game'),
  scores: getRootRoute('scores'),
  user: {
    status: getUserRoute('status'),
    signup: getUserRoute('signup'),
    login: getUserRoute('login'),
    logout: getUserRoute('logout'),
    refreshToken: getUserRoute('refresh-token'),
    checkToken: getUserRoute('check-token'),
  },
};
