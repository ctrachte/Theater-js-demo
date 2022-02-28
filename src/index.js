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
const object = sheet.object("Box", {
  position: {
    x: 0, // props are arbritrary until they are made significant by the user
    y: 0,
    z: 0,
  },
});

// read values through code
const div = document.createElement("div");
div.style.cssText = `
    position: absolute;
    width: 100px;
    height: 100px;
    background: #EEE;
`;
div.oldHeight = 100;
div.oldWidth = 100;

setTimeout(() => {
  // add div 'box' to screen
  document.body.appendChild(div);
  sheet.sequence.position = 0; // set sequence to a time-based position (0.5 seconds)
}, 1000);

let oldPosition = object.value.position;
// hookup props to onChange
object.onValuesChange((newValues) => {
  div.style.left = newValues.position.x + "px";
  div.style.top = newValues.position.y + "px";
  let old = oldPosition.z;
  let change = Math.abs(old) - Math.abs(newValues.position.z);
  console.log(old, newValues.position.z, change)
  //console.table("before", newValues.position.z, div.style.zIndex);

  if (change > 0) {
    div.style.height =
        parseFloat(div.style.height) + parseFloat(Math.abs(change) * parseFloat(div.oldHeight)) + "px";
    div.style.width =
        parseFloat(div.style.width) +   parseFloat(Math.abs(change) * parseFloat(div.oldWidth)) + "px";
  } else if ( change < 0) {
    div.style.height =
        parseFloat(div.style.height) -  parseFloat(Math.abs(change) * parseFloat(div.oldHeight)) + "px";
    div.style.width =
        parseFloat(div.style.width) -  parseFloat(Math.abs(change) * parseFloat(div.oldWidth)) + "px";
  } else {
    console.log("same z index onchange");
  }
  oldPosition = newValues.position;
});

// interaction with UI
div.addEventListener("click", (e) => {
  sheet.sequence.play({
    rate: 4, // play at 4x speed
    range: [0, 6], // how much of the sequence? 0-6 seconds
    iterationCount: 1, // how many times? 
  });
});
