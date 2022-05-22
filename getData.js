    /*
    * Dimas Ariza
    * source code link : 'https://github.com/Dimasariza/Tugas_Akhir'
    * Get all data we need
    * We embed Indonesian segment Area and devide it into several provinces
    * We also embed ship container port (TPK) in some areas
    */
  
  // ============================================= Get Provinces Data ============================================= //
let segmentArea = new L.FeatureGroup();
let provinceNum = 44
let provStart = 11
let provName = new Array
let provinces;
let provStyle = {      
    color: "rgba(255, 0, 0, 1)",
    fillColor: "rgba(255, 0, 0, 1)",
    weight : 0.4  
}

async function getProvinsiData () {
  for ( let i = provStart ; i <= provinceNum ; i++) {
    let urlProvData = `./src/data/provinsi/${i}.geojson`
    let response = await fetch(urlProvData);
        dataProv = await response.json()
    let featureData = dataProv.features[0]
    this["provinsi" + i]  = featureData
        provName.push(featureData.properties.Provinsi)
        provinces = L.geoJSON(this["provinsi" + i])
        provinces.setStyle(provStyle);
        popUp(featureData, provinces)
        segmentArea.addLayer(provinces)
  }
  getPortData("Load")
}
getProvinsiData()

function popUp(f,l){
  let out = [];
  if (f.properties){
      for(key in f.properties){
          out.push(key+": "+f.properties[key]);
      }
      l.bindPopup(out.join("<br />"));
  }
}

  // ============================================= Get Ports Data ============================================= //
let portIdx = new Array
let portCoorData = new Object
this.anchorOrg1
this.anchorDest1;
this.anchorOrg2;
this.anchorDest2;
let findButton = gEl('findBtn', 0) 
let anchorOrg_1 = gEl('anchor_org1')
let anchorOrg_2 = gEl('anchor_org2')
let anchorDest_1 = gEl('anchor_dest1')
let anchorDest_2 = gEl('anchor_dest2')

async function getPortData (i) {
const urlPortData = "./src/data/pelabuhan/dataPelabuhan.json"
const response = await fetch(urlPortData);
const data = await response.json()
  if ( typeof i !== 'number') {
    for ( let item = 0; item < data.length ; item++ ) {
      if ( i === "Load" ) {
        addChd('liPortOrg', `${data[item].Pelabuhan}`, "o" , `${[item]}`)
      }
      if ( i === 'show') {
        this["anchorMarker" + item ] = L.marker(data[item].LatLng, {icon:  anchorIcon}).addTo(map)
        this["anchorMarker" + item ].bindPopup(`Nama Pelabuhan : ${data[item].Pelabuhan} <br>
        Id Pelabuhan : ${data[item].ID}`)
        L.DomUtil.addClass(this["anchorMarker" + item]._icon, 'anchor_active');
      } else if ( i === 'hide' ) {
        map.removeLayer(this["anchorMarker" + item])
      }
    }
    if ( i === "Load") {
      addChd('liPortDest', 'Please input port of origin', "a")
    }
  }

  // Pass the data coordinate to way point algorithm
  if (typeof i === 'number') {
    if ( findButton.hasAttribute('disabled') && gEl('listOfDest').length < 1) {
      for (let item = 0; item < data.length ; item++) {
          addChd('liPortDest', `${data[item].Pelabuhan}`, "d" , `${item}`, i)
      }
    let rmEl = gEl('liPortDest', 0)
        rmEl.removeChild(gEl('liPortDest', 0, 0))
    }
    if ( findButton.hasAttribute('disabled') === false ) {
    let orgX = data[portIdx[0]].sandar[0],
        orgY = data[portIdx[0]].sandar[1],
        destX = data[portIdx[1]].sandar[0],
        destY = data[portIdx[1]].sandar[1]

    portCoorData = 
    {
      "portOrg":{
         "portName": data[portIdx[0]].Pelabuhan,
         "coor":[
            orgY,
            orgX
         ]
      },
      "portDest":{
        "portName": data[portIdx[1]].Pelabuhan,
        "coor":[
           destY,
           destX
        ]
     }
    }

    // findButton.setAttribute('onclick', `wayPoint( ${orgX} , ${orgY}, ${destX}, ${destY})`)
    }

    if ( anchorOrg_1.length == 0 ) {
      anchorOrg1 = L.marker(data[portIdx[0]].LatLng, {icon:  anchorIcon}).addTo(map)
      L.DomUtil.addClass(this["anchorOrg" + 1]._icon, 'anchor_org1');
      if ( anchorOrg_2.length !== 0) {
        map.removeLayer(anchorOrg2)
      }
    } else if ( anchorOrg_1.length != 0) {
      map.removeLayer(anchorOrg1)
      anchorOrg2 = L.marker(data[portIdx[0]].LatLng, {icon:  anchorIcon}).addTo(map)
      L.DomUtil.addClass(this["anchorOrg" + 2]._icon, 'anchor_org2');
    }

    if ( anchorDest_1.length == 0 && portIdx.length > 1 ) {
      anchorDest1 = L.marker(data[portIdx[1]].LatLng, {icon:  anchorIcon}).addTo(map)
      L.DomUtil.addClass(this["anchorDest" + 1]._icon, 'anchor_dest1');
      if ( anchorDest_2.length != 0) {
        map.removeLayer(anchorDest2)
      }
    } else if (anchorDest_1.length !=0 ) {
      map.removeLayer(anchorDest1)
      anchorDest2 = L.marker(data[portIdx[1]].LatLng, {icon:  anchorIcon}).addTo(map)
      L.DomUtil.addClass(this["anchorDest" + 2]._icon, 'anchor_dest2');
    }
  }
}

    // Origin port coordinates data control
function  passOrg(i) {
let findConds = findButton.hasAttribute('disabled')
let orgList = gEl(`${[i]}_pO`, 0)
let x = portIdx[0]
let currOrgList = gEl(`${x}_pO`, 0)
let currDestList = gEl(`${[x]}_pD`, 0) 
let destList = gEl(`${[i]}_pD`, 0)

    gEl('portOfOrg', 0).textContent = orgList.innerText
    orgList.classList.add('disabled')
    orgList.parentElement.removeAttribute('onclick')
    
      if (findConds === false || portIdx.length > 0) {
        currOrgList.parentElement.setAttribute('onclick', `passOrg(${x})`)
        currOrgList.classList.remove('disabled')
        currDestList.parentElement.setAttribute('onclick', `passDest(${x})`)
        currDestList.classList.remove('disabled')
        destList.parentElement.removeAttribute('onclick')
        destList.classList.add('disabled')
      }
    getPortData(i)
    switchPort( i , 'org')
}

    // Destination port coordinates data control
function  passDest(i) {
  let findConds = findButton.hasAttribute('disabled')
  let y = portIdx[1]
  let destList = gEl(`${[i]}_pD`, 0)
  let currDestList = gEl(`${[y]}_pD`, 0) 
  let orgList = gEl(`${[i]}_pO`, 0)
  let currOrgList = gEl(`${[y]}_pO`, 0)
      orgList.parentElement.removeAttribute('onclick')
      orgList.classList.add('disabled')

    if (findConds === false && currDestList.classList.contains('disabled') === true) {
      currDestList.parentElement.setAttribute('onclick', `passDest(${y})`)
      currDestList.classList.remove('disabled')
    }
    if ( findConds === false ) {
      currOrgList.parentElement.setAttribute('onclick', `passOrg(${y})`)
      currOrgList.classList.remove('disabled')
    }
  
  gEl('findBtn', 0).removeAttribute('disabled')
  gEl('portOfDest', 0).textContent = destList.innerText
  destList.classList.add('disabled')
  destList.parentElement.removeAttribute('onclick')
  getPortData(i)
  switchPort( i , 'dest')
}

    // Switch Port data control
function switchPort (i, j) {
  if ( j === 'org') {
    portIdx[0] = i
  } else if ( j === 'dest' ) {
    portIdx[1] = i
  } 
}