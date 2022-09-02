let count = 1
function passWayCoor(){
  let currPos = wayCoor[count - 1]
  let nextPos = wayCoor[count]
  setShipPos(...wayCoor[0])
  function setShipPos(currLat, currLon){
    miniCircle = L.circle([currLon, currLat], {radius : 100})
    miniCircle.setStyle({className: 'ship_area'});
    miniCircle.addTo(miniMap)
    this.mainShip = L.marker([currLon, currLat], {icon: shipIcon}).addTo(map)
    this.mainShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
    L.DomUtil.addClass(this["mainShip"]._icon, 'main_ship');
    this.miniShip = L.marker([currLon, currLat], {icon: miniShipIcon}).addTo(miniMap)
    this.miniShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
    L.DomUtil.addClass(this["miniShip"]._icon, 'mini_ship');
    this.sector = L.circle([currLon, currLat], {
      color: 'red',
      radius: 100,
      weight: 1
    })
    .setAngles(0, 0)
    // .addTo(miniMap);
  }
  ship(...currPos, ...nextPos)
}

function ship(currLat, currLon, nextLat, nextLon){
  let shipRot = turf.bearing([currLat, currLon], [nextLat, nextLon])
  this.mainShip.setRotationAngle((shipRot));
  this.miniShip.setRotationAngle((shipRot));
  this.shipVoyage = setInterval(move(currLat, currLon, shipRot), 30)  
}

function move(currLat, currLon, shipRot){
  return function(){
    shipPosT = nearestPoint(0.308667, shipRot, currLat, currLon)
    shipPosL = switchCoor(...shipPosT)
    currLon = shipPosL[0]
    currLat = shipPosL[1]
    currPos = wayCoor[count - 1]
    nextPos = wayCoor[count]
    this.mainShip.setLatLng(shipPosL)
    this.miniShip.setLatLng(shipPosL)
    this.miniCircle.setLatLng(shipPosL)
    this.sector.setLatLng(shipPosL)
    this.sector.setAngles(shipRot - 30, shipRot + 30)
    miniMap.setView(shipPosL, 17,{
      "animate": true,
      "pan": {
      "duration": 1
      }
    });
    currDist = t.dist(t.pt(...shipPosT) , t.pt(...currPos))
    wayDist = t.dist(t.pt(...currPos) , t.pt(...nextPos))
    if(currDist > wayDist){
      clearInterval(this.shipVoyage)
      if(count < wayCoor.length - 1){
        count++
        currPos = wayCoor[count - 1]
        nextPos = wayCoor[count]
        ship(...currPos, ...nextPos)
      }
    }
    check = el.cls(expInfo, 'c', 'active')
    if(check){
      setInformation(...shipPosT)
    }
  }
}

function setInformation(lat, lon){
  let latLon = el.get('latLon', 0)
  latLon.innerHTML = `<span>Lat : ${"Lat :", lat.toFixed(6)}</span><br><span>Lon : ${"Lon :", lon.toFixed(6)}</span>`
}

var steer = {
  increase  : function(){

  },
  decrease  : function(){
    
  },
  right     : function(){

  },
  left      : function(){
    
  }
}