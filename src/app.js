/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
// Reference: https://stackoverflow.com/questions/45995136/export-default-was-not-found
import { SceneManager, AudioManager } from 'managers';

// Initialize scene manager
SceneManager.init();
AudioManager.init();

// Set up renderer, canvas, and minor CSS adjustments
SceneManager.renderer.setPixelRatio(window.devicePixelRatio);
const canvas = SceneManager.renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// document.body.style.backgroundImage = Dojo;

// Render loop
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
const onAnimationFrameHandler = (timeStamp) => {
    // divide by 1000 to get seconds
    SceneManager.runScene(timeStamp / 1000);
    AudioManager.update(timeStamp / 1000);

    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;

    // make the smaller side length 100 in both directions
    const widthRatio = 200 / innerWidth;
    const heightRatio = 200 / innerHeight;
    const ratio = Math.max(widthRatio, heightRatio);

    const newWidth = innerWidth * ratio;
    const newHeight = innerHeight * ratio;

    SceneManager.renderer.setSize(innerWidth, innerHeight);
    SceneManager.camera.left = -newWidth / 2;
    SceneManager.camera.right = newWidth / 2;
    SceneManager.camera.bottom = -newHeight / 2;
    SceneManager.camera.top = newHeight / 2;

    SceneManager.camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
