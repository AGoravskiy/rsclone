export default function loginScript(){
  console.log("load loginScript.js");
  localStorage.clear();
  let statistics = {};

        
    function getCookie(cname) {
      const name = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
    'https://nfs-jsu.herokuapp.com/statistics';

    const HOST = 'https://nfs-jsu.herokuapp.com/user/login';
    const form = document.querySelector('.form-sign-in');
    const signInButton = document.querySelector('.sign-in-btn');
    const signUpButton = document.querySelector('.sign-up');
    const mail = document.querySelector('#email');
    const password = document.querySelector('#password');
    const emailErr = document.querySelector('.email-error');
    const passwordErr = document.querySelector('.password-error');
    const statistic = {};

    // signInButton.addEventListener("click",()=>{
    //   window.location.href = '#game';

    // })


    form.addEventListener('submit', function (event) {
      event.preventDefault();
      localStorage.setItem('email', document.forms[0].elements[0].value);
      postData(HOST, {
          email: document.forms[0].elements[0].value,
          password: document.forms[0].elements[1].value,
        })
        .then(data => {
          if (data.code === 200) {
            console.log(data);
            localStorage.setItem('statistics', JSON.stringify(statistics));
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('token', data.token);
            window.location.href = '#game';
          } else if (data.status === 'fail email') {
            alert('There is no such email address')
            emailErr.classList.add('active');
          } else if (data.status === 'fail password') {
            passwordErr.classList.add('active');
            alert('Wrong password entered')
          } else {
            // passwordErr.classList.add('active');
            // emailErr.classList.add('active');
            alert(data.message);
          }
          console.log(data); // JSON data parsed by `data.json()` call
        });
    })

    async function postData(url, data) {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

}
    