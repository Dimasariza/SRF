// define miniMap container
// var miniMapBox = document.getElementById("mini__map");


var miniMap = L.map('mini__map', {
  zoomControl:false}).setView([0,122 ], 3);
  miniMap.attributionControl.setPrefix(false);
  
  // Contrling zoom
  miniMap.options.maxZoom = 18;
  miniMap.options.minZoom = 3;
  
  //Adding satelite Layer
const miniAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const miniTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const miniTilesMap = L.tileLayer(miniTileUrl, {miniAttr});
miniTilesMap.addTo(miniMap);