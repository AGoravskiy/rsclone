import loginScript from './loginScript.js';
import signupScript from './signupScript.js';

export default function introScript (cb){
  console.log("load introScript.js")
  const video = document.querySelector('video');
  const start = document.querySelector('.start');
  // if(video){
  //   video.playbackRate = 3;
  // }
  
  if(start){
    start.addEventListener('click', proceedToLogin);
  }

  if(window.location.href.substr(window.location.href.length-1,window.location.href.length-1) == "/"){
    window.addEventListener('keydown', proceedToLogin);
    setTimeout(()=>{
      window.removeEventListener('keydown', proceedToLogin);
    },1000)
}

  function proceedToLogin() {
    window.location.href = '#login';
    setTimeout(loginScript ,100);
  }
};


