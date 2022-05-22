  // ===============================================Test function here
document.addEventListener('keydown', function(event){
  if(event.key === "Escape"){
    event.preventDefault()
    console.log('exit')
	}
  if(event.key === 'f') {
    fullScrFun()
  } 

  if (event.key === 't') {
    console.log('test')
    console.log(
      turf.booleanIntersects(line, point)
  )

  }
  
  if (event.key === 'q') {
  
    anchorOrg1.addEventListener('click', _markerOnClick);

    var _markerOnClick = function(e) {
      console.log(e)
    }


    // test here
    // console.log(featureCollection.features.length)

  }
});

//  =========================== Start from here ===========================================================




// Adding click event on route explore
let portInfo = gEl('portInfo', 0)
let routeExplore = gEl('routeExplore', 0)
let startBar = gEl('start__bar', 0)
let lc = gEl('leaflet-control-layers', 0)
let expFun = function(){
    if ( routeExplore.classList.contains('active') === false) {
      startBar.style.transform = ("translate(4.1rem, -5.35rem)")
      portInfo.style.transform = ("translate(4rem)") 
      lc.style.transform = ("translate(4rem)")
      routeExplore.style.transform = ("translate(4rem)")
      gEl('routeExplore', 0, 'a')
    } else if ( routeExplore.classList.contains('active') === true ) {
      routeExplore.style.transform = ("translate(0)")
      portInfo.style.transform = ("translate(0)") 
      startBar.style.transform = ("translate(25rem , -5.35rem)")
      lc.style.transform = ("translate(0)")
      gEl('routeExplore', 0, 'rm')
    }
  } 
routeExplore.addEventListener('click', expFun)
for (let i = 0 ; i < gEl('close').length; i++ ) {
  gEl('close', i).addEventListener('click', expFun )
}

  // Adding click event on route Info
let infoFun = () => {
  if ( portInfo.classList.contains("active") === false) {
      gEl('portInfo', 0, 'a', "close")
      getPortData('show')
    } else {
      gEl('portInfo', 0, 'rm', "anchor")
      getPortData('hide')
  }
}
portInfo.addEventListener("click", infoFun, false)

  // Adding click event on fullscreen button
let fscr = gEl('fullScr', 0)
let fullScrFun = function() {
  if ( fscr.classList.contains('active') === false ) {
    gEl('fullScr', 0 , 'a', 'fullscreen_exit')
    gEl('mini__map', 0).requestFullscreen()
  } else if ( fscr.classList.contains('active') === true ) {
    document.exitFullscreen()
    gEl('fullScr',0, 'rm', 'fullscreen')
  }
}
fscr.addEventListener("click", fullScrFun)

  //  set routing button
let findBtn = gEl('findBtn', 0)
let portBtn = gEl('portBtn')
let cancelBtn = gEl('cancelBtn', 0)
function setFindBtn() {
  for ( let i = 0 ; i < portBtn.length ; i++) {
    portBtn[i].classList.add('disabled')
    cancelBtn.removeAttribute('disabled')
    findBtn.textContent = 'Voyage'
  }
  findBtn.classList.add('voyage')
  wayPoint()
  

}
findBtn.addEventListener('click', setFindBtn)

function setCancelBtn () {
  for ( let i = 0 ; i < portBtn.length ; i++) {
    portBtn[i].classList.remove('disabled')
    findBtn.textContent = 'Find'
    map.removeLayer(mainShip)
    miniMap.removeLayer(miniShip)
    map.removeLayer(fixWL)
    miniMap.removeLayer(miniCircle)
    clearInterval(shipVoyage)
  }

  if ( anchorOrg_1.length == 0 && anchorOrg_2.length !== 0 ) {
    map.removeLayer(anchorOrg2)
  } else if ( anchorOrg_1.length !== 0 && anchorOrg_2.length == 0) {
    map.removeLayer(anchorOrg1)
  }

  if ( anchorDest_1.length == 0 && anchorDest_2.length != 0 ) {
      map.removeLayer(anchorDest2)
  } else if (anchorDest_1.length !=0 && anchorDest_2.length == 0) {
    map.removeLayer(anchorDest1)
  }


}
cancelBtn.addEventListener('click', setCancelBtn )

let expInfo = gEl('expand_more',0)
let shipInfo = gEl("dinamicInfo", 0)
function expInfoFun(){
  if( expInfo.classList.contains('active') === false) {
    expInfo.classList.add('active')
    expInfo.textContent = 'keyboard_arrow_down'
    addDiv("a")
  } else if ( expInfo.classList.contains('active') === true) {
    expInfo.textContent = 'keyboard_arrow_up'
    expInfo.classList.remove('active')
    addDiv("r")
  }
}
expInfo.addEventListener('click', expInfoFun)



