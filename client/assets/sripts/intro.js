const video = document.querySelector('video');
video.playbackRate = 3;

function proceedToLogin() {
  window.location.href = 'login.html';
}
window.addEventListener('click', proceedToLogin);
window.addEventListener('keydown', proceedToLogin);
