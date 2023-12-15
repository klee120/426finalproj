import { Scene, Color, Vector3 } from 'three';
import {
    END_BANNER,
    APPLE_SPRITES,
    STRAW_SPRITES,
    LEMON_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    GRAPE_SPRITES,
    WATERMELON_SPRITES,
    NINJA_SPRITES,
    HELPER_NINJA_SPRITES,
} from 'sprites';
import { Banner } from '../objects';

const ALL_FRUITS = [
    APPLE_SPRITES,
    STRAW_SPRITES,
    LEMON_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    GRAPE_SPRITES,
    WATERMELON_SPRITES,
];

function getPosition(angle, radius) {
    return new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0);
}

class End extends Scene {
    constructor(sceneManager) {
        // Call parent Scene() constructor
        super();

        this.background = new Color(0xbaf8ba);

        const endBanner = new Banner(END_BANNER);
        endBanner.position.set(0, 35, 0);

        this.add(endBanner);

        const scale = new Vector3(25, 25, 1);
        let radius = 70;
        for (let i = 0; i < ALL_FRUITS.length; i++) {
            const angle = (Math.PI * 2 * i) / ALL_FRUITS.length;
            const fruitBanner = new Banner(ALL_FRUITS[i].normalSprite, scale);
            fruitBanner.position.copy(getPosition(angle, radius));
            this.add(fruitBanner);
        }

        const ninjas = NINJA_SPRITES.map((value) => value);
        ninjas.push(HELPER_NINJA_SPRITES);
        const offset = new Vector3(0, -10, 0);
        radius = 20;
        for (let i = 0; i < ninjas.length; i++) {
            const angle = (Math.PI * 2 * i) / ninjas.length;
            const ninjaBaner = new Banner(ninjas[i].front, scale);
            ninjaBaner.position.copy(getPosition(angle, radius).add(offset));
            this.add(ninjaBaner);
        }

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
