  /*
  * Dimas Ariza
  * source code link : 'https://github.com/Dimasariza/Tugas_Akhir'
  * 
  * Find the ship route using way point algorithm
  * First step check the intersection between lines with nearest poly
  * If the lines intersects poly, get the first intersects line coordinates
  * Second step draw a circle with radius based on collregs between 200m until 12nm
  * the circle must be in a state of not overwriting other poly, so you have to change cicle angle from the pivot dinamicly
  * If the correct circle available, now you can draw another line from new circle coordinates to port of destination coordinates
  * now there are 2 lines on the map 
  * first line draw from origin port coordinates to new circle coordinates and second line draw from new circle coordinates to port destination coordinate
  * let define a variabel to first line as first analysis (stAls) and to the second line as second analisis (ndAls)
  * Third step, check intersects between second line to nearest poly
  * If the second line intersects the poly, go back to step one and step two
  * now there are 3 lines on the map
  * first line is the line that was drawn earlier
  * the second line is the line which is drawn from the second intersection to the new circle
  * and the third line is the line which is drawn from the second line to the port of destination coordinates
  * fourth step draw line from port of origin coordinaes to new circle coordinates 
  * if the line intersects other poly, use the first line and the second line in the third step and define it as fix Way Line (fixWL)
  * now there are 3 lines on the map, so we can use the multistring line as fix route for the ship
  * the fivth step is, looping from step two to step five 
  * but if the line doesnt intersects the other poly, use the line drawn in step four
  * now there are 2 lines on the map, use the first line and second line in the fivth step and define as fix way Line (fixWL)
  * the fivth step is, looping from step two to step five
  * looping after the line is formed and not overwriting other poly 
  */


let orgDestCoor = new Array;
let frameRate = 1;
let miniCircle;
let shipVoyage;

let fixWL,
    analisisWL,
    stAls,
    ndAls,
    thAls,
    provinsi

function wayPoint( i,j,x,y ) {
    let latOrg  = i,
    lngOrg  = j,
    latDest = x, 
    lngDest = y
    
  // Check intersect
    stAls = turf.multiLineString([[[lngOrg, latOrg], [lngDest, latDest]]], {name: 'first analysis line'});
    checkLine(stAls)
    console.log(intersectLine)
    
    // draw circle 

    if( intersectLine.length !== 0) {
      getSplitCoor(stAls, intersectLine[0] )
    }

    // ==============================================================================================================================
    var increment = (function(lat, lng) {
      return function() {
  
        let latDirection = (latOrg - latDest) / 100000
        let lngDirection = (lngOrg - lngDest) / 100000
  
        lat -= latDirection
        lng -= lngDirection
  
        this.mainShip.setLatLng([lat, lng])
        this.miniShip.setLatLng([lat, lng])
        miniMap.setView([lat,lng], 18,{
          "animate": true,
          "pan": {
          "duration": frameRate
          }
        });

        miniCircle.setLatLng([lat, lng])
        let miniShipCircle = turf.circle([lngOrg, latOrg], 0.1)
        
        // checkCircle(miniShipCircle)

        if ( gEl('shipInfo',0,0).classList.contains('active') === true ) {
          let shipLat =gEl('shipLat', 0)
          let shipLng =gEl('shipLng', 0)
          shipLat.innerHTML = `Lat : ${lat.toFixed(6)}<br>`;
          shipLng.innerHTML = `Lng : ${lng.toFixed(6)}` 
        }  
      }
    } (latOrg, lngOrg, latDest, lngDest)); 
    // shipVoyage = setInterval(increment, (frameRate * 1000))


this.mainShip = L.marker([latOrg, lngOrg], {icon: shipIcon}).addTo(map)
this.mainShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
L.DomUtil.addClass(this["mainShip"]._icon, 'main_ship');

// let miniArea = L.geoJSON(miniShipCircle)
miniCircle = L.circle([latOrg, lngOrg], {radius : 100})
miniCircle.setStyle({className: 'shipArea'});
miniCircle.addTo(miniMap)

this.miniShip = L.marker([latOrg, lngOrg], {icon: miniShipIcon}).addTo(miniMap)
this.miniShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
L.DomUtil.addClass(this["miniShip"]._icon, 'mini_ship');


let shipRot = turf.bearing([lngOrg, latOrg], [lngDest, latDest])
this.mainShip.setRotationAngle((shipRot));
this.miniShip.setRotationAngle((shipRot));

// ======================================================================================================================================= 

let latlngs;
latlngs = [[latOrg, lngOrg],[latDest, lngDest]]
fixWL = L.polyline(latlngs, {color: 'red', weight: 2, opacity: 0.5}).addTo(map);
// analisisWL = turf.lineString([[lngOrg, latOrg], [lngDest, latDest]], {name: 'way line'});

orgDestCoor[0] = lngOrg
orgDestCoor[1] = latOrg
orgDestCoor[2] = lngDest
orgDestCoor[3] = latDest

}

// ========================================================= Check intersect line
function checkLine(line) {
  this.intersectLine = new Array
  for ( let i = provStart ; i <= provinceNum ; i++) {
    let check = turf.booleanIntersects(line, this["provinsi" + i])
    if ( check === true ) {
      console.log(provName[i - provStart], i)
      this.intersectLine.push(i)
    }
  }
}


// ================================================================= Check intersect circle
function checkShipArea(circle) {
  this.shipArea = new Array
  for ( let i = provStart; i <= provinceNum ; i++) {
    let check = turf.intersect(circle, this["provinsi" + i])
    if (check !== null) {
      this.shipArea.push(i)
    }
  }
}


function checkCircle(circle) {
    let check = turf.intersect(circle, this["provinsi" + intersectLine[0]])
    if (check !== null) {
      return true
    }
}



// ================================================================= Generate first line
function genStLine ( poDist, ang,  ) {
  let latDeg = Math.sin(angle * Math.PI / 180)
  let lngDeg = Math.cos(angle * Math.PI / 180)
  let latLen = pointDistance * latDeg
  let lngLen = pointDistance * lngDeg
  console.log(pointDistance)
  console.log(latLen, lngLen)

  analisisWL = turf.lineString([[coorPivot[0], coorPivot[1]], [coorPivot[0] + lngLen, coorPivot[1] - latLen]], {name: 'way line'});
  L.geoJSON(analisisWL).addTo(map)

  var center = [coorPivot[0] + lngLen, coorPivot[1] - latLen];
  var radius = 10;
  var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
  this.circle = turf.circle(center, radius, options);
  this.circleTest = L.geoJSON(this.circle).addTo(map)
}


// =========================================================================== Check line split
let dataCircle = new Object
function getSplitCoor (line, prov) {
  let splitData = turf.lineSplit(line, this["provinsi" + prov])
  let coorSplit = splitData.features[0].geometry.coordinates[1]
  let coorPivot = splitData.features[0].geometry.coordinates[0]
  let angle = (turf.bearing([coorPivot[0], coorPivot[1]], [coorSplit[0], coorSplit[1]]) - 0);

  dataCircle = {
    coorSplit : coorSplit,
    angle : angle,
  }
  genCircle()
}



// ==================================================================== Generate a circle
function genCircle() {

  // distance between lat to next lat = 111.1950802335329
  let oneMeterDist = 1 / 111195.0802335329
  let options = {steps: 50, units: 'kilometers', properties: {foo: 'bar'}};
  let angle = dataCircle.angle
  let radius = 0.5;
  let protec = 0
  do {
    angle -= 5
    protec += 5
    let latDeg = Math.sin(angle * Math.PI / 180)
    let lngDeg = Math.cos(angle * Math.PI / 180)
    
    let latLen = oneMeterDist * radius * 1000 * latDeg
    let lngLen = oneMeterDist * radius * 1000 * lngDeg
    
    let center = [dataCircle.coorSplit[0] + lngLen +  oneMeterDist * 1000, dataCircle.coorSplit[1] - latLen +  oneMeterDist * 1000];
    this.circle = turf.circle(center, radius, options);

    console.log(angle)
    

    if (!checkCircle(this.circle) || protec >= 360){
      this.circleTest = L.geoJSON(this.circle).addTo(map)
      break
    }
  }
  while (checkCircle(this.circle))
  



  this.currentCircle = L.circle([dataCircle.coorSplit[1], dataCircle.coorSplit[0]], {radius : 1000}).addTo(map)

  
}






























// ============================================= Test time ============================================= //


// function diff (num1, num2) {
//   if (num1 > num2) {
//     return (num1 - num2);
//   } else {
//     return (num2 - num1);
//   }
// };

// function getDist (x1, y1, x2, y2) {
//   var deltaX = diff(x1, x2);
//   var deltaY = diff(y1, y2);
//   var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
//   return (dist);
// };

  // analisisWL = turf.lineString([[coorPivot[0], coorPivot[1]], [coorPivot[0] + lngLen, coorPivot[1] - latLen]], {name: 'way line'});
  // L.geoJSON(analisisWL).addTo(map)

  
  // this.circleTest = L.circle( [ coorPivot[1] - latLen, coorPivot[0] + lngLen], {radius : 24000} ).addTo(map)
  // analisisWL = turf.lineString([[lngOrg, latOrg], [lngDest, latDest]], {name: 'way line'});
  // checkCircle(this.circle)
  // console.log(
  //   overlapCircle, "this is overlap circle"
  // )

// analisis port from tpk kupang to tpk makassar
// var l = L.polyline([[latOrg, lngOrg],[latDest, lngDest]]);    
// var jsonLine = l.toGeoJSON();
// var length = turf.lineDistance(jsonLine, 'miles');
// var dist=Math.floor(length);

// var result = {
//     'type': 'FeatureCollection',
//     'features': [jsonLine]
// }


// for(step=1;step<dist+1;step+=200){
//     result.features.push(turf.along(jsonLine, step,'miles'));
// }
// L.geoJson(result).addTo(map);
let pointType
pointType = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    // "coordinates": [lngOrg, latOrg]
  }
}

let lineType
lineType = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "LineString",
    // "coordinates": [[lngOrg, latOrg], [lngDest,latDest]]
  }
}


// var linestring2 = turf.lineString([[100, -6], [120, -9]], {name: 'line 2'});
// L.geoJSON(linestring2).addTo(map)

// var center = [105, -6.8];
// var radius = 17;
// var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
// var circle = turf.circle(center, radius, options);
// var circleTest = L.geoJSON(circle).addTo(map)
// map.fitBounds(circleTest.getBounds());


  let current = new Date()
  console.log(current)
  
  
  // test here
  var mapsPlaceholder = [];
      
  // http://leafletjs.com/reference-1.1.0.html#class-constructor-hooks
  L.Map.addInitHook(function () {
    mapsPlaceholder.push(this); // Use whatever global scope variable you like.
  });
  
  