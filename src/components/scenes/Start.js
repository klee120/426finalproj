import { Scene, Vector3, OrthographicCamera, Color } from 'three';
import { START_BANNER } from '../sprites';
import { Banner } from '../objects';

class Start extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        this.background = new Color(0xc2baf8);

        const banner = new Banner(START_BANNER);
        banner.position.set(0, 10, 0);

        this.add(banner);

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
