import Game from '../scenes/Game.js';
import { WebGLRenderer, OrthographicCamera, Vector3 } from 'three';
import { STAGE_CONFIGS } from 'defines';
import End from '../scenes/End.js';
import Death from '../scenes/Death.js';
import Start from '../scenes/Start.js';
import { AudioManager } from './index.js';

class SceneManager {
    /**
     * Creates a SceneManager object
     */
    constructor() {
        this.renderer = undefined;
        this.camera = undefined;
        this.currentScene = undefined;
        this.stage = undefined;

        // this will replace currentScene as soon as I figure out the camera
        this.game = undefined;
        this.document = document;
    }

    /**
     * Initializes properties
     */
    init() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.camera = new OrthographicCamera();

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.near = 1;
        this.camera.far = 100;

        this.stage = 0;
        this.game = undefined;

        this.start = new Start(this);
        this.end = new End(this);
        this.death = new Death(this);

        this.currentScene = this.start;
        this.currentScene.addEvents();
    }

    /**
     * Renders and updates the current scene
     * @param {number} time - The time elapsed in the game in seconds
     */
    runScene(time) {
        this.renderer.render(this.currentScene, this.camera);

        // update if relevant
        this.currentScene.update && this.currentScene.update(time);

        if (this.game) {
            if (this.game.lives <= 0) {
                this.currentScene.removeEvents();
                this.currentScene = this.death;
                AudioManager.switchBackgroundMusic(true);
                this.death.updateStage();
                this.currentScene.addEvents();
                this.game = undefined;
            } else if (this.game.isCleared) {
                this.levelUp();
            } else if (this.game.metPointRequirement()) {
                this.game.clear();
            }
        }
    }

    /**
     * Deals with level ups within game and changes scenes
     */
    levelUp() {
        if (this.stage === STAGE_CONFIGS.length - 1) {
            this.currentScene.removeEvents();
            this.game = undefined;
            this.currentScene = this.end;
            AudioManager.switchBackgroundMusic(false);
            this.currentScene.addEvents();
            return;
        }
        this.stage += 1;

        this.game = new Game(
            STAGE_CONFIGS[this.stage],
            this.stage,
            this.camera
        );
        this.currentScene = this.game;
        this.currentScene.addEvents();
    }

    /**
     * Resets the game to the start 
     */
    startOver() {
        this.currentScene.removeEvents();
        this.currentScene = this.start;
        this.currentScene.addEvents();
    }

    /**
     * Starts the game from stage 0
     */
    startGames() {
        this.currentScene.removeEvents();

        this.stage = 0;

        this.game = new Game(
            STAGE_CONFIGS[this.stage],
            this.stage,
            this.camera
        );

        this.currentScene = this.game;
        this.currentScene.addEvents();
    }
}

const instance = new SceneManager();

export default instance;
