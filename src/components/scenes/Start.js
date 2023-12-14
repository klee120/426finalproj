import { Scene, Vector3, OrthographicCamera, Color } from 'three';

class Start extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        // Camera
        this.camera = new OrthographicCamera();

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.near = 1;
        this.camera.far = 100;

        // TODO: Add things (perhaps an image sprite with drawn text)
        this.background = new Color(0xc2baf8);

        // event handler
        this.keyDown = (event) => {
            if (event.key === ' ' || event.code === 'Space') {
                sceneManager.startOver();
            }
        };
    }

    addEvents() {
        window.addEventListener('keydown', this.keyDown, false);
    }

    removeEvents() {
        window.removeEventListener('keydown', this.keyDown, false);
    }
}

export default Start;
