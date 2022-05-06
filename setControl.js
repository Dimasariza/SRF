document.addEventListener('keydown', function(event){
  // event.preventDefault ()
  switch ( event.key ) {
    case "Escape":
      fullScrFun()
      console.log('exit')
      break;
    case event.key = "f" :
      console.log('fullscr')
      fullScrFun()
      break
    case event.key = "t" :
      var pointA = new L.LatLng(18.635308, 110.22496);
      var pointB = new L.LatLng(10.984461, 118.70641);
      var pointList = [pointA, pointB];
      
      var firstpolyline = new L.Polyline(pointList, {
          color: 'red',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1
      });
      firstpolyline.addTo(map);


      break
      case event.key = "y" :

        console.log('y')

    // }
      break;

    default :
      console.log(event.key)
  }
});

//  =========================== Start from here ===========================================================

for (let i = 0 ; i < gEl('close').length; i++ ) {
  gEl('close', i).addEventListener('click', rmActive )
}

function rmActive () {
  expFun()
}

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