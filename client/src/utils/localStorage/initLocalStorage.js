import { LOCAL_STORAGE_KEY } from './constants';

export const initLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, null);
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, null);
  localStorage.setItem(LOCAL_STORAGE_KEY.email, null);
  localStorage.setItem(LOCAL_STORAGE_KEY.staistics, null);
};
