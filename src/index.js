import * as core from "@theatre/core";
import studio from "@theatre/studio";

// initialize the studio so the editing tools will show up on the screen
studio.initialize();
// init project
const demoProject = core.getProject("Demo Project");
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

setTimeout(() => {
  document.body.appendChild(div);
  sheet.sequence.position = 0; // set sequence to a time-based position (0.5 seconds)
}, 1000);

// hookup props to onChange
object.onValuesChange((newValues) => {
  div.style.left = newValues.position.x + "px";
  div.style.top = newValues.position.y + "px";
  div.style.zIndex = newValues.position.z + "px";
  console.table(object.value);
});

// interaction with UI

div.addEventListener("click", (e) => {
  sheet.sequence.play({
    rate: 4, // play at 4x speed
    range: [0, 6], // how much of the sequence? 0-5 seconds
    iterationCount: 1, // how many times? 4 times.
  });
});
