    // Generate way point
let latlngs;
let pointType
let wayLine 
let lineType
let orgDestCoor = new Array
let frameRate = 1
let miniCircle
let shipVoyage;


function wayPoint( i,j,x,y ) {
    let latOrg  = i,
    lngOrg  = j,
    latDest = x, 
    lngDest = y
    

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
        
        if ( gEl('shipInfo',0,0).classList.contains('active') === true ) {
          let shipLat =gEl('shipLat', 0)
          let shipLng =gEl('shipLng', 0)
          shipLat.innerHTML = `Lat : ${lat}<br>`;
          shipLng.innerHTML = `Lng : ${lng}` 
        } 
        
      }
    } (latOrg, lngOrg, latDest, lngDest)); 
    shipVoyage = setInterval(increment, (frameRate * 1000))

this.mainShip = L.marker([latOrg, lngOrg], {icon: shipIcon}).addTo(map)
this.mainShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
L.DomUtil.addClass(this["mainShip"]._icon, 'main_ship');

let miniShipCircle = turf.circle([lngOrg, latOrg], 0.5)
let miniArea = L.geoJSON(miniShipCircle)
miniCircle = L.circle([latOrg, lngOrg], {radius : 100})
miniCircle.setStyle({className: 'shipArea'});
miniCircle.addTo(miniMap)

this.miniShip = L.marker([latOrg, lngOrg], {icon: miniShipIcon}).addTo(miniMap)
this.miniShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
L.DomUtil.addClass(this["miniShip"]._icon, 'mini_ship');


let shipRot = turf.bearing([lngOrg, latOrg], [lngDest, latDest])
this.mainShip.setRotationAngle((shipRot));
this.miniShip.setRotationAngle((shipRot));

pointType = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [lngOrg, latOrg]
  }
}

lineType = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "LineString",
    "coordinates": [[lngOrg, latOrg], [lngDest,latDest]]
  }
}

latlngs = [[latOrg, lngOrg],[latDest, lngDest]]
wayLine = L.polyline(latlngs, {color: 'blue', weight: 2, opacity: 0.5}).addTo(map);

orgDestCoor[0] = lngOrg
orgDestCoor[1] = latOrg
orgDestCoor[2] = lngDest
orgDestCoor[3] = latDest
}

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


var linestring2 = turf.lineString([[100, -6], [120, -9]], {name: 'line 2'});
L.geoJSON(linestring2).addTo(map)


function checkIntersect(f, i) {
  let layersId = new Array
  for ( item in f._layers) {
    parseInt(item)
    layersId.push(parseInt(item))
  }
  let attr = f._layers[layersId[i]].feature
  return attr
}




let provName = new Array
function checkArea() {
  for ( let i = 11 ; i <= 20 ; i++) {
    let check = turf.booleanIntersects(linestring2, this["provinsi" + i])
    if ( check === true ) {
      provName.push(this["provinsi" + i].features[0].properties.Provinsi)
    }
  }
  console.log(provName)  
  console.log('checkarea')
}


var center = [105, -6.8];
var radius = 17;
var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
var circle = turf.circle(center, radius, options);
var circleTest = L.geoJSON(circle).addTo(map)
map.fitBounds(circleTest.getBounds());