  // adding an OSM map
var map = L.map('map', {
  zoomControl:false}).setView([1.5,122 ], 5);
  map.attributionControl.setPrefix(false)
  
  // Contrling zoom
map.options.minZoom = 5;
map.options.maxZoom = 18;
  
  //Adding satelite Layer
const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tilesMap = L.tileLayer(tileUrl, {attr});
tilesMap.addTo(map)


var googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{
  maxZoom:18,
  minZoom: 5,
  subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

  // read Data using ajax
var urlData = [];
for ( var i = 11; i <= 44; i++) {
  urlDataLoop = `./data/provinsi/${i}.geojson`;
  urlData.push(urlDataLoop)
}

function popUp(f,l){
  var out = [];
  if (f.properties){
      for(key in f.properties){
          out.push(key+": "+f.properties[key]);
      }
      l.bindPopup(out.join("<br />"));
  }
}

  // Adding segment area style
var areaStyle = {
  "color": "red",
  "fillColor": "red",
  "opacity": 1,
  "weight" : 0.4  
}
var segmentArea = new L.GeoJSON.AJAX(urlData,{onEachFeature:popUp, style: areaStyle});
// segmentArea.addTo(map)

  // Layer Control
var baseLayers = {
  "Segment Area": segmentArea,
  "OpenSea Map": tilesMap,
  "Google Map": googleSat,
}

var control = L.control.layers(baseLayers).addTo(map);

  // Adding coordinates during mouse move
map.on('mousemove', function(event){
  let lat = event.latlng.lat,
  lng = event.latlng.lng
  // console.log(`Lat: ${lat} Lng: ${lng}`)
  if (lng < 90 || lng > 150 || lat > 10 || lat < -13 ) {
    map.dragging.disable();
  } else if(lng >= 90 || lng <= 150 || lat <= 10 || lat >= -13 ){
    map.dragging.enable();
  }
});

// Adding ship icon
const shipIcon = L.icon({
  iconUrl: "./src/img/shipIcon.svg",
  iconSize : [80,40],
  iconAnchor : [25, 16],
});
let shipMarker = L.marker([-7.202638784078749, 112.7179207686899], {icon: shipIcon , rotationAngle: 45}).addTo(map)

// Info pelabuhan
const anchorIcon = L.icon({
  iconUrl: "./src/img/anchor point.png",
  iconSize : [30,30],
})

  // Get data pelabuhan
async function getDataPelabuhan () {
  const urlDataPelabuhan = "./data/pelabuhan/dataPelabuhan.json"
  const response = await fetch(urlDataPelabuhan);
  const data = await response.json()
  
  for (let i=0 ; i < 18 ; i++){
    let getData = data[i]
    let namaPelabuhan = getData.Pelabuhan
    let getLatLan = getData.LatLng

    var marker12 = L.marker(getLatLan, {
      icon: anchorIcon,
      elevation: 260.0,
      title: "Pelabuhan Peti Kemas Indonesia"
    }).addTo(map);
    marker12.bindPopup(`Nama Pelabuhan : ${namaPelabuhan}`)
  }
}



