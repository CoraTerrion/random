let words = ["Proscenium 1995", "Harmonic Grid LX 1978", "Sumer #1, The Watcher 1996", "Untitled 788, 790, 795, 796, 799, 800, 804 1993-1995", "Rebus 1997", "Hall of Birds 1995-1996", "Rhonda Lavonda Yolonda Chiffonda 1995", "Rise 1993", "Cleveland Clouds 1994", "Twelve Disks Over Sixteen Hollowed Halves and Four Quarters 2013", "Monument of Monuments 1996", "Dervish 9 2004", "Atrabiliarios (Defiant) 1992-1993", "Bang 1994", "Trophy Member 2003-2009", "Untitled (Kneeling Woman with Mask) 1998", "Climbing Rosebush 2005", "Jo Anne Robinson (arrest 7042) 2008", "J.W. Bonner (arrest 7057) 2008", "Rev. M. L. King Jr. (arrest 7089) 2008", "Audrey Belle;Langford (arrest 7080) 2008", "Rosa Parks (arrest 7053) 2008","Willie James Kemp (arrest 7104) 2008", "L.R. Bennett (arres 7022) 2008","Ralph D. Abernathy (arrest 7018) 2008", "Sustenance 79 2003", "DOUBLE DOOR 2000", "TRANSFER 1998", "LEE HARVEY OSWALD AFTER SIGMAR POLKE 2001", "supermodel 1994"];
let transparencies = []; // Array to store transparency levels for each word
let positions = []; // Array to store positions for each word
let textWidths = []; // Array to store widths for each word
let textHeights = []; // Array to store heights for each word

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textSize(18);
  textAlign(CENTER, CENTER);

  // Calculate non-overlapping positions for each word
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let wordWidth = textWidth(word);
    let wordHeight = textAscent() + textDescent();
    
    let x = random(wordWidth / 2, width - wordWidth / 2);
    let y = random(wordHeight / 2, height - wordHeight / 2);
    
    // Check for overlap with existing words
    let overlapping = false;
    for (let j = 0; j < positions.length; j++) {
      let otherX = positions[j].x;
      let otherY = positions[j].y;
      let otherWordWidth = textWidths[j];
      let otherWordHeight = textHeights[j];
      
      let distance = dist(x, y, otherX, otherY);
      if (distance < wordWidth/10 + otherWordWidth/10 && distance < wordHeight/10 + otherWordHeight/10) {
        overlapping = true;
        break;
      }
    }
    
    // If overlapping, recalculate position
    if (overlapping) {
      i--;
    } else {
      positions.push(createVector(x, y));
      textWidths.push(wordWidth);
      textHeights.push(wordHeight);
      transparencies.push(255);
    }
  }
}

function preload() {
  // Load the custom font
  customFont = loadFont('neon.ttf');
}

function keyPressed() {
  if (key === ' ') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function draw() {
  background(0);
  frameRate(30);

  // Display each word with its respective transparency and position
  for (let i = 0; i < words.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    fill(255, 255, 255, transparencies[i]);
    strokeWeight(.3);
    stroke(250, 150, 100, transparencies[i]);
    text(words[i], x, y);
    
    // Update transparency levels randomly
    if (random(25) < 1) { // Adjust this value to control the frequency of transparency changes
      let delta = random(-37, 25); // Random change in transparency
      transparencies[i] = constrain(transparencies[i] + delta, 0, 255); // Ensure transparency stays within valid range
    }
  }
}
