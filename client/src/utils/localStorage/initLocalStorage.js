import { LOCAL_STORAGE_KEY } from './constants';

export const initLocalStorage = () => {
  console.log('init local storage');
  Object.keys(LOCAL_STORAGE_KEY).forEach((key) => {
    localStorage.setItem(LOCAL_STORAGE_KEY[key], null);
  });
};
