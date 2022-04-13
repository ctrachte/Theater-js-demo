import * as core from "@theatre/core";
import state from "../state.json";
import studio from "@theatre/studio";
// initialize the studio so the editing tools will show up on the screen
// parcel.js knows and assigns NODE_ENV, tree-shaking occurs automatically
if (process.env.NODE_ENV === "development") {
  studio.initialize();
}

// init project
const demoProject = core.getProject("Demo Project", { state });
// create scene, sheets are a collection of objects that can be animated together, compared to an Excel Sheet
const sheet = demoProject.sheet("Scene");

// create an object
const box = sheet.object("Box", {
  position: {
    x: 0, // props are arbritrary until they are made significant by the user
    y: 0,
    z: 0,
  },
});
const circle = sheet.object("Circle", {
    position: {
      x: 0, // props are arbritrary until they are made significant by the user
      y: 0,
      z: 0,
      r: 50
    },
  });

// read values through code
const divBox = document.createElement("div");
divBox.style.cssText = `
    position: absolute;
    width: 100px;
    height: 100px;
    background: #EEE;
`;
divBox.oldHeight = 100;
divBox.oldWidth = 100;
// read values through code
const divCircle = document.createElement("div");
divCircle.style.cssText = `
    position: absolute;
    width: 100px;
    height: 100px;
    background: #EEE;
    border-radius: 50%;
`;
divCircle.oldHeight = 100;
divCircle.oldWidth = 100;
divCircle.radius = 50;

setTimeout(() => {
  // add div 'box' to screen
  document.body.appendChild(divCircle);
  document.body.appendChild(divBox);
  sheet.sequence.position = 0; // set sequence to a time-based position (0.5 seconds)
}, 1000);

let oldBoxPosition = box.value.position;
let oldCirclePosition = circle.value.position;

// hookup props to onChange
box.onValuesChange((newValues) => {
  divBox.style.left = newValues.position.x + "px";
  divBox.style.top = newValues.position.y + "px";
  let old = oldBoxPosition.z;
  let change = Math.abs(old) - Math.abs(newValues.position.z);
  // console.log(old, newValues.position.z, change)
  // console.table("before", newValues.position.z, divBox.style.zIndex);
  if (change > 0) {
    divBox.style.height =
      parseFloat(divBox.style.height) +
      parseFloat(Math.abs(change) * parseFloat(divBox.oldHeight)) +
      "px";
    divBox.style.width =
      parseFloat(divBox.style.width) +
      parseFloat(Math.abs(change) * parseFloat(divBox.oldWidth)) +
      "px";
  } else if (change < 0) {
    divBox.style.height =
      parseFloat(divBox.style.height) -
      parseFloat(Math.abs(change) * parseFloat(divBox.oldHeight)) +
      "px";
    divBox.style.width =
      parseFloat(divBox.style.width) -
      parseFloat(Math.abs(change) * parseFloat(divBox.oldWidth)) +
      "px";
  } else {
    console.log("same z index onchange");
  }
  oldBoxPosition = newValues.position;
});
// hookup props to onChange
circle.onValuesChange((newValues) => {
    divCircle.style.left = newValues.position.x + "px";
    divCircle.style.top = newValues.position.y + "px";
    divCircle.style.borderRadius = newValues.position.r + "px"
    let old = oldCirclePosition.z;
    let change = Math.abs(old) - Math.abs(newValues.position.z);
    // console.log(old, newValues.position.z, change)
    // console.table("before", newValues.position.z, divBox.style.zIndex);
    if (change > 0) {
        divCircle.style.height =
        parseFloat(divCircle.style.height) +
        parseFloat(Math.abs(change) * parseFloat(divCircle.oldHeight)) +
        "px";
      divCircle.style.width =
        parseFloat(divCircle.style.width) +
        parseFloat(Math.abs(change) * parseFloat(divCircle.oldWidth)) +
        "px";
    } else if (change < 0) {
      divCircle.style.height =
        parseFloat(divCircle.style.height) -
        parseFloat(Math.abs(change) * parseFloat(divCircle.oldHeight)) +
        "px";
      divCircle.style.width =
        parseFloat(divCircle.style.width) -
        parseFloat(Math.abs(change) * parseFloat(divCircle.oldWidth)) +
        "px";
    } else {
      console.log("same z index onchange");
    }
    oldCirclePosition = newValues.position;
});

// interaction with UI
divBox.addEventListener("mouseenter", (e) => {
  sheet.sequence.play({
    rate: 4, // play at 4x speed
    range: [0, 6], // how much of the sequence? 0-6 seconds
    iterationCount: 1, // how many times?
  });
});

// interaction with UI
divCircle.addEventListener("mouseenter", (e) => {
    sheet.sequence.play({
      rate: 4, // play at 4x speed
      range: [0, 6], // how much of the sequence? 0-6 seconds
      iterationCount: 1, // how many times?
    });
  });
