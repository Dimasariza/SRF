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
this.newWayCoor = new Array

function wayPoint(coordinates) {
    for (let i = 1; i < coordinates.length ; i++){
        this.angle = t.ang(coordinates[i - 1],coordinates[i])
        this.wayLine = turf.lineString([coordinates[i - 1], coordinates[i]], {name: 'way line'});    
        checkLine(wayLine)
    }
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

function checkLine(line) {
    this.intersectLine = new Array
    for (let item in obsList) {
        let check = t.bint(line, obsList[item])
        if ( check ) {
        this.intersectLine.push(obsList[item])
        }
    }
    if (intersectLine.length != 0) {
        intersectCoor(this.wayLine)
    }    
}

function intersectCoor (line) {
    let coordinates
    for ( let item in intersectLine) {
        let intersectPoly = intersectLine[item]
        let lineSplit = t.split(line, intersectPoly)
        returnLine = returnIdx(lineSplit)

        for(let lines in returnLine) {
            let collectLine = returnLine[lines]
            coordinates = collectLine.geometry.coordinates[1]
            generateCircle(...coordinates)
            midPointInLine(collectLine, intersectPoly)
        }
    }
}

function midPointInLine(lines, poly){
    let lineCoor = lines.geometry.coordinates
    let midPoint = t.midpt(...lineCoor)
    let pointOnPoly = t.ptpoly(midPoint, poly)

    if (pointOnPoly){
        let lineLength = t.len(lines)
        let maxPoint = checkMaxPpoint(lineLength)
        let latlon = t.ptCoor(midPoint)
        let step = keyAngle(...latlon, this.angle, poly)
        let check = step[0]
        let midLength = step[1]
        let lineData
        let nextpt
        let length

        for (let i = 1; i <= maxPoint ; i++){
            let along = t.along(lines , lineLength/maxPoint * i);
            let alongPt = t.ptCoor(along)
            if (check){
                lineData = genLines(...alongPt, poly ,3)
            } else if (!check) {
                lineData = genLines(...alongPt, poly ,1)
            }
            length = lineData[0]
            
            if(length > midLength){
                nextpt = lineData[1]
                midLength = length
            }

            if(i === maxPoint){
                newWayCoor.push(nextpt)
                // wayCoor.push(nextpt)
                generateCircle(...nextpt)

                // this["safeLine" + 0] = turf.lineString([alongPt,nextpt])
                // L.geoJSON(this["safeLine" + 0]).addTo(map)
                el.cls(findBtn, 'a', 'voyage')
            }
        }
    }
}

let maxProtect = 80
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
    let length = turf.distance([lat,lon], nextpt)
    return [step,length]
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

function genLines(lat, lon, poly, id) {
    let check
    let rad = 500
    let distFromObs = 10000
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
            nextpt = nearestPoint(distFromObs, angle, ...nextpt)
        }
        if(protect == maxProtect){
            nextpt = nearestPoint(distFromObs, angle, ...nextpt)
            console.log('break')
            break;
        }
    } while(check)
    let length = turf.distance([lat, lon], nextpt)
    return [length, nextpt]
}



function checkMaxPpoint(length){
    let maxPoint;
    if (length  < 5) {
        maxPoint = 1
    } else if (length >= 5   && length < 10) {
        maxPoint = 2
    } else if (length >= 10  && length < 20) {
        maxPoint = 3
    } else if (length >= 20  && length < 40) {
        maxPoint = 4
    } else if (length >= 40  && length < 60) {
        maxPoint = 6
    } else if (length >= 60  && length < 80) {
        maxPoint = 8
    } else if (length >= 80  && length < 100) {
        maxPoint = 10
    } else if (length >= 100 && length < 120) {
        maxPoint = 12
    } else if (length >= 120 && length < 140) {
        maxPoint = 14
    } else {
        maxPoint = 16
    }
    return maxPoint
}

function generateCircle(lat, lon){    
    this.currentCircle = L.circle([lon, lat], {radius : 1000}).addTo(map)
    this.currentCircle.setStyle(provStyle);
}