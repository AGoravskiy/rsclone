import { LOCAL_STORAGE_KEY } from '../localStorage';

export const sendRequest = async (url, options) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

  if (!refreshToken) {
    window.location.href = '/login.html';
    return;
  }
  if (!accessToken && refreshToken) {
    const response = await fetch(routes.user.refreshToken, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    if (response.status === 401) {
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, null);
      window.location.href = 'login.html';
      return;
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
  }
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
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
