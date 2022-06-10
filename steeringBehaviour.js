function passWayCoor(){
  let count = 1
  let currPos = wayCoor[count - 1]
  let nextPos = wayCoor[count]
  
  function setShipPos(currLat, currLon){
    miniCircle = L.circle([currLon, currLat], {radius : 100})
    miniCircle.setStyle({className: 'ship_area'});
    miniCircle.addTo(miniMap)

    this.mainShip = L.marker([currLon, currLat], {icon: shipIcon}).addTo(map)
    this.mainShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
    L.DomUtil.addClass(this["mainShip"]._icon, 'main_ship');

    this.miniShip = L.marker([currLon, currLat], {icon: miniShipIcon}).addTo(miniMap)
    this.miniShip.bindPopup("Ship Name : MV.Toba Dreams <br> ID : Idn 001 <br> Flag : Indonesia")
    L.DomUtil.addClass(this["miniShip"]._icon, 'mini_ship');

    this.sector = L.circle([currLon, currLat], {
      color: 'red',
      radius: 100,
      weight: 1
    })
    .setAngles( 0, 0)
    .addTo(miniMap);
  }
  setShipPos(...wayCoor[0])
  ship(...currPos, ...nextPos)
  
  function ship(currLat, currLon, nextLat, nextLon){
    let shipRot = turf.bearing([currLat, currLon], [nextLat, nextLon])
    this.mainShip.setRotationAngle((shipRot));
    this.miniShip.setRotationAngle((shipRot));

    let lat = currLat
    let lon = currLon
    let shipPos
    let getDist

 
    let move = function(lat, lon){
          return function(){
            shipPos = nearestPoint(0.308667, shipRot, lat, lon)
            shipPos = switchCoor(...shipPos)

            lon = shipPos[0]
            lat = shipPos[1]

            this.mainShip.setLatLng(shipPos)
            this.miniShip.setLatLng(shipPos)
            miniCircle.setLatLng(shipPos)

            this.sector.setLatLng(shipPos)
            this.sector.setAngles(shipRot - 30, shipRot + 30)

            miniMap.setView(shipPos, 17,{
              "animate": true,
              "pan": {
              "duration": 1
              }
            });



            getDist = t.dist(t.pt(lat, lon) , t.pt(nextLat, nextLon))


            setInformation(lat, lon)

            console.log(getDist)
            if(getDist < 0.01){
              clearInterval(shipVoyage)
              if(count <= wayCoor.length){
                count++
              }
              console.log(count)
              currPos = wayCoor[count - 1]
              nextPos = wayCoor[count]
              ship(...currPos, ...nextPos)
            }
          }
        }
    this.shipVoyage = setInterval(move(lat, lon), 30)
         
  }
}


function setInformation(lat, lon){

}


var steer = {
  increase  : function(){

  },
  decrease  : function(){
    
  },
  right     : function(){

  },
  left      : function(){
    
  }
}

function setData(lat, lon){

}


const num = [1,20];
function calcNum(){
  for(let i = 1 ; i < num.length ; i++){
    let check = num[i] - num[i - 1]
    if( check > 1){
      calc(num[i], num[i - 1], i)
      calcNum()
    }
    if(!(check > 1))continue
  } 
}

function calc(num1, num2, i){
    let res = Math.floor((num1 + num2) / 2)
    num.splice(i,0,res)
    // console.log(num)
}
// calcNum()









  // ========================================================================================== test steering 

  const s = ( p ) => {
    let vehicle;
    let target;
    
    class Vehicle {
      constructor(x, y) {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(0, 0);
        this.acc = p.createVector(0, 0);
        this.maxSpeed = 4;
        this.maxForce = 0.1;
        this.r = 8;
      }
      
      seek(target) {
        let force = p5.Vector.sub(target,this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);
      }
      
      applyForce(force){
        this.acc.add(force);
      }
      
      update(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
      }
    
    
      // show(){
      //   stroke(255);
      //   strokeWeight(2);
      //   fill(255);
      //   push();
      //   translate(this.pos.x, this.pos.y);
      //   rotate(this.vel.heading());
      //   triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
      //   pop();
      // }
    }
    
    // vehicle = new Vehicle(10, 120);
        // let x = 100; 
        // let y = 100;
      
    let deactiveSteer = false
    if ( deactiveSteer ) {
      p.setup = function() {
        vehicle = new Vehicle(11, 110 );
      };
    
      p.draw = function() {
        target = p.createVector(12, 111);
        console.log(target.x, "this target")
        p.circle(target.x, target.y, 16);
        let seek = vehicle.seek(target)
        vehicle.applyForce(seek);
        vehicle.update();
        console.log(vehicle, 'this vehicle')
      };
    };
    
    let myp5 = new p5(s, my_container);
    
    }
    