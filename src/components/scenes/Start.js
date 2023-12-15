import { Scene, Vector3, OrthographicCamera, Color } from 'three';
import { TITLE_BANNER, START_BANNER, START_NINJA } from '../sprites';
import { Banner } from '../objects';

class Start extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        this.background = new Color(0xc2baf8);

        const startBanner = new Banner(START_BANNER);
        startBanner.position.set(0, -50, 0);
        this.add(startBanner);

        const scale = new Vector3(400, 400, 1);
        const titleBanner = new Banner(TITLE_BANNER, scale);
        titleBanner.position.set(0, 10, 0);
        this.add(titleBanner);

        scale.set(25, 25, 1);
        const ninjaSprite = new Banner(START_NINJA, scale);
        ninjaSprite.position.set(0, -15, 0);
        this.add(ninjaSprite);

        // event handler
        this.keyDown = (event) => {
            if (event.key === ' ' || event.code === 'Space') {
                sceneManager.startGames();
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
