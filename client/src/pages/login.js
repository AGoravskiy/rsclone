import { initLocalStorage, LOCAL_STORAGE_KEY, routes } from '../utils';

document.addEventListener('DOMContentLoaded', () => {
  const statistics = {};
  localStorage.clear();
  initLocalStorage();

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  /*
      console.log(form);
            console.log(mail.validity);
            console.log(mail.value);
            console.log(password.value);
            console.log(mail.value.length);
            console.log(password.value.length);

          */
  const form = document.querySelector('.form-sign-in');
  const signInButton = document.querySelector('.sign-in-btn');
  const signUpButton = document.querySelector('.sign-up');
  const mail = document.querySelector('#email');
  const password = document.querySelector('#password');
  const emailErr = document.querySelector('.email-error');
  const passwordErr = document.querySelector('.password-error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('email', document.forms[0].elements[0].value);
    postData(routes.user.login, {
      email: document.forms[0].elements[0].value,
      password: document.forms[0].elements[1].value,
    }).then((data) => {
      if (data.code === 200) {
        console.log('success');
        console.log(data);
        localStorage.setItem(
          LOCAL_STORAGE_KEY.statistics,
          JSON.stringify(statistics),
        );
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, data.refreshToken);
        console.log(
          '🚀 ~ file: login.js ~ line 68 ~ form.addEventListener ~ data',
          data,
        );
        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, data.token);
        window.location.href = '/game.html';
      } else if (data.status === 'fail email') {
        alert('There is no such email address');
        emailErr.classList.add('active');
      } else if (data.status === 'fail password') {
        passwordErr.classList.add('active');
        alert('Wrong password entered');
      } else {
        alert(data.message);
      }
      console.log(data);
    });
  });
});
