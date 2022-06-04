var fun = {
  routeExp  : function () {
    let check = el.cls(routeExplore, 'c', 'active')
    let layerControl = el.get('leaflet-control-layers', 0)
    if (!check) {
      el.tran(startBar, 4.1, -5.35)
      el.tran(portIcon, 4)
      el.tran(layerControl, 4)
      el.tran(routeExplore, 4)
      el.cls(routeExplore, 'a', 'active')
    }
    if (check) {
      el.tran(startBar, 25, -5.35)
      el.tran(portIcon, 0)
      el.tran(layerControl, 0)
      el.tran(routeExplore, 0)
      el.cls(routeExplore, 'r', 'active')
    }
  },
  portIcon  : function () {
    let check = el.cls(portIcon, 'c', 'active')
    if (!check) {
      el.cls(portIcon, 'a', 'active')
      el.txt(portIcon, 'close', 0)
      portData('show')
    }
    if (check) {
      el.cls(portIcon, 'r', 'active')
      el.txt(portIcon, 'anchor', 0)
      portData('hide')
    }
  },
  fullScr : function () {
    let check = el.cls(fullScr, 'c', 'active')
    if (!check) {
      el.cls(fullScr, 'a', 'active')
      el.txt(fullScr, 'fullscreen_exit', 0)
      el.get('mini_map', 0).requestFullscreen()
    }
    if (check) {
      el.txt(fullScr, 'fullscreen_exit', 0)
      el.cls(fullScr, 'r', 'active')
      document.exitFullscreen()
    }
  },
  findBtn : function () {
    for (let i = 0; i < portBtn.length; i++) {
      el.cls(portBtn[i], 'a', 'disabled')
      mod.attr(cancelBtn, 'r', 'disabled')
      el.txt(findBtn, 'Voyage')
    }
    el.cls(findBtn, 'a', 'voyage')
    findBtn.classList.add('voyage')
    wayPoint()
  },
  expInfo : function () {
    let check = el.cls(expInfo, 'c', 'active')
    if (!check) {
      el.cls(expInfo, 'a', 'active')
      el.txt(expInfo, 'keyboard_arrow_down')
      addDiv("a")
    }
    if (check) {
      el.cls(expInfo, 'r', 'active')
      el.txt(expInfo, 'keyboard_arrow_up')
      addDiv("r")
    }
  },
  cancelBtn: function () {
    for (let i = 0; i < portBtn.length; i++) {
      // portBtn[item].classList.remove('disabled')
      el.cls(portBtn[i], 'r', 'disabled')
      el.txt(findBtn, 'Find')
      // map.removeLayer(mainShip)
      // miniMap.removeLayer(miniShip)
      // map.removeLayer(fixWayLine)
      // miniMap.removeLayer(miniCircle)
      // clearInterval(shipVoyage)
    }
  },
  portIcon  : function () {
    let check = map.hasLayer(portMarker0)
    for (let item in portIdx){
      let marker = eval('portMarker' + item)
      if (!check){
        el.txt(portIcon, 'close', 0)
        marker.addTo(map)
        L.DomUtil.addClass(marker._icon, 'anchor_active')
      }
      if (check) {
        el.txt(portIcon, 'anchor', 0)
        map.removeLayer( marker )
      }
    }
  }
}

el.click(routeExplore, fun.routeExp)
el.click(closeBtn, fun.routeExp)
el.click(portIcon, fun.portIcon)
el.click(fullScr, fun.fullScr)
el.click(findBtn, fun.findBtn)
el.click(expInfo, fun.expInfo)
el.click(cancelBtn, fun.cancelBtn)
el.click(portIcon, fun.portIcon)