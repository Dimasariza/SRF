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
    // this.fixWayLine = L.geoJSON(this.wayLine, {style : lineStyle}).addTo(map)
    this.newWayCoor = new Array
    
    checkLine(wayLine)
    if (intersectLine) {
        intersectCoor(this.wayLine)
    }
}

function switchCoor(lat, lan) {
    let coord = [lan, lat]
    return coord
}

function getLength (line){
    let length = turf.length(line)
    return length
}

function getCoorPt(pt) {
    let coord = turf.getCoord(pt)
    return coord
}


function getSplit (line, poly) {
    let split = turf.lineSplit(line, poly)
    return split
}

function ptInPoly(pt, poly) {
    let point = turf.booleanPointInPolygon(pt, poly)
    return point
}

function returnIdx(split){
    split = split.features
    let splitArr = new Array
    let ptToLine = new Array
    for (item in split){
        let length = turf.pointToLineDistance(turf.point(wayCoor[0]), split[item])
        ptToLine.push(length)
    }
    var result = Array.from(Array(ptToLine.length).keys())
    .sort((a, b) => ptToLine[a] < ptToLine[b] ? -1 : (ptToLine[b] < ptToLine[a]) | 0)
    for ( item in result) {
        splitArr.push(split[result[item]])
    }
    return splitArr
}

function checkLine(line) {
    this.intersectLine = new Array
    for (let item in mergeArea) {
        let check = turf.booleanIntersects(line, this[mergeArea[item]])
        if ( check ) {
        this.intersectLine.push(this[mergeArea[item]])
        }
    }
}

let midsPoint = new Array
function intersectCoor (line) {
    for ( let item in intersectLine) {
        let intersectPoly = intersectLine[item]
        let lineSplit = getSplit(line, intersectPoly)
        this.newLine = returnIdx(lineSplit)
        for(let lines in this.newLine) {
            let collectLine = this.newLine[lines]
            let lineCoor = collectLine.geometry.coordinates
            let midPoint = turf.midpoint(...lineCoor)
            midsPoint.push(midPoint)
            let pointOnPoly = ptInPoly(midPoint, intersectPoly)
            if (pointOnPoly){
                let length = getLength(collectLine)
                let maxPoint = checkMaxPpoint(length)
                let latlon = getCoorPt(midPoint)
                // generateCircle(...latlon)
                let step = generatePoint(...latlon, intersectPoly)
                for (let i = 1; i <= maxPoint ; i++){
                    let along = turf.along(collectLine , length/maxPoint * i);
                    let alongCoor = getCoorPt(along)
                    // generatePoint(...alongCoor, intersectPoly)
                    if (step){
                        genLines(...alongCoor, intersectPoly,3)
                    } else if (!step) {
                        genLines(...alongCoor, intersectPoly,1)
                    }
                }
                // there is error in this lice code
                // L.geoJSON(turf.lineString(newWayCoor)).addTo(map)

            }
        // let latlon = this.newLine[lines].geometry.coordinates[0]
        // generateCircle(...latlon)
        }
    }
}

let protect = 0
let maxProtect = 30
function generatePoint (lat, lon, poly){
    let rad = 1000
    let angle = this.angle
    let checkPoint;
    let nextpt
    let step = true
    do {
        rad += 1000
        if(step){
            nextpt = nearestPoint(rad, angle + 90, lat, lon)
            checkPoint = turf.point(nextpt)
            step = false
        } else if (!step){
            nextpt = nearestPoint(rad, angle + 270, lat, lon)
            checkPoint = turf.point(nextpt)
            step = true
        }
        protect += 1
        if ( protect == maxProtect) {
            break;
        }    
    } while (ptInPoly(checkPoint, poly))
    this["rotateLine" + 0] = turf.lineString([[lat,lon],nextpt])
    // L.geoJSON(this["rotateLine" + 0]).addTo(map)
    return step
}

function nearestPoint(rad, angle, lat, lon) {
    let oneMeterDist = 1 / 111195.0802335329
    let latDeg = Math.sin(Math.PI / 180 * angle)
    let lonDeg = Math.cos(Math.PI / 180 * angle)
    let degLat = latDeg * rad * oneMeterDist 
    let degLon = lonDeg * rad * oneMeterDist
    let nextpt =  [lat + degLat,lon +  degLon]
    return nextpt
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

function genLines(lat,lon,poly,id) {
    let rad = 1000
    let angle = this.angle + 90 * id
    let nextpt
    let checkPoint
    do{
        rad += 1000
        nextpt = nearestPoint(rad, angle, lat, lon)
        checkPoint = turf.point(nextpt)
        protect += 1
        if(protect == maxProtect){
            break;
        }
    } while(ptInPoly(checkPoint, poly))
    this["rotateLine" + 0] = turf.lineString([[lat,lon],nextpt])
    newWayCoor.push(nextpt)
    L.geoJSON(this["rotateLine" + 0]).addTo(map)        
}

function generateCircle(lat, lon){
    // Delete code bellow

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
    
  this.currentCircle = L.circle([lon, lat], {radius : 1000}).addTo(map)
  this.currentCircle.setStyle(provStyle);
}




// ============================================================== Delete code below
function checkCircle(circle, prov) {
    let check = turf.intersect(circle, this["provinsi" + prov])
    if (check !== null) {
        console.log(" intersect", prov)
        return true
    } else if ( check === null ) {
        console.log("not intersect other poly", prov)
    }
}