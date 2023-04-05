//Ideas:
//maybe grab wiki image from relevant wikipedia page or tags
//make it so that after 10 times running the div creation function a big black div covers whole screen with a smaller div in the center to try again

// To get a API key
const API_KEY = "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";
const url = "https://api.openai.com/v1/completions";
let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
let myButton,
  myButtons2,
  adjInput,
  industryInput,
  topicInput,
  roleInput,
  myOutput;
let topText = 180;
let myOutputText = "";
let companies = [
  "Facebook",
  "Google",
  "Snapchat",
  "Wendy's",
  "Walmart",
  "Instagram",
  "Twitter",
  "McDonald's",
  "Taco Bell",
  "Uniqlo",
  "Old Spice",
  "Verizon",
];
let myOutputDivs = [];
let myOutputDivCount = 0;
let childDiv;

function setup() {
  noCanvas();
  background(200);

  const buttonWidth = windowWidth / 4;
  const buttonHeight = 40;
  const inputWidth = windowWidth / 2;
  const inputHeight = 30;

  myButton = createButton("Submit");
  myButton.position(windowWidth / 2 - buttonWidth / 2, topText + 340);
  myButton.mousePressed(getText);
  myButton.size(buttonWidth, buttonHeight);
  myButton.elt.style.fontSize = "20px";
  myButton.style("border-radius", "5px");
  myButton.style("background-color", "lightblue");
  myButton.style("border-color", "blue");
  myButton.style("border-width", "1px");
  myButton.style("box-shadow", "5px 5px 5px blue");

  q1 = createElement("p", "One word to describe you:");
  q1.position(windowWidth / 2 / 2, topText - 10);
  q1.size(windowWidth / 2);
  q1.class("added");

  adjInput = createInput("silly");
  adjInput.center();
  adjInput.position(windowWidth / 2 / 2, topText + 40);
  adjInput.size(inputWidth, inputHeight);
  adjInput.style("font-size", "20px");
  adjInput.class("added");
  adjInput.style("border-radius", "5px");
  adjInput.style("border-color", "blue");
  adjInput.style("border-width", "1px");

  q2 = createElement("p", "An industry you work in or admire:");
  q2.size(windowWidth / 2);
  q2.position(windowWidth / 2 / 2, topText + 70);
  q2.class("added");

  industryInput = createInput("education");
  industryInput.position(windowWidth / 2 / 2, topText + 120);
  industryInput.size(inputWidth, inputHeight);
  industryInput.style("font-size", "20px");
  industryInput.style("border-radius", "5px");
  industryInput.style("border-color", "blue");
  industryInput.style("border-width", "1px");

  q3 = createElement("p", "A topic you're into:");
  q3.size(windowWidth / 2);
  q3.position(windowWidth / 2 / 2, topText + 150);
  q3.class("added");

  topicInput = createInput("internet infrastructure");
  topicInput.position(windowWidth / 2 / 2, topText + 200);
  topicInput.size(inputWidth, inputHeight);
  topicInput.style("font-size", "20px");
  topicInput.style("border-radius", "5px");
  topicInput.style("border-color", "blue");
  topicInput.style("border-width", "1px");

  q4 = createElement("p", "Something you love:");
  q4.size(windowWidth / 2);
  q4.position(windowWidth / 2 / 2, topText + 230);
  q4.class("added");

  roleInput = createInput("music");
  roleInput.position(windowWidth / 2 / 2, topText + 280);
  roleInput.size(inputWidth, inputHeight);
  roleInput.style("font-size", "20px");
  roleInput.style("border-radius", "5px");
  roleInput.style("border-color", "blue");
  roleInput.style("border-width", "1px");

  myOutput = createElement("p", "");
  myOutput.position(windowWidth / 2 / 2, topText + 360);
  myOutput.size(windowWidth / 2);

  myOutputDiv = createElement("div", myOutputText);
  myOutputDiv.position(windowWidth / 2 / 2, topText + 400);

  // childDiv = createElement("div", "X");
}

function getText() {
  comp = random(companies);
  const adjInputValue = adjInput.value();
  console.log("myinput", adjInputValue);
  if (!adjInputValue || adjInputValue.length <= 0) {
    return;
  }
  const industryInputValue = industryInput.value();
  console.log("myinput", industryInput);
  if (!industryInput || industryInput.length <= 0) {
    return;
  }
  const topicInputValue = topicInput.value();
  console.log("myinput", topicInputValue);
  if (!topicInputValue || topicInputValue.length <= 0) {
    return;
  }
  const roleInputValue = roleInput.value();
  console.log("myinput", roleInputValue);
  if (!roleInputValue || roleInputValue.length <= 0) {
    return;
  }

  options.body = JSON.stringify({
    model: "text-davinci-003",
    prompt:
      "Write an" +
      adjInputValue +
      "ad that is less than 20 words long for a" +
      industryInputValue +
      "product about" +
      topicInputValue +
      "s run by " +
      comp +
      " aimed at" +
      roleInputValue +
      " lovers",
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  fetch(url, options)
    .then((response) => {
      console.log("response", response);
      const res = response.json();
      res.then((data) => {
        myOutputText = data.choices[0].text;

        let newDiv = createElement("div", myOutputText);
        newDiv.position(
          myOutputDiv.x,
          myOutputDiv.y + myOutputDivCount * myOutputDiv.height
        );
        newDiv.style("background-color", "#f2f2f2");
        newDiv.style("padding", "10px");
        newDiv.style("border-style", "solid");
        newDiv.style("border-width", "3px");
        newDiv.style("border-radius", "15px");
        newDiv.style("border-color", "red");
        newDiv.style("z-index", "2");
        newDiv.style("padding", "20px");
        newDiv.position(
          random(0, windowWidth - windowWidth / 2.6),
          random(0, windowHeight - 303)
        );
        newDiv.class("nd");
  childDiv = createElement("div", "X");

        childDiv.parent(newDiv);
        childDiv.style("border-top-right-radius", "5px");
        childDiv.style("border-bottom-left-radius", "6px");
        childDiv.style("background-color", "red");
        childDiv.style("position", "absolute");
        childDiv.style("top", "0");
        childDiv.style("right", "0");
        childDiv.size(30);
        childDiv.style("z-index", "1");
        childDiv.mousePressed(getText);

        myOutputDivCount++;
        myOutputDivs.push(newDiv);
      });
    })
    .catch((err) => console.log(err));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Credits
//https://platform.openai.com/examples/default-ad-product-description
//https://editor.p5js.org/yining/sketches/cnlmIOoL9
