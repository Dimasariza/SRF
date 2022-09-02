    /*
    * Dimas Ariza
    * source code link : 'https://github.com/Dimasariza/Tugas_Akhir'
    * Get all data we need
    * We embed Indonesian segment Area and devide it into several provinces
    * We also embed ship container port (TPK) in some areas
    */
  

  // =========================================== Get Sea Depth Data =========================================== //
async function seaDepth () {
  const urlSeaDepth = "./src/data/sea/laut.geojson"
  const response = await fetch(urlSeaDepth);
  const data = await response.json()
  let seaData = data.features

  for (let item in seaData) {
    this['depth' + item] = seaData[item]
    let data = L.geoJSON(seaData[item])
    segmentArea.addLayer(data)
  }
}
seaDepth()

  // ============================================= Get Provinces Data ============================================= //
let segmentArea = new L.FeatureGroup();
let provinceNum = 44
let provStart = 11
let provName = new Array
let provStyle = {      
    color: "rgba(255, 0, 0, 1)",
    fillColor: "rgba(255, 0, 0, 1)",
    weight : 0.4  
}

function popUp(f,l){
  let out = [];
  if (f.properties){
      for(key in f.properties){
          out.push(key+": "+f.properties[key]);
      }
      l.bindPopup(out.join("<br />"));
  }
}

async function indonesianData () {
  for ( let i = provStart ; i <= provinceNum ; i++) {
    let urlProvData = `./src/data/indonesia/${i}.geojson`
    let response = await fetch(urlProvData);
        dataProv = await response.json()
    let featureData = dataProv.features[0]
    this["provinsi" + i]  = featureData
    let provinces = L.geoJSON(this["provinsi" + i])
    provinces.setStyle(provStyle);
    popUp(featureData, provinces)
    segmentArea.addLayer(provinces)
    provName.push(featureData.properties.Provinsi)
    i == provinceNum ? console.log("ready") : console.log("wait")
  }
}
  // ============================================= Get Obstacle Data ============================================= //

let obsnum = 6
let obsList = new Array
async function obstacleData () {
  for(let i = 1 ; i <= obsnum ; i++){
    const urlPortData = `./src/data/obstacle/${'obs'+i}.geojson`
    const response = await fetch(urlPortData);
    const data = await response.json()
    data.features.forEach(item => {
      this['obs' + i] = item
      L.geoJSON(item) 
      .setStyle(provStyle)
      // let (eval('segment' + i)) = this['obs' + i] 
      // segmentArea.addLayer(eval(segment + i))
      obsList.push(this['obs' + i])
      if (i == obsnum){
        el.get('loader', 0).style.visibility = 'hidden'
        console.log('wait')
      } else {
        loading(i * 20)
      }
    });
  }
  indonesianData()
}
obstacleData()

  // ============================================= Get Ports Data ============================================= //
let portIdx = new Array
let portNum = new Array
let iconList = new Array
function addPortList(parr, text, conds){
  let li = mod.create('li')
  let a = mod.create('a')
  let txt = mod.txt(text)
  let addParr = mod.append(parr, li)
  let addA = mod.append(addParr, a)
  let addTxt = mod.append(addA, txt)
  a.classList.add('dropdown-item', 'h-75', 'py-0' )
  if (conds === 'd'){
      a.classList.add('disabled')
      mod.attr(li, 's', 'disabled', 'true')
      mod.attr(li, 'r', 'onclick')
  }
  return addTxt
}

async function portData () {
const urlPortData = "./src/data/port/dataPelabuhan.json"
const response = await fetch(urlPortData);
const data = await response.json()
    for (let item in data) {
      let dataInfo = data[item]
      let {LatLng, Pelabuhan, ID, sandar} = dataInfo
      addPortList(listOrg, `${Pelabuhan}`)
      el.cls(listOrg.children[item], 'a', 'origin_port')
      let li = el.get('origin_port', item)
      mod.attr(li, 's', 'onclick', `passOrg(${item})`)
      this["portMarker" + item ] = L.marker(sandar, {icon:  anchorIcon})
      this["portMarker" + item ].bindPopup(`Nama Pelabuhan : ${Pelabuhan} <br> Id Pelabuhan : ${ID}`)
      this['port' + ID] = dataInfo
      portIdx.push(ID)
    }
    addPortList(listDest, 'Please input port of origin', "d")
}
portData()

function  passOrg(i) {
  let childLen = listDest.childElementCount
  let origin = el.get('origin_port', i)
  portOrg.textContent = origin.innerText
  if(childLen < portIdx.length ){
    mod.rm(listDest, 0)
    for (let item in portIdx){
    let portData = eval('port' + portIdx[item])
    let {Pelabuhan} = portData
      addPortList(listDest, `${Pelabuhan}`)
      el.cls(listDest.children[item], 'a', 'dest_port')
      let destination = el.get('dest_port', item)
      if(item == i) {
        el.cls(destination.firstChild, 'a', 'disabled')
        continue
      }
      mod.attr(destination, 's', 'onclick', `passDest(${item})`)
    }  
    el.cls(origin.firstChild, 'a', 'disabled')
    mod.attr(origin, 'r', 'onclick')
  }
  if(childLen == portIdx.length){
    changePort(i)
    let lastOrg = el.get('origin_port', portNum[0])
    el.cls(lastOrg.firstChild, 'r', 'disabled')
    mod.attr(lastOrg, 's', 'onclick' , `passOrg(${portNum[0]})`)

    let lastDest = el.get('dest_port', portNum[0])
    el.cls(lastDest.firstChild, 'r', 'disabled')
    mod.attr(lastDest, 's', 'onclick', `passDest(${portNum[0]})`)
  }

  let marker = eval('portMarker' + i)
  let checkIcon = map.hasLayer(marker)
  if(checkIcon){
    marker.setIcon(orgAnchor)
  }
  if(!checkIcon){
    marker.addTo(map)
    marker.setIcon(orgAnchor)
  }

  if(portNum[0] !== undefined){
    let lastMarker = eval('portMarker' + portNum[0])
    let checkLastIcon = map.hasLayer(marker)
    if(checkLastIcon){
      lastMarker.setIcon(anchorIcon)
      map.removeLayer(lastMarker)
    } 
  }
  
  let portCoor = eval('port' + portIdx[i]).sandar
  portCoor = switchCoor(...portCoor)
  wayCoor[0] = portCoor
  portNum[0] = i
}

function  passDest(i) {
  let destination = el.get('dest_port', i)
  portDest.textContent = destination.innerText
  changePort(i)

  let marker = eval('portMarker' + i)
  let checkIcon = map.hasLayer(marker)
  if(checkIcon){
    marker.setIcon(destAnchor)
  } else if(!checkIcon){
    marker.addTo(map)
    marker.setIcon(destAnchor)
  }  
  if(portNum[1] !== undefined){
    let lastMarker = eval('portMarker' + portNum[1])
    let checkLastIcon = map.hasLayer(marker)
    if(checkLastIcon){
      lastMarker.setIcon(anchorIcon)
      map.removeLayer(lastMarker)
    } 

    let lastOrg = el.get('origin_port', portNum[1])
    el.cls(lastOrg.firstChild, 'r', 'disabled')
    mod.attr(lastOrg, 's', 'onclick' , `passOrg(${portNum[1]})`)
  
    let lastDest = el.get('dest_port', portNum[1])
    el.cls(lastDest.firstChild, 'r', 'disabled')
    mod.attr(lastDest, 's', 'onclick', `passDest(${portNum[1]})`)
  }
  mod.attr(findBtn, 'r', 'disabled')
  mod.attr(closeBtn, 'r', 'disabled')

  let portCoor = eval('port' + portIdx[i]).sandar
  portCoor = switchCoor(...portCoor)
  wayCoor[1] = portCoor
  portNum[1] = i
}

function changePort(id){
  let origin = el.get('origin_port', id)
  el.cls(origin.firstChild, 'a', 'disabled')
  mod.attr(origin, 'r', 'onclick')
  
  let destination = el.get('dest_port', id)
  el.cls(destination.firstChild, 'a', 'disabled')
  mod.attr(destination, 'r', 'onclick')
}

function switchCoor(lon, lat){
  let latLon = new Array
  latLon[0] = lat
  latLon[1] = lon
  return latLon
}