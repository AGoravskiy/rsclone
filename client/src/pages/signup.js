import { routes } from '../utils';

localStorage.clear();

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

const button = document.querySelector('.sign-up-btn');
const form = document.querySelector('.form-sign-up');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  postData(routes.user.signup, {
    email: document.forms[0].elements[1].value,
    password: document.forms[0].elements[2].value,
    name: document.forms[0].elements[0].value,
  }).then((data) => {
    if (data.code === 200) {
      alert('Now you are logged in');
      window.location.href = 'login.html';
    } else {
      alert('Ooops! something wrong :(');
    }
  });
});
