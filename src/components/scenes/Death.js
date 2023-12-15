import { Scene, Color, Vector3 } from 'three';
import {
    DEATH_BANNER,
    NINJA_SPRITES,
    APPLE_SPRITES,
    ORANGE_SPRITES,
    GRAPE_SPRITES,
} from '../sprites';
import { Banner } from '../objects';

class Death extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        this.background = new Color(0x000000);

        const banner = new Banner(DEATH_BANNER);
        banner.position.set(0, -30, 0);

        this.add(banner);

        const scale = new Vector3(25, 25, 1);
        this.ninjaSprite = new Banner(
            NINJA_SPRITES[sceneManager.stage].front,
            scale
        );
        this.ninjaSprite.position.set(0, 0, 0);
        this.add(this.ninjaSprite);

        const splat1 = new Banner(APPLE_SPRITES.splatSprite, scale);
        splat1.position.set(0, -10, 1);
        this.add(splat1);

        const splat2 = new Banner(ORANGE_SPRITES.splatSprite, scale);
        splat2.position.set(-10, 10, 2);
        this.add(splat2);

        const splat3 = new Banner(GRAPE_SPRITES.splatSprite, scale);
        splat3.position.set(10, 10, 3);
        this.add(splat3);

        this.sceneManager = sceneManager;
        // event handler
        this.keyDown = (event) => {
            if (event.key === 'Enter') {
                sceneManager.startOver();
            }
        };
    }

    updateStage() {
        this.remove(this.ninjaSprite);
        const scale = new Vector3(25, 25, 1);
        this.ninjaSprite = new Banner(
            NINJA_SPRITES[this.sceneManager.stage].front,
            scale
        );
        this.ninjaSprite.position.set(0, 0, 0);
        this.add(this.ninjaSprite);
    }

    addEvents() {
        window.addEventListener('keydown', this.keyDown, false);
    }

    removeEvents() {
        window.removeEventListener('keydown', this.keyDown, false);
    }
}

export default Death;
