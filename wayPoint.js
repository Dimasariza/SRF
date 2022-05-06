    // Generate way point
function wayPoint( i,j,x,y ) {
    let latOrg  = i,
    lngOrg  = j,
    latDest = x, 
    lngDest = y
    
this.mainShip = L.marker([latOrg, lngOrg], {icon: shipIcon}).addTo(map)
this.mainShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
L.DomUtil.addClass(this["mainShip"]._icon, 'main_ship');

this.miniShip = L.marker([latOrg, lngOrg], {icon: shipIcon}).addTo(miniMap)
this.miniShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
L.DomUtil.addClass(this["miniShip"]._icon, 'main_ship');

this.shipRot = turf.bearing([latOrg, lngOrg], [latDest, lngDest] ) + (-90)  
this.mainShip.setRotationAngle((this.shipRot));
this.mainShip.setLatLng([latOrg, lngOrg])

this.miniShip.setRotationAngle((this.shipRot));
this.miniShip.setLatLng([latOrg, lngOrg])

miniMap.setView([latOrg,lngOrg], 15,{
    "animate": true,
    "pan": {
    "duration": 2
    }
});

let latlngs = [[latOrg, lngOrg],[latDest, lngDest]]
this.polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

// let miniShipMarker = L.marker([-7.202638784078749, 112.7179207686899], {icon: shipIcon}).addTo(miniMap)
// miniShipMarker.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
}


// analisis port from tpk kupang to tpk makassar
// var l = L.polyline([[latOrg, lngOrg],[latDest, lngDest]]);    
// var jsonLine=l.toGeoJSON();
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








