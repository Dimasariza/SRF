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
    // vehicle.show();
  };
};

let my_container = gEl('map', 0)
let myp5 = new p5(s, my_container);

}
