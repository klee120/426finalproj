import Game from './Game.js';
import { WebGLRenderer, OrthographicCamera, Vector3 } from 'three';
import { STAGE_CONFIGS } from 'defines';

class SceneManager {
    /**
     * Creates a new scene manager
     */
    constructor() {
        this.renderer = undefined;
        this.camera = undefined;
        this.currentScene = undefined;
        this.stage = undefined;

        // this will replace currentScene as soon as I figure out the camera
        this.game = undefined;
    }

    init() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.camera = new OrthographicCamera();

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.near = 1;
        this.camera.far = 100;

        this.stage = 2;
        this.game = new Game(
            STAGE_CONFIGS[this.stage],
            this.stage,
            this.camera
        );
    }

    // debugging code for now
    keyDown(event, debug) {
        if (debug && event.key === 'Control') {
            this.game.addFruit();
        } else if (debug && event.key === 'Enter') {
            console.log(this.game);
        } else if (event.key.length == 1) {
            this.game && this.game.acceptLetter(event.key.toLowerCase());
        }
    }

    // renders and updates the current scene
    runScene(time) {
        this.renderer.render(this.game, this.camera);

        this.game.update(time);

        if (this.game.lives <= 0) {
            console.log('game over');
        }
    }
}

const instance = new SceneManager();

export default instance;
