import Game from './Game.js';
import { WebGLRenderer, OrthographicCamera, Vector3 } from 'three';
import { SeedScene } from 'scenes';
import { WORDS, SPEEDS } from 'defines';

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

        this.stage = 0;
        // debugging for now
        let wordList = WORDS[this.stage];
        let speedRange = SPEEDS[this.stage];
        this.currentScene = new Game(3, wordList, speedRange, this.stage);
        this.game = this.currentScene;
    }

    // debugging code for now
    debuggingKeyDown(event) {
        if (event.key === 'Control') {
            this.game.addFruit();
        } else if (event.key === 'Enter') {
            console.log(this.game.state);
        } else {
            this.game && this.game.acceptLetter(event.key.toLowerCase());
        }
    }

    // renders and updates the current scene
    runScene(time) {
        this.renderer.render(this.currentScene, this.camera);

        this.currentScene.update(time);

        if (this.game.lives == 0) {
            console.log('game over');
        }
    }
}

const instance = new SceneManager();

export default instance;
