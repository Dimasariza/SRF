    //  =========== Define functuin get element
    // function to get element by class name
function gCls (c) {
    c = document.getElementsByClassName(c)
    return c
}

    // function to get class by index
function gChd(c, n) {
    c = gCls(c)[n]
    return c
}

    // funciton to get element and add class 
function gEl ( c, n, ch, a ) {
    let exp;
    if ( c !== undefined && n === undefined && ch === undefined && a=== undefined) {
        exp = gCls(c)
        return exp
    } else if ( c !== undefined && n !== undefined && ch === undefined && a=== undefined) {
        exp = gChd(c, n)
        return exp
    } else if ( c !== undefined && n !== undefined && ch !== undefined && a=== undefined) {{
        if ( ch == "a" ) {
            exp = gChd(c, n).classList.add('active')
            return exp
        } else if ( ch == "rm" ) {
            exp = gChd(c, n).classList.remove('active')
            return exp
        } else {
            exp = gChd(c, n).children[ch]
            return exp
        }
    }} else if ( c !== undefined && n !== undefined && ch !== undefined && a !== undefined ) {
        if ( ch === "a" ) {
            exp = gChd(c, n)
            exp.classList.add('active')
            exp.children[0].textContent = a
            return exp
        } else if ( ch === "rm" ) {
            exp = gChd(c, n)
            exp.classList.remove('active')
            exp.children[0].textContent = a
            return exp
        }
    }
}

    // function to append li child element
function addChd(c, txt, d, set, i) {
    let ul = document.getElementsByClassName(c)[0];
    let li = document.createElement("li");
    let a = document.createElement('a')
    let text = document.createTextNode(txt)
        ul.appendChild(li);
        li.appendChild(a)
        a.appendChild(text)
    if ( d === "a" ){
        a.classList.add('disabled')
        a.classList.add("dropdown-item", "h-75", "py-0" )
    }
    if (d === "o"){
        a.classList.add(`${set}_pO`, "dropdown-item", "h-75", "py-0" )
        li.classList.add("listOfOrg")
        li.setAttribute("onclick", `passOrg(${set})`) 
    } else if ( d === "d") {
        a.classList.add(`${set}_pD`, "dropdown-item", "h-75", "py-0")
        li.classList.add("listOfDest")
        if ( set != i ) {
            li.setAttribute("onclick", `passDest(${set})`) 
        }
        if ( set == i) {
            a.classList.add("disabled")
        } 
    }
}