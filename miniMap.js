// define miniMap container
// var miniMapBox = document.getElementById("mini__map");

let miniLat = [],
  miniLong = []

  
  var miniMap = L.map('mini__map', {
    zoomControl:false}).setView([-7.202638784078749, 112.7179207686899], 15);
    miniMap.attributionControl.setPrefix(false);
    
    // Contrling zoom
    miniMap.options.maxZoom = 18;
    miniMap.options.minZoom = 3;
    
    //Adding Opensea Layer API
    const miniAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    const miniTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const miniTilesMap = L.tileLayer(miniTileUrl, {miniAttr});
    miniTilesMap.addTo(miniMap);

    // Add ship to minimap
    const miniShipIcon = L.icon({
      iconUrl: "./src/img/shipIcon.svg",
      iconSize : [70,30],
    });
    let miniShipMarker = L.marker([-7.202638784078749, 112.7179207686899], {icon: miniShipIcon}).addTo(miniMap)