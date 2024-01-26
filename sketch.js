function setup() {
  createCanvas(300, 160);
}

function draw() {
  background(150);
  strokeWeight(2)
  stroke('0');
  const c=color ('rgb(104,242,255)')
  const p=color ('pink')
  fill(c)
  ellipse(10,10,15,20);
  circle(110,100,20);
  line(110, 100, 10, 10);
  rectMode(CORNER);
rect(130,100,150,50);
 triangle(125,10,35,10,125,90);
  fill(p)
  circle(130,10,80);
  noStroke();
  quad(10,50,10,20,100,150,100,100);
  stroke(51); strokeWeight(10);
  point(115,105,20,20);
  noFill();strokeWeight(2)
  circle(210,125,50);
  ellipseMode(RADIUS);
  fill(p)
  ellipse(250,50,20, 45)
}
