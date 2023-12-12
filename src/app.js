/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
// Reference: https://stackoverflow.com/questions/45995136/export-default-was-not-found
import { SceneManager } from 'gameLogic';

// Initialize scene manager
SceneManager.init();

// Set up renderer, canvas, and minor CSS adjustments
SceneManager.renderer.setPixelRatio(window.devicePixelRatio);
const canvas = SceneManager.renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Render loop
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
const onAnimationFrameHandler = (timeStamp) => {
    SceneManager.runScene(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    SceneManager.renderer.setSize(innerWidth, innerHeight);
    SceneManager.camera.aspect = innerWidth / innerHeight;
    SceneManager.camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// Add game state

// for now, debugging
window.addEventListener(
    'keydown',
    (event) => SceneManager.debuggingKeyDown(event),
    false
);
