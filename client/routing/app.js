import introScript from './introScript';
import loginScript from './loginScript';
import signupScript from './signupScript';
import gameScript from '../src/pages/game';
import Route from './route';
import Router from './router';

document.addEventListener('DOMContentLoaded', () => {
  const mainDiv = document.querySelector('.loading');
  mainDiv.classList.remove('loading');
});

(function () {
  function init() {
    const router = new Router([
      new Route('intro', 'intro.html', true),
      new Route('login', 'login.html'),
      new Route('signup', 'signup.html'),
      new Route('game', 'game.html'),
    ]);
  }
  init();
}());

window.addEventListener('load', () => {
  introScript();
});
window.onhashchange = function () {
  if (window.location.href.substr(window.location.href.length - 2, window.location.href.length - 1) === 'up') {
    setTimeout(signupScript, 1500);
  } else if (window.location.href.substr(window.location.href.length - 2, window.location.href.length - 1) === 'in') {
    setTimeout(loginScript, 1500);
    while (document.body.childNodes.length > 5) {
      document.body.lastChild.remove();
    }
  } else if (window.location.href.substr(window.location.href.length - 1, window.location.href.length - 1) === '/') {
    setTimeout(introScript, 1500);
  } else if (window.location.href.substr(window.location.href.length - 2, window.location.href.length - 1) === 'me') {
    setTimeout(gameScript, 1500);
  }
};
