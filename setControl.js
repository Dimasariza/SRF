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
    let checkClass = el.cls(portBtn[0], 'c', 'disabled')
    if(!checkClass){
      for (let i = 0; i < portBtn.length; i++) {
        el.cls(portBtn[i], 'a', 'disabled')
        mod.attr(cancelBtn, 'r', 'disabled')
      }
    }
    let voyage = el.cls(findBtn, 'c', 'voyage')
    if(voyage){
      passWayCoor()
      fun.routeExp()
    }
    if(!voyage){
      el.txt(findBtn, 'Voyage')
      wayPoint(wayCoor)
    }
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
    let voyage = el.cls(findBtn, 'c', 'voyage')
    if(!voyage){
      el.txt(findBtn, 'Find')
    }
    el.cls(findBtn, 'r', 'voyage')
    for (let i = 0; i < portBtn.length; i++) {
      el.cls(portBtn[i], 'r', 'disabled')
      el.cls(cancelBtn, 'a', 'disabled')
      el.txt(findBtn, 'Find')
      newWayCoor = []
      wayCoor = []
      pointAlong = []
    }
    let check = map.hasLayer(mainShip)
    if(check){
      map.removeLayer(mainShip)
      miniMap.removeLayer(miniShip)
      miniMap.removeLayer(miniCircle)
    }
    clearInterval(shipVoyage)
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



// modified this code below
    //  Function to append div element
function addDiv (conds){
  let divParr = el.get('dinamic_info', 0)
  let div1    = mod.create('div')
  let div2    = mod.create('div')
  let div3    = mod.create('div')
  let h6coor  = mod.create('h6')
  let h6stat  = mod.create('h6')
  let spanLat = mod.create('span')
  let spanLng = mod.create('span')
  let spanLink    = mod.create('span')
  let spanStatus  = mod.create('span')
  let breakLine1  = mod.create('br')
  let breakLine2  = mod.create('br')
  let addA        = mod.create('a')
  let lat     = mod.txt('Lat :')
  let lng     = mod.txt('Lng :')
  let stat    = mod.txt('Status : safe')
  let linkSource  = mod.txt('See source code here')
  let h6Text1     = mod.txt('Coordinate')
  let h6Text2     = mod.txt('Status')

  if ( conds == "a"){
      divParr.appendChild(div1)
      div1.appendChild(div2)
      div1.appendChild(div3)
      div2.appendChild(h6coor)
      div2.appendChild(spanLat)
      div2.appendChild(spanLng)
      div3.appendChild(h6stat)
      div3.appendChild(spanStatus)
      div3.appendChild(spanLink)
      h6coor.appendChild(h6Text1)
      h6stat.appendChild(h6Text2)
      spanLat.appendChild(lat)
      spanLat.appendChild(breakLine1)
      spanLng.appendChild(lng)
      spanStatus.appendChild(stat)
      spanStatus.appendChild(breakLine2)
      spanLink.appendChild(addA)
      addA.appendChild(linkSource)

      el.cls(div1, 'a', 'dinamic_content')
      el.cls(div1, 'a', 'text-light')
      el.cls(div2, 'a', 'latLan')
      el.cls(div2, 'a', 'shipLat')
      el.cls(div2, 'a', 'shipLng')
      el.cls(div2, 'a', 'status')

      addA.href = 'https://github.com/Dimasariza/Tugas_Akhir'
      addA.title = "Github link - source code"
      addA.target = "_blank"
  } 
  if ( conds == "r") {
      let child = divParr.lastElementChild;    
      for (let i = 0 ; i < divParr.children.length ; i++) {
          divParr.removeChild(child);
      }
  }
}
