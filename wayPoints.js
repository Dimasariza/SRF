  /*
  * Dimas Ariza
  * source code link : 'https://github.com/Dimasariza/Tugas_Akhir'
  */

let lineStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.65
};

this.wayCoor = new Array
let maxProtect = 80
count = 1

function wayPoint(coordinates) {
    for (let i = 1; i < coordinates.length ; i++){
        this.lineIndex = i
        this.angle = t.ang(coordinates[i - 1],coordinates[i])
        this.lineString = turf.lineString([coordinates[i - 1], coordinates[i]], {name: 'way line'});    
        checkLine(lineString)
        if (intersectLine.length != 0) {
            intersectCoor(this.lineString)
            wayPoint(wayCoor)
        }    
        if (intersectLine.length == 0){
            i == wayCoor.length - 1 ? console.log('Done') : console.log('wait')
            continue
        } 

        if(wayCoor.length - 1){
            wayLine()
        }
        
        if(i == maxProtect) break     
    }
}

function wayLine(){
    let line = turf.lineString(wayCoor)
    this.wayLine = L.geoJson(line).addTo(map)
}

function checkLine(line) {
    this.intersectLine = new Array
    for (let item in obsList) {
        let check = t.bint(line, obsList[item])
        if ( check ) {
        this.intersectLine.push(obsList[item])
        }
    }
}

function intersectCoor (line) {
    for ( let item in intersectLine) {
        let intersectPoly = intersectLine[item]
        let lineSplit = t.split(line, intersectPoly)
        returnLine = returnIdx(lineSplit) 
        for(let lines in returnLine) {
            let collectLine = returnLine[lines]
            let lineCoor = collectLine.geometry.coordinates
            let midPoint = t.midpt(...lineCoor)
            let pointInPoly = t.ptpoly(midPoint, intersectPoly)
            if(pointInPoly){
                midPointInPoly(midPoint, collectLine, intersectPoly)
                break;
            }
        }
    }
}

function midPointInPoly(midPoint, lines, poly){
    let lineLength = t.len(lines)
    maxPoint = checkMaxPoint(lineLength)
    distance = distFromObs(maxPoint)

    let latlon = t.ptCoor(midPoint)
    let step = keyAngle(...latlon, this.angle, poly)

    let length = 0
    let nextpt

    for (let i = 1; i < maxPoint ; i++){
        let along = t.along(lines , lineLength/maxPoint * i);
        let alongPt = t.ptCoor(along)
        if (step){
            lineData = genLines(...alongPt, poly , 3, distance)
        } else if (!step) {
            lineData = genLines(...alongPt, poly , 1, distance)
        }

        if(lineData[0] > length){
            length = lineData[0]
            nextpt = lineData[1]
        }

        if(i === maxPoint - 1){
            wayCoor.splice(lineIndex, 0, nextpt)
            
            // Test here
            // this["safeLine" + 0] = turf.lineString([alongPt,nextpt])
            // L.geoJSON(this["safeLine" + 0]).addTo(map)
            generateCircle(...nextpt)
            // end test

            el.cls(findBtn, 'a', 'voyage')
        }
    }
}

function keyAngle (lat, lon, angle, poly){
    let rad = 500
    let checkPoint;
    let nextpt
    let step = true
    let protect = 0
    do {
        rad += 500
        if(step){
            nextpt = nearestPoint(rad, angle + 90, lat, lon)
            checkPoint = t.pt(...nextpt)
            step = false
        } else if (!step){
            nextpt = nearestPoint(rad, angle + 270, lat, lon)
            checkPoint = t.pt(...nextpt)
            step = true
        }
        protect += 1
        if ( protect == maxProtect) {
            break;
        }    
    } while (t.ptpoly(checkPoint, poly))
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

function genLines(lat, lon, poly, id, distance) {
    let check
    let rad = 500
    let angle = this.angle + 90 * id
    let nextpt
    let checkPoint
    let protect = 0
    do{
        rad += 500
        nextpt = nearestPoint(rad, angle, lat, lon)
        checkPoint = t.pt(...nextpt)
        protect += 1
        check = t.ptpoly(checkPoint, poly)

        if(!check){
            nextpt = nearestPoint(distance, angle, ...nextpt)
        }

        if(protect == maxProtect){
            nextpt = nearestPoint(distance, angle, ...nextpt)
            console.log('break')
            break;
        }
    } while(check)
    let length = turf.distance([lat, lon], nextpt)
    return [length, nextpt]
}

function distFromObs(maxPoint){
    let distance
    if (maxPoint == 2) {
        distance = 1000
    } else if (maxPoint == 3) {
        distance = 2000
    } else if (maxPoint == 4) {
        distance = 3000
    } else if (maxPoint == 6) {
        distance = 4000
    } else if (maxPoint == 8) {
        distance = 5000
    } else if (maxPoint == 10) {
        distance = 6000
    } else if (maxPoint == 12) {
        distance = 7000
    } else if (maxPoint == 14 ) {
        distance = 8000
    } else if (maxPoint == 16 ) {
        distance = 9000
    } else if (maxPoint == 18){
        distance = 10000
    } else {
        distance = 12000
    }
    return distance
}

function checkMaxPoint(length){
    let maxPoint
    if (length  < 5) {
        maxPoint = 2
    } else if (length >= 5   && length < 10) {
        maxPoint = 3
    } else if (length >= 10  && length < 20) {
        maxPoint = 4
    } else if (length >= 20  && length < 40) {
        maxPoint = 6
    } else if (length >= 40  && length < 60) {
        maxPoint = 8
    } else if (length >= 60  && length < 80) {
        maxPoint = 10
    } else if (length >= 80  && length < 100) {
        maxPoint = 12
    } else if (length >= 100 && length < 120) {
        maxPoint = 14
    } else if (length >= 120 && length < 140) {
        maxPoint = 16
    } else {
        maxPoint = 18
    }
    return maxPoint
}

function returnIdx(split){
    split = split.features
    let splitArr = new Array
    let ptToLine = new Array
    for (item in split){
        let length = t.dptline(t.pt(...wayCoor[0]), split[item])
        ptToLine.push(length)
    }
    var result = Array.from(Array(ptToLine.length).keys())
    .sort((a, b) => ptToLine[a] < ptToLine[b] ? -1 : (ptToLine[b] < ptToLine[a]) | 0)
    for ( item in result) {
        splitArr.push(split[result[item]])
    }
    return splitArr
}

function generateCircle(lat, lon){    
    this.currentCircle = L.circle([lon, lat], {radius : 100}).addTo(map)
    this.currentCircle.setStyle(provStyle);
}
