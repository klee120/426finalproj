import { Scene, Color } from 'three';
import { DEATH_BANNER } from '../sprites';
import { Banner } from '../objects';

class Death extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        this.background = new Color(0x000000);

        const banner = new Banner(DEATH_BANNER);
        banner.position.set(0, 10, 0);

        this.add(banner);

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

export default Death;
