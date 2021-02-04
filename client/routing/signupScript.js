import { routes } from '../src/utils';

export default function signupScript() {
  console.log('load signupScript.js');
  localStorage.clear();
  const signupLink = routes.user.signup;
  const formRegister = document.querySelector('#formRegister');

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

  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    postData(signupLink, {
      email: document.forms[0].elements[1].value,
      password: document.forms[0].elements[2].value,
      name: document.forms[0].elements[0].value,
    }).then((data) => {
      if (data.code === 200) {
        alert('Now you are logged in');
        window.location.href = '#login';
      } else {
        alert('Ooops! something wrong :(');
      }
    });
  });
}
