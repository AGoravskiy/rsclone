import { routes } from '../src/utils';
import postData from '../src/utils/simpleFunc/asyncFunc';

export default function loginScript() {
  console.log('load loginScript.js');
  localStorage.clear();
  const statistics = {};
  const loginLink = routes.user.login;
  const formLogin = document.querySelector('#formLogin');
  const emailLogin = document.querySelector('#emailLogin');
  const passwordLogin = document.querySelector('#passwordLogin');

  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('email', emailLogin.value);

    postData(loginLink, {
      email: emailLogin.value,
      password: passwordLogin.value,
    }).then((data) => {
      if (data.code === 200) {
        localStorage.setItem('statistics', JSON.stringify(statistics));
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('token', data.token);
        window.location.href = '#game';
      } else {
        alert(data.message);
      }
      console.log(data);
    });
  });
}
