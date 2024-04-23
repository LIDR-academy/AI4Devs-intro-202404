// src/index.js
import * as BABYLON from 'babylonjs';
import { initMainMenu } from './mainMenu';

// Create the Babylon.js canvas and engine
const canvas = document.getElementById("gameCanvas");
const engine = new BABYLON.Engine(canvas, true);

// Basic scene setup
function createScene() {
    const scene = new BABYLON.Scene(engine);

    // Simple camera and lighting setup
    const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // Return the created scene
    return scene;
}

const scene = createScene();
initMainMenu(scene);  // Initialize the main menu

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Resize handling
window.addEventListener("resize", () => {
    engine.resize();
});
