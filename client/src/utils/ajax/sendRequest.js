import { LOCAL_STORAGE_KEY } from '../localStorage';
import { routes } from '../routes';

const parseToken = (token) => {
  if (typeof token !== 'string') {
    return token;
  }

  try {
    const parsedToken = JSON.parse(token);
    return parsedToken;
  } catch (e) {
    return token;
  }
};

export const sendRequest = async (url, options) => {
  let accessToken = parseToken(
    localStorage.getItem(LOCAL_STORAGE_KEY.accessToken),
  );
  let refreshToken = parseToken(
    localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken),
  );

  if (!refreshToken) {
    window.location.href = '/';
    return;
  }
  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(routes.user.refreshToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        throw new Error('Refresh token failed', response);
      }
      const responseJson = await response.json();
      localStorage.setItem(
        LOCAL_STORAGE_KEY.accessToken,
        responseJson.accessToken,
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEY.refreshToken,
        responseJson.refreshToken,
      );
      accessToken = responseJson.accessToken;
      refreshToken = responseJson.refreshToken;
    } catch (e) {
      console.error(JSON.stringify(e));
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, null);
      window.location.href = '/login';
    }
  }
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    ...options,
  });
  if (response.status === 401) {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, null);
    sendRequest(url, options);
  }
  // eslint-disable-next-line consistent-return
  return response.json();
};
