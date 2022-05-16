// test here
var mapsPlaceholder = [];
    
// http://leafletjs.com/reference-1.1.0.html#class-constructor-hooks
L.Map.addInitHook(function () {
  mapsPlaceholder.push(this); // Use whatever global scope variable you like.
});



  // Adding an OSM map
const map = L.map('map', {
      zoomControl:false}).setView([2.8,113 ], 5);
      map.attributionControl.setPrefix(false)  
      map.options.minZoom = 5;
      map.options.maxZoom = 18;
  
  // Adding satelite Layer
const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tilesMap = L.tileLayer(tileUrl, {attr});

const googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{
      minZoom: 5,
      maxZoom:18,
      subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

const areaStyle = {
  "color": "rgba(255, 0, 0, .01)",
  "fillColor": "rgba(255, 0, 0, 1)",
  "opacity": 1,
  "weight" : 0.4  
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

let urlData = new Array;
for ( let i = 11; i <= 44; i++) {
  getData = `./src/data/provinsi/${i}.geojson`;
  urlData.push(getData)
}

let segmentArea = new L.GeoJSON.AJAX(urlData,{onEachFeature:popUp, style: areaStyle});

let baseLayers = {
  "Segment Area": segmentArea,
  "OpenSea Map": tilesMap,
  "Google Map": googleSat,
}
let control = L.control.layers(baseLayers).addTo(map);

  // Give limits in Indonesia area
map.on('mousemove', function(event){
  let lat = event.latlng.lat,
  lng = event.latlng.lng
  // console.log(lat, lng)
  // if (lng < 90 || lng > 150 || lat > 10 || lat < -13 ) {
  //   map.dragging.disable();
  // } else if(lng >= 90 || lng <= 150 || lat <= 10 || lat >= -13 ){
  //   map.dragging.enable();
  // }
});

const shipIcon = L.icon({
  iconUrl: "./src/img/myship.svg",
  iconSize : [40,40],
  iconAnchor : [20, 8],
});

const miniShipIcon = L.icon({
  iconUrl: "./src/img/myship.svg",
  iconSize : [50,50],
  iconAnchor : [30, 24],
});

const anchorIcon = L.icon({
  iconUrl: "./src/img/anchorIcon.svg",
  iconSize : [30,30],
})

  // Get port data =======================================================================================
let portIdx = new Array
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

  // Passing data to way point algorithm
  if (typeof i === 'number') {
    if ( findButton.hasAttribute('disabled') && gEl('listOfDest').length < 1) {
      for (let item = 0; item < data.length ; item++) {
          addChd('liPortDest', `${data[item].Pelabuhan}`, "d" , `${item}`, i)
      }
      let rmEl = gEl('liPortDest', 0)
      rmEl.removeChild(gEl('liPortDest', 0, 0))
    }
    let portName;
      portName = data[i].Pelabuhan 
      console.log(portName)
      if ( findButton.hasAttribute('disabled') === false ) {
        let orgX = data[portIdx[0]].sandar[0],
            orgY = data[portIdx[0]].sandar[1],
            destX = data[portIdx[1]].sandar[0],
            destY = data[portIdx[1]].sandar[1]
        findButton.setAttribute('onclick', `wayPoint( ${orgX} , ${orgY}, ${destX}, ${destY})`)
        console.log(portIdx)
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
getPortData("Load")

// =================================== get data provinsi
async function getProvinsiData () {
  for ( let i = 11 ; i <= 44 ; i++) {
    let urlPortData = `./src/data/provinsi/${i}.geojson`
    let response = await fetch(urlPortData);
    dataProv = await response.json()
    this["provinsi" + i]  = dataProv.features[0].geometry
    console.log('provinsi' + i)
  }
}
getProvinsiData()

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

function switchPort (i, j) {
  if ( j === 'org') {
    portIdx[0] = i
  } else if ( j === 'dest' ) {
    portIdx[1] = i
  } 
}

let current = new Date()

console.log(current)
