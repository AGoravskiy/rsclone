
import introScript from './introScript.js';
import loginScript from './loginScript.js';
import signupScript from './signupScript.js';
import gameScript from '../src/pages/game.js';

(function () {
    function init() {
        var router = new Router([
            new Route('intro', 'intro.html', true),            
            new Route('login', 'login.html'),
            new Route('signup', 'signup.html'),
            new Route('game', 'game.html')
        ]);
    }
    init();
}());
window.addEventListener("load", ()=>{
    introScript();
})

window.onhashchange = function() {
    if (window.location.href.substr(window.location.href.length-2,window.location.href.length-1) == "up" ){
        setTimeout(signupScript,100);
    }
    else if(window.location.href.substr(window.location.href.length-2,window.location.href.length-1) == "in"){
        setTimeout(loginScript,100);
    }
    else if(window.location.href.substr(window.location.href.length-1,window.location.href.length-1) == "/"){
        setTimeout(introScript,100);
    }
    else if(window.location.href.substr(window.location.href.length-2,window.location.href.length-1) == "me"){
        setTimeout(gameScript,100);
    }
   }