import { routes } from '../src/utils';
import postData from '../src/utils/simpleFunc/asyncFunc';

export default function signupScript() {
  console.log('load signupScript.js');
  localStorage.clear();
  const signupLink = routes.user.signup;
  const formRegister = document.querySelector('#formRegister');
  const nicknameRegister = document.querySelector('#nicknameRegister');
  const emailRegister = document.querySelector('#emailRegister');
  const passwordRegister = document.querySelector('#passwordRegister');
  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    postData(signupLink, {
      email: emailRegister.value,
      password: passwordRegister.value,
      nickname: nicknameRegister.value,
    })
      .then((data) => {
        if (data.code === 200) {
          alert('Now you are logged in');
          window.location.href = '#login';
        } else {
          alert('Ooops! something wrong :(');
        }
      });
  });
}
