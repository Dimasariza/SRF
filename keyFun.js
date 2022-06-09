document.addEventListener('keydown', function(event){
if(event.key === "Escape"){
    console.log('exit')
    }

if(event.key === 'f') {
    fun.fullScr()
} 

if (event.key === 'r') {
    fun.routeExp()
    // call function here

}

if (event.key === 'q') {

    let testsector = L.circle([0, 100], {
        color: 'red',
        radius: 1000,
        weight: 1
      })
      .setSector(  0,  90)
      .addTo(map);
    //   testsector.setAngles(0,90)
    // call function here

}

if (event.key === 'p'){
    fun.portIcon()
}
});