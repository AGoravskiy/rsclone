import { initLocalStorage, LOCAL_STORAGE_KEY, routes } from '../utils';

document.addEventListener('DOMContentLoaded', () => {
  const statistics = {};
  localStorage.clear();
  initLocalStorage();

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // const PORT = 3000;

  // const HOST = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` :
  // 'https://crazyrace.herokuapp.com/';
  // 'https://nfs-jsu.herokuapp.com/statistics';
  /*
          const map {
            map: '',
            car: '',
            nickname: '',
            'best lap': num,
            'average laps': num
          }
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
        // passwordErr.classList.add('active');
        // emailErr.classList.add('active');
        alert(data.message);
      }
      console.log(data); // JSON data parsed by `data.json()` call
    });
  });

  /*
          function signIn() {
            let data = {
              email: document.forms[0].elements[0].value,
              password: document.forms[0].elements[1].value,
            };
            console.log(data);
            let sendData = JSON.stringify(data);
            console.log(sendData);
            fetch(`${HOST}`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: sendData,
            }).then((response => response.json()).then(data => console.log(data)));

            => {

              console.log('всё работает');
              window.location.href = 'game.html';

            });
          } */
});
