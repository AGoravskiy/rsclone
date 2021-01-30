import { routes } from '../utils';

localStorage.clear();

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

const button = document.querySelector('.sign-up-btn');
const form = document.querySelector('.form-sign-up');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  postData(routes.user.signup, {
    email: document.forms[0].elements[0].value,
    password: document.forms[0].elements[1].value,
    name: document.forms[0].elements[2].value,
  }).then((data) => {
    if (data.code === 200) {
      alert('Now you are logged in');
      window.location.href = 'login.html';
    } else {
      alert('Ooops! something wrong :(');
    }
  });
});
