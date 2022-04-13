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

// // create an object
// const box = sheet.object("Box", {
//   position: {
//     x: 0, // props are arbritrary until they are made significant by the user
//     y: 0,
//     z: 0,
//   },
// });
// const circle = sheet.object("Circle", {
//   position: {
//     x: 0, // props are arbritrary until they are made significant by the user
//     y: 0,
//     z: 0,
//     r: 50,
//   },
// });

// // read values through code
// const divBox = document.createElement("div");
// divBox.style.cssText = `
//     position: absolute;
//     width: 100px;
//     height: 100px;
//     background: #EEE;
// `;
// divBox.oldHeight = 100;
// divBox.oldWidth = 100;
// // read values through code
// const divCircle = document.createElement("div");
// divCircle.style.cssText = `
//     position: absolute;
//     width: 100px;
//     height: 100px;
//     background: #EEE;
//     border-radius: 50%;
// `;
// divCircle.oldHeight = 100;
// divCircle.oldWidth = 100;
// divCircle.radius = 50;

// // interaction with UI
// divBox.addEventListener("mouseenter", (e) => {
//   sheet.sequence.play({
//     rate: 4, // play at 4x speed
//     range: [0, 6], // how much of the sequence? 0-6 seconds
//     iterationCount: 1, // how many times?
//   });
// });

// // interaction with UI
// divCircle.addEventListener("mouseenter", (e) => {
//   sheet.sequence.play({
//     rate: 4, // play at 4x speed
//     range: [0, 6], // how much of the sequence? 0-6 seconds
//     iterationCount: 1, // how many times?
//   });
// });

// setTimeout(() => {
//   // add div 'box' to screen
//   document.body.appendChild(divCircle);
//   document.body.appendChild(divBox);
//   sheet.sequence.position = 0; // set sequence to a time-based position (0.5 seconds)
// }, 1000);

// let oldBoxPosition = box.value.position;
// let oldCirclePosition = circle.value.position;

// // hookup props to onChange
// box.onValuesChange((newValues) => {
//   animate(newValues, divBox, oldBoxPosition);
// });
// // hookup props to onChange
// circle.onValuesChange((newValues) => {
//   animate(newValues, divCircle, oldCirclePosition);
// });

function animate(newValues, element, oldPosition) {
  element.style.left = newValues.position.x + "px";
  element.style.top = newValues.position.y + "px";
  element.style.borderRadius = newValues.position.r + "px";
  let old = oldPosition.z;
  let change = Math.abs(old) - Math.abs(newValues.position.z);
  // console.log(old, newValues.position.z, change)
  // console.table("before", newValues.position.z, divBox.style.zIndex);
  if (change > 0) {
    element.style.height =
      parseFloat(element.style.height) +
      parseFloat(Math.abs(change) * parseFloat(element.oldHeight)) +
      "px";
    element.style.width =
      parseFloat(element.style.width) +
      parseFloat(Math.abs(change) * parseFloat(element.oldWidth)) +
      "px";
  } else if (change < 0) {
    element.style.height =
      parseFloat(element.style.height) -
      parseFloat(Math.abs(change) * parseFloat(element.oldHeight)) +
      "px";
    element.style.width =
      parseFloat(element.style.width) -
      parseFloat(Math.abs(change) * parseFloat(element.oldWidth)) +
      "px";
  } else {
    console.log("same z index onchange");
  }
  oldPosition = newValues.position;
}

// Particle Generator:
let particlePositions = [];
const button = document.createElement("div");
button.style.cssText = `
position: absolute;
width: 100;
height: 100;
left: 50%;
top: 50%;
background: #EEE;
border-radius: 50%;
color: #fff;
`;
button.onclick = () => {
  console.log(sheet.sequence);
  sheet.sequence.play({
    rate: 4, // play at 4x speed
    range: [0, 6], // how much of the sequence? 0-6 seconds
    iterationCount: 1, // how many times?
  });
};
function LoadParticles(particles, scene) {
  for (let i = 0; i < particles; i++) {
    const Particle = sheet.object("particle" + i, {
      position: {
        x: button.getBoundingClientRect().left, // props are arbritrary until they are made significant by the user
        y: button.getBoundingClientRect().top,
        z: 500,
        r: 5,
      },
    });
    console.log(button.style.top);
    // read values through code
    const particleElement = document.createElement("div");
    particleElement.style = `
    position: absolute;
    width: 10px;
    height: 10px;
    left:  50%;
    top: 50%;
    background: #EEE;
    border-radius: 50%;
  `;
    particleElement.radius = 5;
    particleElement.oldHeight = 10;
    particleElement.oldWidth = 10;

    setTimeout(() => {
      // add div 'box' to screen
      document.body.appendChild(particleElement);
      sheet.sequence.position = 0; // set sequence to a time-based position (0.5 seconds)
    }, 1000);

    particlePositions[i] = Particle.value.position;
    // listen for changes and animate the particle.
    Particle.onValuesChange((newValues) => {
      animate(newValues, particleElement, particlePositions[i]);
    });
  }
}
setTimeout(() => {
  document.body.appendChild(button);
  LoadParticles(100, sheet);
}, 1000);
