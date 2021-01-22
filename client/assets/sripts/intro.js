const video = document.querySelector('video');
video.playbackRate = 3;

window.addEventListener('click', proceedToLogin);
window.addEventListener('keydown', proceedToLogin);

function proceedToLogin() {
  window.location.href = 'login.html';
}
