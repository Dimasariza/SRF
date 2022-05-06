    // Generate way point
function wayPoint( i,j,x,y ) {
    let latOrg  = i,
        lngOrg  = j,
        latDest = x, 
        lngDest = y

    let mainShip, 
        shipRot;
    mainShip = L.marker([latOrg, lngOrg], {icon: shipIcon}).addTo(map)
    mainShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
    shipRot = turf.bearing([latOrg, lngOrg], [latDest, lngDest] ) + 270
    mainShip.setRotationAngle((shipRot));
    mainShip.setLatLng([latOrg, lngOrg])


    var l = L.polyline([[latOrg, lngOrg],[latDest, lngDest]]);
        
    var jsonLine=l.toGeoJSON();
    var length = turf.lineDistance(jsonLine, 'miles');
    var dist=Math.floor(length);

    var result = {
        'type': 'FeatureCollection',
        'features': [jsonLine]
    }

    
    for(step=1;step<dist+1;step+=200){
        result.features.push(turf.along(jsonLine, step,'miles'));
    }
    L.geoJson(result).addTo(map);



    // let miniShipMarker = L.marker([-7.202638784078749, 112.7179207686899], {icon: shipIcon}).addTo(miniMap)
    // miniShipMarker.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
}










