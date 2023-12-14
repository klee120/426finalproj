import { Scene, Color } from 'three';

class End extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        // Camera
        this.camera = sceneManager.camera;

        this.background = new Color(0xbaf8ba);

        // event handler
        this.keyDown = (event) => {
            if (event.key === 'Enter') {
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

export default End;
