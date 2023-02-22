//goal: minigame to find a light switch and turn on the lights using the position of your right wrist

//light switch location + size variables
var x, y, w, h;
//light on / background fill variable
var on = false;
//switch flipper weight and color variables
let flipUp, flipDown;
//light switch highlight + bulb fill variable 
let l;
//text content and fill variables
let t,tf;

let poseNet;
let pose;
let skeleton;
let m; 
let wX;
let wY;
let video;


function setup() {
    video = createCapture(VIDEO);
  video.hide();
    sleep(5000).then(function() {
    createCanvas(video.width, video.height);
  })
  // createCanvas(video.width, video.height);
  //light switch starting size and location
  w = 30;
  h = 40;
  x = wX;
  y = wY;
  
    //pg = createGraphics(width, height);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  init_ui();
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  print('poseNet ready');
}


function draw() {
    // reverse canvas context to mirror everything
  push();
  //tint(255, 10);
    image(video, 0, 0);
  translate(video.width, 0);
  scale(-1, 1);

  // draw off-screen graphics to canvas
  //image(pg, 0, 0, windowWidth, windowHeight);
  if (pose) {
    // get the nose x, y positions
  wX = pose.rightWrist.x;
  wY = pose.rightWrist.y;
  }
      //if (!pose) return;

  if (on) {
    background("gray");
    //adds highlight
    l = "yellow";
    //switch flipping animation through stroke weight 
    flipUp = 3;
    flipDown = 0;
    //message text change and color change
    t = "You found it!";
    tf = "black";
  } else {
    background(0);
    l = "rgba(0,0,0,0)";
    flipUp = 0;
    flipDown = 3;
    t = "Shine a light to read a hidden message";
    tf = "grey";
  //   fill("black")
  // text("hi test", width / 2, height / 2);
  }


  //spotlight attached to mouse
  noStroke();
  fill("gray");
  ellipse(wX, wY, 100, 100);

  //highlight around light switch
  strokeWeight(3);
  noStroke();
  if (wX > x - w && wX < x + w && wY > y - w && wY < y + h) {
    stroke("yellow");
    strokeWeight(3);
  }
    pop();
  
  //light switch
  rectMode(CENTER);
  noFill();
  rect(x, y, w, h);
  stroke("black");
  strokeWeight(1);
  rect(x, y, w - 2, h - 2);
  rect(x, y, w / 1.5, h / 1.5);


  //message
  noStroke();
  fill(tf);
  textAlign(CENTER);
  textSize(width - width);
  text(t, width / 2, height / 2);
  
    //message
  noStroke();
  fill("black");
  textAlign(CENTER);
  textSize(width - width);
  textLeading(20);
  text("\nYou have revealed a secret message: hi lol", width / 2, height / 2);

  //switch on/off state
  stroke("black");
  strokeWeight(flipUp);
  line(x, y -10, x, y);
  stroke("black");
  strokeWeight(flipDown);
  line(x, y, x, y + 10);

  //bulb
  noStroke();
  fill(l);
  rectMode(CENTER);
  rect(width / 2, height - height, 12, 20);
  ellipse(width / 2, height - height / 1.04, 25, 25);
}

//turning the light on when mouse is pressed within bounds of light switch
function mousePressed() {
  if (wX > x - w && wX < x + w && wy > y - h && wy < y + h) {
    on = !on;
  }
}

// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

// credits
// button switch by icm
//https://editor.p5js.org/icm/sketches/Sywrrqa2
//square rollover by icm
//https://editor.p5js.org/icm/sketches/rkLfL56h
