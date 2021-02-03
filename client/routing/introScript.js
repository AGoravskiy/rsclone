import loginScript from './loginScript';
import signupScript from './signupScript';

export default function introScript(cb) {
  console.log('load introScript.js');
  const video = document.querySelector('video');
  const start = document.querySelector('.start');
  if (video) {
    video.playbackRate = 3;
  }

  function proceedToLogin() {
    window.location.href = '#login';
    setTimeout(loginScript, 100);
  }

  if (start) {
    start.addEventListener('click', proceedToLogin);
  }
  window.addEventListener('keydown', () => {
    if (window.location.href.substr(window.location.href.length - 1, window.location.href.length - 1) === '/') {
      setTimeout(proceedToLogin(), 100);
    }
  });
}
