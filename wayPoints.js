  /*
  * Dimas Ariza
  * source code link : 'https://github.com/Dimasariza/Tugas_Akhir'
  */

let lineStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.65
};
wayCoor = new Array
let maxProtect = 800

function wayPoint(coord) {
    for (let i = 1; i < coord.length ; i++){
        // loading(i)
        this.lineIndex = i
        this.angle = t.ang(coord[i - 1],coord[i])
        this.lines = t.lines([coord[i - 1], coord[i]]);    
        let check = checkLine(lines)
        i < wayCoor.length ? console.log('wait', i) : console.log('done', i)
        if(check){
            intersectCoor(this.lines)
        } else if (!check) continue
        if(i == maxProtect) break
    }
    let line = t.lines(wayCoor)
    let check = checkLine(line)
    if(check){
        console.log('recheck line')
        wayPoint(wayCoor)
    } 
    let checkLines = map.hasLayer(this.wayLine)
    this.wayPointsLayer = new L.FeatureGroup();
    if(!checkLines){
        this.wayLine = L.geoJSON(line).addTo(map)
        el.cls(findBtn, 'a', 'voyage')
        wayCoor.forEach(item => {
            let pointMarker = generateCircle(...item)
            wayPointsLayer.addLayer(pointMarker)
            wayPointsLayer.addTo(map)
        })
    }
    // el.get('loader', 0).style.visibility = 'hidden'
}

function checkWayPoint(coord){
    for (let i = 1; i < coord.length ; i++){
        this.lineIndex = i
        this.angle = t.ang(coord[i - 1],coord[i])
        this.lines = t.lines([coord[i - 1], coord[i]]);    
        let check = checkLine(lines)
        i < wayCoor.length - 1 ? console.log('wait', i) : console.log('done', i)
        if (!check){
            continue
        } else if (check) {
            intersectCoor(this.lines)
        }
        if(i == maxProtect) break
    }
}

function checkLine(line) {
    this.intersectLine = new Array
    obsList.forEach(obstacle => {
        let check = t.bint(line, obstacle)
        if ( check ) {
        this.intersectLine.push(obstacle)
        }
    });
    if(this.intersectLine.length != 0)return true
    else return false
}

function intersectCoor (line) {
    // let useLength = 0
    let usePoint
    this.intersectLine.map(obs => {
        let lineSplit = t.split(line, obs)
        returnLine = returnIdx(lineSplit)
        for(let item in returnLine) {
            let collectLine = returnLine[item]
            let lineCoor = collectLine.geometry.coordinates
            let midPoint = t.midpt(...lineCoor)
            let pointInPoly = t.ptpoly(midPoint, obs)
            if(pointInPoly){
                usePoint = midPointInPoly(midPoint, collectLine, obs)
                break
                // let {nextpt, length} = data
                // if (length > useLength){
                //     useLength = length
                //     usePoint = nextpt
                //     return [nextpt]
                // }
            }
        }
    })
    wayCoor.splice(lineIndex, 0, usePoint)
}

function midPointInPoly(midPoint, lines, poly){
    let lineLength = t.len(lines)
    maxPoint = checkMaxPoint(lineLength)
    distance =  distFromObs(maxPoint)
    let latlon = t.ptCoor(midPoint)
    let step = keyAngle(...latlon, this.angle, poly)
    let usePoint
    let useLength = 0
    for (let i = 1; i < maxPoint ; i++){
        let along = t.along(lines , lineLength/maxPoint * i);
        let alongPt = t.ptCoor(along)
        let id
        if (step){
            id = 3
        } else if (!step) {
            id = 1
        }
        data = genLines(...alongPt, poly , id, distance)
        let {nextpt, length} = data
        if (length > useLength){
            useLength = length
            usePoint = nextpt
        }
        let check = t.ptpoly(usePoint, poly)
        if(check){
            data = genLines(...usePoint, poly, id, 100)
            usePoint = data.nextpt
            console.log('inside obstacle')
        }
    }
    return usePoint
}

function keyAngle (lat, lon, angle, poly){
    let rad = 500
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
        protect++
        if (protect == maxProtect) break;
    } while (t.ptpoly(checkPoint, poly))
    return step
}

function genLines(lat, lon, poly, id, distance) {
    let rad = 100
    let angle = this.angle + 90 * id
    let protect = 0
    do{
        rad += 100
        nextpt = nearestPoint(rad, angle, lat, lon)
        checkPoint = t.pt(...nextpt)
        check = t.ptpoly(checkPoint, poly)
        if(!check){
            nextpt = nearestPoint(distance, angle, ...nextpt)
        }
        protect++
        if(protect == maxProtect){
            nextpt = nearestPoint(distance, angle, ...nextpt)
            break;
        }
    } while(check)
    let length = t.dist([lat, lon], nextpt)
    return { nextpt : nextpt, length : length}
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
    let circle = L.circle([lon, lat], {radius : 100})
    circle.setStyle(provStyle);
    return circle
}

function generateLines(coor1, coor2){
    this["safeLine" + 0] = t.lines([coor1,coor2])
    L.geoJSON(this["safeLine" + 0]).addTo(map)
}

