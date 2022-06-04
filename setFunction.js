/* =======================================================================
 * Function to analisis geospatial
 * =======================================================================
 */
var t = 
{
    lines   : function(lat, lon){
        let line    = turf.lineString(lat, lon)
        return line
    },
    ptpoly  : function (pt, poly){
        let point   = turf.booleanPointInPolygon(pt, poly)
        return point
    },
    split   : function(line, poly){
        let split   = turf.lineSplit(line, poly)
        return split
    },
    pt      : function (pt){
        let coord   = turf.getCoord(pt)
        return coord
    },
    len     : function(line){
        let length  = turf.length(line)
        return length
    },
    bint    : function(line,poly){
        let conds   = turf.booleanIntersects(line, poly)
        return conds
    },
    midpt   : function(line){
        let mid     = turf.midpoint(line)
        return mid
    },
    along   : function(line){
        let along   = turf.along(line)
        return along
    },
    int     : function(poly, poly){
        let int     = turf.intersect(poly, poly)
        return int
    },
    dptline : function(pt, line){
        let dist    = turf.pointToLineDistance(pt, line)
        return dist
    },
    ang     : function(latx, lonx, laty, lony){
        let angle   = turf.bearing([latx,lonx],[laty, lony])
        return angle
    }
}

/* ======================================================================
 * Function to control element
 * ======================================================================
 */
var el = {
    get  : function (c, id){
        let element = document.getElementsByClassName(c)
        if (id !== undefined) {
            element = element[id]
        }
        return element
    },
    cls  : function(el, conds, cls){
        let element;
        if (conds == 'a'){
            element = el.classList.add(cls)
        }
        if (conds == 'r'){
            element = el.classList.remove(cls) 
        }
        if (conds == 'c'){
            element = el.classList.contains(cls) 
        }
        return element
    },
    txt  : function(el, text, id){
        let txt;
        if (id === undefined){
            txt = el.textContent = text
        }
        if (id !== undefined){
            txt = el.children[id].textContent = text
        }
        return txt
    },
    tran : function(el, x, y = 0){
        let element = el.style.transform = (`translate(${x}rem, ${y}rem)`)
        return element
    },
    click: function(el, fun){
        el.addEventListener('click', fun)
    }
}

/* ======================================================================
 * Function modification element
 * ======================================================================
 */
var mod = {
    create  : function(element){
        let el = document.createElement(element)
        return el
    },
    append  : function(parrent, child){
        let el = parrent.appendChild(child)
        return el
    },
    txt     : function(txt){
        let text = document.createTextNode(txt)
        return text
    },
    rm      : function(parr, id){
        let el = parr.removeChild(parr.children[id])
        return el
    },
    attr    : function(element, conds, attr, content){
        let el
        if(conds === 'h'){
            el = element.hasAttribute(attr) 
        }
        if(conds === 's'){
            el = element.setAttribute(attr, content)
        }
        if(conds === 'r'){
            el = element.removeAttribute(attr)
        }
        return el
    }
}

/* ======================================================================
 * Initialize variable
 * ======================================================================
 */
let fullScr      = el.get('full_scr', 0)
let startBar     = el.get('start_bar', 0)
let portOrg      = el.get('port_org', 0)
let portDest     = el.get('port_dest', 0)
let listOrg      = el.get('list_org', 0)
let listDest     = el.get('list_dest', 0)
let findBtn      = el.get('find_btn', 0)
let cancelBtn    = el.get('cancel_btn', 0)
let portIcon     = el.get('port_icon', 0)
let routeExplore = el.get('route_explore', 0)
let closeBtn     = el.get('close_btn', 0)
let dinamicInfo  = el.get('dinamic_info', 0)
let expInfo      = el.get('expand_info', 0)
let portBtn      = el.get('port_btn')