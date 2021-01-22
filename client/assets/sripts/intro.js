const video = document.querySelector('video');
video.playbackRate = 4;

video.addEventListener('ended', drawTitle);

function drawTitle() {
  document.querySelector('.title-wrapper').classList.toggle('hide');
  document.querySelector('.footer-wrapper').classList.toggle('hide');
}

// const button = document.querySelector('.preload-btn');
// if ()
window.addEventListener('click', proceedToLogin);
window.addEventListener('keydown', proceedToLogin);

function proceedToLogin() {
  window.location.href = 'login.html';
}
