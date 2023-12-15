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
import { AudioManager } from '../managers';

const ALL_FRUITS = [
    APPLE_SPRITES,
    LEMON_SPRITES,
    STRAW_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    WATERMELON_SPRITES,
    GRAPE_SPRITES,
];

const ROTATION_PERIOD = 10;
const NINJA_RADIUS = 20;
const FRUIT_RADIUS = 70;

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
        this.fruitBanners = [];
        for (let i = 0; i < ALL_FRUITS.length; i++) {
            const angle = (Math.PI * 2 * i) / ALL_FRUITS.length;
            const fruitBanner = new Banner(ALL_FRUITS[i].normalSprite, scale);
            this.add(fruitBanner);
            this.fruitBanners.push(fruitBanner);
        }
        this.update(performance.now() / 1000);

        const ninjas = NINJA_SPRITES.map((value) => value);
        ninjas.push(HELPER_NINJA_SPRITES);
        const offset = new Vector3(0, -10, 0);
        for (let i = 0; i < ninjas.length; i++) {
            const angle = (Math.PI * 2 * i) / ninjas.length;
            const ninjaBaner = new Banner(ninjas[i].front, scale);
            ninjaBaner.position.copy(
                getPosition(angle, NINJA_RADIUS).add(offset)
            );
            this.add(ninjaBaner);
        }

        // event handler
        this.keyDown = (event) => {
            if (event.key === 'Enter') {
                AudioManager.normalBackgroundMusic(false);
                sceneManager.startOver();
            }
        };
    }

    update(time) {
        const time_offset = time % ROTATION_PERIOD;
        const angle_offset = (Math.PI * 2 * time_offset) / ROTATION_PERIOD;

        for (let i = 0; i < this.fruitBanners.length; i++) {
            let angle = (Math.PI * 2 * i) / ALL_FRUITS.length;
            angle += angle_offset;
            this.fruitBanners[i].position.copy(
                getPosition(angle, FRUIT_RADIUS)
            );
        }
    }

    addEvents() {
        window.addEventListener('keydown', this.keyDown, false);
    }

    removeEvents() {
        window.removeEventListener('keydown', this.keyDown, false);
    }
}

export default End;
