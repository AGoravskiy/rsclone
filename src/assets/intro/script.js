const video = document.querySelector("video");
video.playbackRate = 4;

video.addEventListener("ended", drawTitle);

function drawTitle() {
  document.querySelector(".title-wrapper").classList.toggle("hide");
  document.querySelector(".footer-wrapper").classList.toggle("hide");
}
