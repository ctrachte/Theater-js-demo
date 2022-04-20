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
let ParticleSource = "";
let particlePosition = "";
let ParticleElements = [];
const button = document.createElement("div");
button.innerHTML = "Generate Particles";
button.style.cssText = `
position: absolute;
width: 100;
height: 100;
left: 50%;
top: 50%;
background: #EEE;
border-radius: 50%;
color: black;
z-index: 9999;
text-align: center;
margin-left: auto;
margin-right: auto;
display: flex;
align-items: center `;
button.onclick = () => {
  ParticleElements.forEach(function (particle) {
    particle.style.left = 980;
    particle.style.top = 540;
  });
  sheet.sequence.play({
    rate: 4, // play at 4x speed
    range: [0, 6], // how much of the sequence? 0-6 seconds
    iterationCount: 1, // how many times?
  });
};
function LoadParticles(particles, scene) {
  particlePosition = "";
  ParticleElements = [];
  ParticleSource = sheet.object("particle", {
    position: {
      x: button.getBoundingClientRect().left, // props are arbritrary until they are made significant by the user
      y: button.getBoundingClientRect().top,
      z: 500,
      r: 2,
    },
  });
  particlePosition = ParticleSource.value.position;
  const keyParticle = document.createElement("div");
  keyParticle.style = `
    position: absolute;
    width: 10px;
    height: 10px;
    left: 980;
    top: 540;
    background: #EEE;
    border-radius: 50%;
  `;
  setTimeout(() => {
    // add div 'box' to screen
    document.body.appendChild(keyParticle);
  }, 1000);
  for (let i = 0; i < particles; i++) {
    // read values through code
    let particleElement = document.createElement("div");
    particleElement.style = `
      position: absolute;
      width: 2px;
      height: 2px;
      left: 980;
      top: 540;
      background: #EEE;
      border-radius: 50%;
    `;
    particleElement.radius = 5;
    particleElement.oldHeight = 10;
    particleElement.oldWidth = 10;
    ParticleElements[i] = particleElement;
    ParticleElements[i].vectorX =  randomIntFromInterval(-50, 50);
    ParticleElements[i].vectorY =  randomIntFromInterval(-50, 50);
    setTimeout(() => {
      // add div 'box' to screen
      document.body.appendChild(particleElement);
    }, 1000);
  }
  ParticleSource.onValuesChange((newValues) => {
    animate(newValues, keyParticle, ParticleSource);
    Explode(1);
  });
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function Explode(speedMultiplier) {
  ParticleElements.forEach(function (particle) {
    //move in X direction
    particle.style.left =
    parseFloat(particle.style.left) + particle.vectorX * speedMultiplier;
    //move in Y direction
    particle.style.top =
    parseFloat(particle.style.top) + particle.vectorY * speedMultiplier;
  });
}

//Fire away!
setTimeout(() => {
  document.body.appendChild(button);
  LoadParticles(1000, sheet);
}, 1000);
