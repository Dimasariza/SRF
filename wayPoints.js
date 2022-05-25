let lineStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.65
};

function wayPoint() {
    this.wayCoor = new Array
    let {portOrg , portDest} = portCoorData
    wayCoor.push(portOrg.coor)
    wayCoor.push(portDest.coor)
    this.angle = turf.bearing(portOrg.coor,portDest.coor)

    this.wayLine = turf.lineString(wayCoor, {name: 'first analysis line'});
    
    L.geoJson(wayLine, {style:lineStyle}).addTo(map)
    checkLine(wayLine)
    if( intersectLine.length == 1 ) {
        intersectCoor(wayLine)
    } else if (intersectLine.length > 1 && intersectLine.length <= provinceNum) {
        this.firstProv = ""
        this.mergeProv = ""
        intersectLine.forEach(mergeObstacle)
    }
}

function checkLine(line) {
    this.intersectLine = new Array
    for ( let i = provStart ; i <= provinceNum ; i++) {
        let check = turf.booleanIntersects(line, this["provinsi" + i])
        if ( check ) {
        this.intersectLine.push(this["provinsi" + i])
        }
    }
}

let merger = false
function mergeObstacle(prov, index) {
    if( !merger ){
        this.firstProv = prov
        merger = true
    } else if (merger && this.mergeProv === '') {
    this.mergeProv = turf.union(this.firstProv, prov)
        if(intersectLine.length == 2) {
            intersectCoor(wayLine)
        }
    } else if (this.mergeProv && index <= provinceNum ){
    this.mergeProv = turf.union(this.mergeProv, prov)
        if(intersectLine.length == index + 1){
            intersectCoor(wayLine)
        }
    } 
}

function intersectCoor (line) {
    merger = false
    this.intData = new Array
    let lineSplit = turf.lineSplit(line, this.mergeProv)
    this.newLine = lineSplit.features
        for(let lines in this.newLine) {
            let lineCoor = this.newLine[lines].geometry.coordinates
            let midPoint = turf.midpoint(...lineCoor)
            let pointOnPoly = turf.booleanPointInPolygon(midPoint, this.mergeProv)
            if (pointOnPoly){
                let length = getLength(this.newLine[lines])
                let maxPoint = checkMaxPpoint(length)

                for (let i = 1; i <= maxPoint ; i++){
                    let along = turf.along(this.newLine[lines] , length/maxPoint * i);
                    let alongCoor = along.geometry.coordinates
                    genLines(...alongCoor)
                }
                L.geoJSON(this.newLine[lines]).addTo(map)
            }

            let latlon = this.newLine[lines].geometry.coordinates[0]
            generateCircle(...latlon)
        }
}

function checkMaxPpoint(length){
    let maxPoint;
    if (length  < 5) {
        maxPoint = 1
    } else if ( length >= 5 && length < 10) {
        maxPoint = 2
    } else if (length >= 10 && length < 20) {
        maxPoint = 3
    } else if (length >= 20 && length < 40 ) {
        maxPoint = 4
    } else if (length >= 40 && length < 60) {
        maxPoint = 6
    } else if (length >= 60 && length < 80) {
        maxPoint = 8
    } else if ( length >= 80 && length < 100) {
        maxPoint = 10
    } else if ( length >= 100 && length < 120) {
        maxPoint = 12
    } else if ( length >= 120 && length < 140) {
        maxPoint = 14
    } else {
        maxPoint = 14
    }
    return maxPoint
}

function getLength (line){
    let length = turf.length(line)
    return length
}

function genLines(x,y) {
    let oneMeterDist = 1 / 111195.0802335329
    let posX = x
    let posY = y
    let rad = 50000
    this.safeRotate = new Array

    let angle = this.angle + 90 * 3
    let xDeg = Math.sin(Math.PI / 180 * angle)
    let yDeg = Math.cos(Math.PI / 180 * angle)
    let degPosX = xDeg * rad * oneMeterDist 
    let degPosY = yDeg * rad * oneMeterDist 
    this["rotateLine" + 0] = turf.lineString([[posX,posY],[posX + degPosX,posY +  degPosY]])
    L.geoJSON(this["rotateLine" + 0]).addTo(map)        
}

function generateCircle(lat, lon){
    // distance between lat to next lat = 111.1950802335329
    // let oneMeterDist = 1 / 111195.0802335329
    // let protect = 0

    // let center = [lat, lon]
    // let radius = 1000;
    // let options = {steps: 15, units: 'meters'};
    
    // do {
    //   this.angle -= 10
    //   protect += 10

    //   let xDeg = Math.sin(angle * Math.PI / 180)
    //   let yDeg = Math.cos(angle * Math.PI / 180)
      
    //   let xLength = oneMeterDist * radius * xDeg
    //   let yLength = oneMeterDist * radius * yDeg
      
    //   center = [lat + yLength , lon - xLength];
    //   circle = turf.circle(center, radius, options);
    //   if (!checkCircle(circle, prov) || protect >= 360){
    //     this.circleTest = L.geoJSON(circle).addTo(map)
    //     break
    //   }
    // }
    // while (checkCircle(circle, prov))
    
  keyAngle(lat,lon)
  this.currentCircle = L.circle([lon, lat], {radius : 1000}).addTo(map)
  this.currentCircle.setStyle(provStyle);

}

function keyAngle(x,y) {
    // distance between lat to next lat = 111.1950802335329
    let oneMeterDist = 1 / 111195.0802335329
    let shipPosX = x
    let shipPosY = y
    let rad = 500
    this.safeRotate = new Array
    
    for(let i = 0 ; i <= 3  ;i++){
        angle += 90 * i
        let xDeg = Math.sin(Math.PI / 180 * angle)
        let yDeg = Math.cos(Math.PI / 180 * angle)
        let degPosX = xDeg * rad * oneMeterDist 
        let degPosY = yDeg * rad * oneMeterDist 
        this["rotateLine" + i] = turf.lineString([[shipPosX,shipPosY],[shipPosX + degPosX,shipPosY +  degPosY]])
        L.geoJSON(this["rotateLine" + i]).addTo(map)        
    }    
    
    for(let i = 0 ; i <= 3  ;i++){
        let fixAngle = 90 * i
        let xDeg = Math.sin(Math.PI / 180 * fixAngle)
        let yDeg = Math.cos(Math.PI / 180 * fixAngle)
        let degPosX = xDeg * rad * oneMeterDist 
        let degPosY = yDeg * rad * oneMeterDist 
        this["fixLine" + i] = turf.lineString([[shipPosX,shipPosY],[shipPosX + degPosX,shipPosY +  degPosY]])
        L.geoJSON(this["fixLine" + i]).addTo(map)
    }
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