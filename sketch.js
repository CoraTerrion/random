let stars = [];
let shootingStars = [];
let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // generate stars with initial positions
  for (let i = 0; i < 200; i++) {
    stars.push(createVector(random(-width / 2, width / 2), random(-height / 2, height / 2)));
  }
}

function draw() {
  background(0);

  // Pan the stationary stars slowly
  for (let i = 0; i < stars.length; i++) {
    stars[i].x += 0.1; // Adjust the panning speed
    if (stars[i].x > width / 2) {
      stars[i].x = -width / 2;
      stars[i].y = random(-height / 2, height / 2);
    }
    fill(255, random(10, 255));
    ellipse(stars[i].x, stars[i].y, 2, 2);
  }
  // Twinkling effect
  for (let i = 0; i < stars.length; i++) {
    fill(255, random(10, 255)); // Random alpha for twinkling effect
    ellipse(stars[i].x, stars[i].y, 2, 2);
    if (random() > 0.99) {
    }
  }

  // Shooting stars
  for (let i = 0; i < shootingStars.length; i++) {
    let star = shootingStars[i];
    fill(255, star.alpha);
    ellipse(star.x, star.y, 4, 4); // Slightly bigger trail

    // Update shooting star position
    star.x += star.speedX;
    star.y += star.speedY;

    // remove shooting stars
    star.alpha -= 2;
    if (star.alpha <= 0 || star.x < -width / 2 || star.x > width / 2 || star.y < -height / 2 || star.y > height / 2) {
      shootingStars.splice(i, 1);
    }
  }

  // Generate shooting stars
  if (random() > 0.995) {
    let startX = random(-width / 2, width / 2);
    let startY = random(-height / 4, height / 4);
    let speedX = random(2, 5);
    let speedY = random(-1, 1);
    let alpha = 255;
    shootingStars.push({ x: startX, y: startY, speedX, speedY, alpha });
  }

  // Set ambient light
  ambientLight(50);

  // directional light
  directionalLight(25, 255, 255, 0, 0, -1);

  for (let i = 0; i < 7; i++) {
    push();
    rotateX(angleX);
    rotateY(angleY);

    let translationVector;
    if (i === 0) translationVector = createVector(0, -150, 0);
    else if (i === 1) translationVector = createVector(-150, 0, 0);
    else if (i === 2) translationVector = createVector(0, 0, -150);
    else if (i === 3) translationVector = createVector(150, 0, 0);
    else if (i === 4) translationVector = createVector(0, 150, 0);
    else if (i === 5) translationVector = createVector(0, 0, 150);
    else translationVector = createVector(0, 0, 0);

    translate(translationVector);

    drawCube();

    // rotation angle
    angleX += 0.002;
    angleY += 0.002;
    pop();
  }
}

function drawCube() {
  push();
  stroke(255);
  strokeWeight(2);

  // Add point light
  pointLight(255, 255, 255, 0, 0, 0);

  fill(255, 150, 150);
  box(50);
  pop();
}
