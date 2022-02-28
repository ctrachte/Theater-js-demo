import * as core from "@theatre/core"
import studio from "@theatre/studio"

// initialize the studio so the editing tools will show up on the screen
studio.initialize()
// init project
const demoProject = core.getProject('Demo Project');
// create scene, sheets are a collection of objects that can be animated together, compared to an Excel Sheet
const sheet = demoProject.sheet("Scene")
// create an object 
const object = sheet.object('Box', {
    position: {
        x:0, // props are arbritrary until they are made significant by the user
        y:0,
        z:0
    },

})

