//built on top of: https://editor.p5js.org/AndreasRef/sketches/BJkaHBMYm

let featureExtractor;
let classifier;
let video;
let loss;
let train1 = 0;
let train2 = 0;
let classificationResult;
let confidence = 0;
let itemA, itemB, train;
let buttonA, buttonB;
let randoItemA, randoItemB;
let num1 = 0;
let num2 = 0;
let counting = false;
let items = [
  "friendship",
  "care",
  "fun",
  "fear",
  "joy",
  "pain",
  "safety",
  "effort",
  "intellect",
  "insight",
];
let intro = true;
let simmering = false;
let ready = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //cnv.position(0, 0, 'fixed');
  video = createCapture(VIDEO);
  video.hide();
  textAlign(CENTER);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);

  // Create a new classifier using those features and give the video we want to use
  const options = { numLabels: 2 }; //Specify the number of classes/labels
  classifier = featureExtractor.classification(video, options);

  randoItemA = random(items);
  randoItemB = random(items);

  // Set up the UI buttons
  setupButtons();
  textAlign(CENTER);
  textSize(34);
  //textWrap(WORD);
  fill("white");
  stroke("green");
  introB = createButton("Sure I'll Help");
  introB.hide();
  introB.center();
  introB.position(width / 2 - 25, height / 1.3);
  introB.mousePressed(showButtons);
}

function draw() {
  background("black");
  imageMode(CENTER);
  image(video, width / 2, height / 2);
  textAlign(CENTER);
  if (counting) {
    text(
      "I now have " + num1 + " images of " + randoItemA + " in my mind!",
      width / 2,
      height - height / 1.2
    );
    text(
      "and " + num2 + " images of " + randoItemB + " in my mind! ",
      width / 2 + 20,
      height - height / 1.2 + 50
    );
  }
  if (intro) {
    text(
      "Hi I'm Rue, a recently re-spawned energy form lookin to learn about the concepts of this earth.\n Any chance you can show me what some concepts appear like to you?",
      width / 2,
      height - height / 1.2
    );
  }
  if(simmering){
            text('Ok let me let all this simmer', width / 2, height - height / 1.2);

  } else if(ready){
            text('Alright go it, put me to the test', width / 2, height - height / 1.2);
  }
}

// A function to be called when the model has been loaded
function modelReady() {
  introB.show();
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
  ready = false;
  buttonPredict.hide();
  startOver = createButton("Teach me more!");
  startOver.center();
  startOver.position(width / 2 - 25, height / 1.2 + 50);
  startOver.mousePressed(reload);
}

function reload() {
  location.reload();
}

// A util function to create UI buttons
function setupButtons() {
  itemA = randoItemA;
  itemB = randoItemB;

  // When the A button is pressed, add the current frame
  // from the video with a label of "A" to the classifier
  buttonA = createButton(itemA);
  buttonA.hide();
  buttonA.position(width / 2 - 30, height / 1.2);
  buttonA.mousePressed(function () {
    classifier.addImage(randoItemA);
    if (train1++ > 0) {
      counting = true;
      num1 = train1++;
    }
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "B" to the classifier
  buttonB = createButton(itemB);
  buttonB.hide();
  buttonB.position(width / 2 + 30, height / 1.2);
  buttonB.mousePressed(function () {
    classifier.addImage(randoItemB);
    if (train2++ > 0) {
      counting = true;
      num2 = train2++;
    }
  });

  // Train Button
  train = createButton("All done teaching me?");
  train.hide();
  // train.style('background-color', blue);
  train.center();
  train.position(width / 2 - 50, height / 1.2 + 50);
  train.mousePressed(function () {
    classifier.train(function (lossValue) {
      if (lossValue) {
        loss = lossValue;
        buttonA.hide();
        counting = false;
        simmering = true;
        buttonB.hide();
        train.hide();
      } else {
        ready = true;
        simmering = false;
        // Predict Button
        buttonPredict = createButton("Put me to the test!");
        buttonPredict.show();
        buttonPredict.center();
        buttonPredict.position(width / 2, height / 1.2 + 50);
        buttonPredict.mousePressed(classify);
      }
    });
  });
}

function showButtons() {
  buttonA.show();
  buttonB.show();
  train.show();
  introB.hide();
  intro = false;
}
// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  classificationResult = result[0].label;
  confidence = result[0].confidence * 100;
  textAlign(CENTER);
  text("Alright, so I'm like " + confidence + " percent sure this is " + result[0].label + " right?", width / 2, height - height / 1.2);


  classify();
}
