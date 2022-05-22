function wayPoint() {
    this.wayCoor = new Array
    let {portOrg , portDest} = portCoorData
    wayCoor.push(portOrg.coor)
    wayCoor.push(portDest.coor)
    this.angle = turf.bearing(portOrg.coor,portDest.coor)

    let wayLine = turf.multiLineString([wayCoor], {name: 'first analysis line'});
    L.geoJson(wayLine).addTo(map)
    checkLine(wayLine)
    if(intersectLine != 0) {
        for(let item in intersectLine) {
            intersectCoor(wayLine, intersectLine[item])
        }
    }
}

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

function intersectCoor (line, prov) {
    let intersectLine = turf.lineIntersect(line, this["provinsi" + prov])
    let intData = intersectLine.features
    for(let item in intData) {
        let latlon = intData[item].geometry.coordinates
        generateCircle(...latlon, prov)
    }
}

function generateCircle(lat, lon, prov){

    // distance between lat to next lat = 111.1950802335329
    let oneMeterDist = 1 / 111195.0802335329
    let protec = 0

    let center = [lat, lon]
    let radius = 1000;
    let options = {steps: 15, units: 'meters'};
    
    // do {
    //   angle -= 5
    //   protec += 5
    //   let xDeg = Math.sin(angle * Math.PI / 180)
    //   let yDeg = Math.cos(angle * Math.PI / 180)
      
    //   let xLength = oneMeterDist * radius * xDeg
    //   let yLength = oneMeterDist * radius * yDeg
      
    //   center = [lon + yLength , lat - xLength];
    //   circle = turf.circle(center, radius, options);
  
    //   if (!checkCircle(circle, prov) || protec >= 360){
    //     this.circleTest = L.geoJSON(circle).addTo(map)
    //     break
    //   }
    // }
    // while (checkCircle(circle, prov))
    


    let circle = turf.circle(center, radius, options);
    L.geoJson(circle).addTo(map)
    
    checkCircle(circle, prov)
}

function checkCircle(circle, prov) {
    let check = turf.intersect(circle, this["provinsi" + prov])
    if (check !== null) {
        console.log(" intersect", prov)
        return true
    } else if ( check === null ) {
        console.log("not intersect other poly", prov)
    }
}