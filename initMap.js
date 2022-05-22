  /*
  * Dimas Ariza
  * source code link : 'https://github.com/Dimasariza/Tugas_Akhir'
  * Initialize main map and mini map
  * On main map we use Open Sea Map and google map as tile layer
  * We also embed Indonesian area segment to avoid island from ship route
  * On mini map we use Open Sea map and you can see all dinamic analysis in mini map
  */

  // Define map container - main Map
let minZoom = 5
let maxZoom = 18
const map = L.map('map', {
  zoomControl:false}).setView([2.8,113 ], 5);
  map.attributionControl.setPrefix(false)  
  map.options.minZoom = minZoom;
  map.options.maxZoom = maxZoom;
   
   // Add OSM - main Map
const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tilesMap = L.tileLayer(tileUrl, {attr});
   
   // Add Google map - main Map
const googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{
      minZoom: minZoom,
      maxZoom: maxZoom,
      subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

  // Define map container - mini Map
const miniMap = L.map('mini__map', {
  zoomControl:false}).setView([-7.202638784078749, 112.7179207686899], 15);
  miniMap.attributionControl.setPrefix(false);
  miniMap.options.maxZoom = maxZoom;
  miniMap.options.minZoom = minZoom;
  
  // Add OSM - mini map
const miniAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const miniTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const miniTilesMap = L.tileLayer(miniTileUrl, {miniAttr});
    miniTilesMap.addTo(miniMap);

// Give limits in Indonesia area
map.on('mousemove', function(e){
  let lat = e.latlng.lat,
  lng = e.latlng.lng
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

let baseLayers = {
  "Segment Area": segmentArea,
  "OpenSea Map": tilesMap,
  "Google Map": googleSat,
}
L.control.layers(baseLayers).addTo(map);