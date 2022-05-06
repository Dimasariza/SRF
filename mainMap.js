  // Adding an OSM map
const map = L.map('map', {
      zoomControl:false}).setView([2.8,115 ], 5);
      map.attributionControl.setPrefix(false)  
      map.options.minZoom = 5;
      map.options.maxZoom = 18;
  
  // Adding satelite Layer
const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tilesMap = L.tileLayer(tileUrl, {attr});

const googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{
      maxZoom:18,
      minZoom: 5,
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
  if (lng < 90 || lng > 150 || lat > 10 || lat < -13 ) {
    map.dragging.disable();
  } else if(lng >= 90 || lng <= 150 || lat <= 10 || lat >= -13 ){
    map.dragging.enable();
  }
});

const shipIcon = L.icon({
  iconUrl: "./src/img/shipIcon.svg",
  iconSize : [60,40],
  iconAnchor : [28, 16],
});

const anchorIcon = L.icon({
  iconUrl: "./src/img/anchor point.png",
  iconSize : [30,30],
})

  // Get port data =======================================================================================
let portIdx = []
let findButton = gEl('findBtn', 0) 
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
        this["anchorMarker" + item ]
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
        let orgX = data[portIdx[0]].LatLng[0],
            orgY = data[portIdx[0]].LatLng[1],
            destX = data[portIdx[1]].LatLng[0],
            destY = data[portIdx[1]].LatLng[1]
        findButton.setAttribute('onclick', `wayPoint( ${orgX} , ${orgY}, ${destX}, ${destY})`)
        console.log(portIdx)
      }
      this.anchorMarker = L.marker(data[i].LatLng, {icon:  anchorIcon}).addTo(map)
      L.DomUtil.addClass(this["anchorMarker"]._icon, 'anchor_active');

  }
}
getPortData("Load")

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
      }

      if ( findConds === false ) {
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