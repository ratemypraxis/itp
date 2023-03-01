let model, video, keypoints, predictions=[]; 

//for grouping elements in the left lanes and right lanes.
var l;
var r;
//for positioning elements on the y-axis.
var y;
//for coloring different cars in the sketch randomly.
var c;


// Create a KNN classifier
const classifier = knnClassifier.create();

const LABELS_MAP = {
  'Red Light': 0,
  'Green Light': 1,
  //'Yellow Light': 2
}

function preload() {
  video = createCapture(VIDEO, () => {
    loadHandTrackingModel();
  });
  video.hide();
  // Create the UI buttons
  createButtons();
}

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvasContainer');
}

async function loadHandTrackingModel() {
  // Load the MediaPipe handpose model.
  model = await handpose.load();
  select('#status').html('Hand Tracking Model Loaded')
  predictHand();
}

function draw() {
  background("rgb(75,75,75)");
    rectMode(CENTER);
//calling a function that presents a list of color options for the cars.
  randomCarColors();

//for assigning random positions for cars on the y-axis based on lane.
  l = random(12, 70);
  r = random(12, 70);

//a for loop to place cars uniformly in their lanes.
  for (x = 0; x < width; x += 120) {
    for (y = 0; y < height; y += random(100, 150)) {
      noStroke();
      cars();
    }
  }

//a seperate for loop to create the lanes.
  for (x = 0; x < width; x += 120) {
    for (y = 0; y < height; y += 120) {
      roadLines();
    }
  }
  tint(255, 150)
  if (model) image(video, 0, 0);
  if (predictions.length > 0) {
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
  }
}

async function predictHand() {
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
  // hand prediction from the MediaPipe graph.
  predictions = await model.estimateHands(video.elt);

  setTimeout(() => predictHand(), 200);
}

// Add the current hand tracking data to the classifier
function addExample(label) {
  if (predictions.length > 0) {
    const features = predictions[0].landmarks;
    const tensors = tf.tensor(features)
    // Add an example with a label to the classifier
    classifier.addExample(tensors, label);
    updateCounts();
  } else {
    console.log('No gesture is detected')
  }
}

// Predict the current frame.
async function classify() {
  // Get the total number of labels from classifier
  const numLabels = classifier.getNumClasses();
  if (numLabels <= 0) {
    console.error('There is no examples in any label');
    return;
  }
  if (predictions.length > 0) {
    const results = await classifier.predictClass(tf.tensor(predictions[0].landmarks));
    if (results.confidences) {
      const confidences = results.confidences;
      // result.label is the label that has the highest confidence
      if (results.label) {
        select('#result').html(results.label);
        select('#confidence').html(`${confidences[results.label] * 100} %`);
      }
  
      select('#confidenceRed').html(`${confidences['Red Light'] ? confidences['Red Light'] * 100 : 0} %`);
      select('#confidenceGreen').html(`${confidences['Green Light'] ? confidences['Green Light'] * 100 : 0} %`);
      // select('#confidenceScissor').html(`${confidences['Scissor'] ? confidences['Scissor'] * 100 : 0} %`);
    }
    classify();
  } else {
    setTimeout(() => classify(), 1000);
  }
}

// Update the example count for each label	
function updateCounts() {
  const counts = classifier.getClassExampleCount();

  select('#exampleRed').html(counts['Red Light'] || 0);
  select('#exampleGreen').html(counts['Green Light'] || 0);
  //select('#exampleScissor').html(counts['Scissor'] || 0);
}

// Clear the examples in one label
function clearLabel(label) {
  classifier.clearClass(label);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  classifier.clearAllClasses();
  updateCounts();
}

// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "rock" to the classifier
  buttonA = select('#addClassRed');
  buttonA.mousePressed(function() {
    addExample('Red Light');
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "paper" to the classifier
  buttonB = select('#addClassGreen');
  buttonB.mousePressed(function() {
    addExample('Green Light');
  });

  // // When the C button is pressed, add the current frame
  // // from the video with a label of "scissor" to the classifier
  // buttonC = select('#addClassScissor');
  // buttonC.mousePressed(function() {
  //   addExample('Scissor');
  // });

  // Reset buttons
  resetBtnA = select('#resetRed');
  resetBtnA.mousePressed(function() {
    clearLabel('Red Light');
  });
	
  resetBtnB = select('#resetGreen');
  resetBtnB.mousePressed(function() {
    clearLabel('Green Light');
  });
	
  // resetBtnC = select('#resetScissor');
  // resetBtnC.mousePressed(function() {
  //   clearLabel('Scissor');
  // });

  // Predict button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // Clear all classes button
  buttonClearAll = select('#clearAll');
  buttonClearAll.mousePressed(clearAllLabels);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[j];
    fill(255, 0, 0);
    noStroke();
    ellipse(keypoint[0], keypoint[1], 10, 10);
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  let annotations = predictions[0].annotations;
  stroke(255, 0, 0);
  for (let j = 0; j < annotations.thumb.length - 1; j++) {
    line(annotations.thumb[j][0], annotations.thumb[j][1], annotations.thumb[j + 1][0], annotations.thumb[j + 1][1]);
  }
  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    line(annotations.indexFinger[j][0], annotations.indexFinger[j][1], annotations.indexFinger[j + 1][0], annotations.indexFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
    line(annotations.middleFinger[j][0], annotations.middleFinger[j][1], annotations.middleFinger[j + 1][0], annotations.middleFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
    line(annotations.ringFinger[j][0], annotations.ringFinger[j][1], annotations.ringFinger[j + 1][0], annotations.ringFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.pinky.length - 1; j++) {
    line(annotations.pinky[j][0], annotations.pinky[j][1], annotations.pinky[j + 1][0], annotations.pinky[j + 1][1]);
  }

  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.thumb[0][0], annotations.thumb[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.indexFinger[0][0], annotations.indexFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.middleFinger[0][0], annotations.middleFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.ringFinger[0][0], annotations.ringFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.pinky[0][0], annotations.pinky[0][1]);
}

//function that sets a specific list of colors for the cars.
function randomCarColors() {
  c = [
    "rgb(138,46,46)",
    "rgb(10,10,150)",
    "rgb(2,102,2)",
    "rgb(126,11,190)",
    "rgb(187,181,181)",
    "rgb(153,98,5)",
    "rgb(20,155,165)",
    "rgb(54,54,54)",
    "rgb(151,2,101)",
  ];
}

//main functions to group smaller elements in the sketch together.
function cars() {
  wheels();
  carBody();
  headlights();
}

function roadLines() {
  solidYellowLine();
  brokenWhiteLines();
}

//sub-functions with distinct elements 
function wheels() {
  fill("black");
//for cars in the left lane
  ellipse(x + 15, y + l - 5, 10, 10);
  ellipse(x + 45, y + l - 5, 10, 10);
  ellipse(x + 15, y + l + 10, 10, 10);
  ellipse(x + 45, y + l + 10, 10, 10);
//for cars in the right lane
  ellipse(x + 75, y - r - 5, 10, 10);
  ellipse(x + 105, y - r - 5, 10);
  ellipse(x + 75, y - r + 10, 10);
  ellipse(x + 105, y - r + 10, 10);
}

function carBody() {
//calling from the color list function to randomly fill the cars.
  fill(random(c));
//setting the body dimensions and initial placement of the cars.
  rect(x + 30, y + l, 25, 30, 5);
  rect(x + 90, y - r, 25, 30, 5);
}

function headlights() {
  fill("rgba(241,241,18,0.53)");
  noStroke();
  //right lane
  ellipse(x + 85, y - r - 15, 5);
  ellipse(x + 95, y - r - 15, 5);
  triangle(x + 85, y - r - 15, x + 93, y - r - 27, x + 77, y - r - 27);
  triangle(x + 95, y - r - 15, x + 103, y - r - 27, x + 87, y - r - 27);
  // left lane
  ellipse(x + 25, y + l + 15, 5);
  ellipse(x + 35, y + l + 15, 5);
  triangle(x + 25, y + l + 15, x + 33, y + l + 27, x + 17, y + l + 27);
  triangle(x + 35, y + l + 15, x + 43, y + l + 27, x + 27, y + l + 27);
}

function solidYellowLine() {
  strokeWeight(1);
  stroke("rgba(241,241,18,0.53)");
  line(x, height - height, x, height);
}

function brokenWhiteLines() {
  stroke("white");
  strokeWeight(2);
  line(x + 60, y - 20, x + 60, y - 40);
}

