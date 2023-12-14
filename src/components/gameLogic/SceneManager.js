import Game from './Game.js';
import { WebGLRenderer, OrthographicCamera, Vector3 } from 'three';
import { WORDS, SPEEDS } from 'defines';
import * as pages from './pages.js';
import End from '../pages/end.js';
import Start from '../pages/Start.js';

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
        this.document = document;
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
        // let wordList = WORDS[this.stage];

        // this.currentScene = new Game(
        //     3,
        //     wordList,
        //     speedRange,
        //     this.stage,
        //     this.camera
        // );
        // this.game = this.currentScene;

        this.game = null;

        this.start = new Start();
        this.currentScene = this.start;
        this.currentScene.addEvents();
        // this.scenes['start'] = new Start();
        this.end = new End();
    }

    // // debugging code for now
    // debuggingKeyDown(event) {
    //     if (event.key === 'Control') {
    //         this.game.addFruit();
    //     } else if (event.key === 'Enter') {
    //         console.log(this.game);
    //     } else {
    //         this.game && this.game.acceptLetter(event.key.toLowerCase());
    //     }
    // }

    // renders and updates the current scene
    runScene(time) {
        this.renderer.render(this.currentScene, this.camera);

        if (this.game !== null) {
            this.currentScene.update(time);
            if (this.game.lives <= 0) {
                console.log('level over.');
                // pages.end_game(document, this.game.points);
                this.currentScene.removeEvents();
                this.currentScene = this.end;
                this.game = null;
                // this.currentScene.addEvents();
            }
            if (this.game.points > 10) {
                this.levelUp();
            }
        }
    }

    // for level ups
    levelUp() {
        if (this.stage === 2) {
            this.currentScene.removeEvents();
            this.currentScene = this.end;
            this.currentScene.addEvents();
            console.log('game over');
            return;
        }
        this.stage += 1;
        console.log('level up! stage', this.stage);
        let wordList = WORDS[this.stage];
        let speedRange = SPEEDS[this.stage];
        this.game = new Game(3, wordList, speedRange, this.stage, this.camera);
        this.currentScene = this.game;
        this.currentScene.addEvents();
    }

    startGame() {
        this.currentScene.removeEvents();
        let wordList = WORDS[this.stage];
        let speedRange = SPEEDS[this.stage];

        if ((this.currentScene = this.end)) {
            this.stage = 0;
        }
        this.game = new Game(3, wordList, speedRange, this.stage, this.camera);
        this.currentScene = this.game;
        // this.stage += 1;
        this.currentScene.addEvents();
    }
}

const instance = new SceneManager();

export default instance;
