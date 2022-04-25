  // Define class DOM
var startBar = document.getElementsByClassName('start__bar');
// Adding click event on route explore
var routeExp = document.getElementsByClassName('route__explore')
var expFun = function(){
  for (let i = 0; i < startBar.length ; i++){
    startBar[i].style.visibility = "visible";
  }
};
for (let i = 0; i < routeExp.length; i++) {
  routeExp[i].addEventListener('click', expFun, false);
}

  // Adding click event on route Info
var routeInfo = document.getElementsByClassName('route__info')
var infoFun = function() {
  // Adding event here
  getDataPelabuhan() 

}
for (let i = 0; i < routeInfo.length; i++) {
  routeInfo[i].addEventListener("click", infoFun, false)
}

  // Adding click event on fullscreen button
var fullScr = document.getElementsByClassName('fullscreen')
let miniMapContainer = document.getElementsByClassName('mini__map');
var fullScrFun = function() {
  for (let i = 0; i < miniMapContainer.length ; i++){
    miniMapContainer[i].style.height = "100vh";
    miniMapContainer[i].style.width = "100vw";
    miniMapContainer[i].style.margin = "0";
  }
}
for (let i = 0; i<fullScr.length ; i++) {
  fullScr[i].addEventListener("click", fullScrFun, false)
}

  // Adding click event on start button
var routeFind = document.getElementsByClassName('route_find')
var rtFindFun = function() {
  // adding function here
}

for (let i = 0; i< routeFind.length ; i++) {
  routeFind[i].addEventListener("click", rtFindFun, false)
}
  // Adding click event on cancel button
var routeFindCancel = document.getElementsByClassName('route_find-cancel')
var rtFindCancelFun = function() {
  // Adding click event here
}

for (let i = 0; i< routeFindCancel.length ; i++) {
  routeFindCancel[i].addEventListener("click", rtFindCancelFun, false)
}