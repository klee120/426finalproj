import { Fruit, pickRandomFruitType, Ninja } from 'objects';
import { Mesh, Vector3, MeshBasicMaterial, ShapeGeometry } from 'three';
import { Scene, Color } from 'three';
import { BasicLights } from 'lights';
import { OrthographicCamera } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { CourierFont } from 'fonts';

// https://www.educative.io/answers/how-to-generate-a-random-number-between-a-range-in-javascript
// generates a random number between min and max
function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

const SPLAT_DISPLAY_TIME = 1;

class Game extends Scene {
    /**
     * Creates a pixel color.
     * @param {GameConfig} config - The game configs
     * @param {number} stage - What stage this game is {0, 1, 2}
     * @param {OrthographicCamera} camera - The camera; used to know where to spawn fruits
     */
    constructor(config, stage, camera) {
        super();

        let lives = config.lives;
        // should not have negative lives
        if (lives == null || lives <= 0) {
            lives = 3;
        }

        this.points = 0;
        this.lives = lives;
        this.currentFruit = null;
        this.fruits = [];

        // keep track of splatted fruits so we can still display them
        this.splattedFruits = [];

        // keep track of starting letters to prevent words with the same first letter
        this.startingLetter = {};

        this.words = config.wordList;
        this.secondsBetweenRange = config.secondsBetweenRange;
        this.secondsAliveRange = config.secondsAliveRange;

        this.camera = camera;

        // Set background to a nice color
        this.background = config.background;

        // Add meshes to scene
        // const land = new Land();
        const lights = new BasicLights();
        const ninja = new Ninja(stage);

        this.ninja = ninja;

        this.add(lights, ninja);

        this.nextFruitTime = performance.now() / 1000;

        this.keyDown = (event) => {
            if (event.key === 'Control') {
                this.addFruit();
            } else {
                this.acceptLetter(event.key.toLowerCase());
            }
        };
    }

    addFruit() {
        // get random index and word with unique letter
        let idx;
        let word;
        let attempts = 10;

        do {
            idx = Math.floor(Math.random() * this.words.length);
            word = this.words[idx];
            attempts--;
        } while (attempts >= 0 && this.startingLetter[word.charAt(0)]);

        // update dict of starting letters
        this.startingLetter[word.charAt(0)] = true;

        // randomize fruit speed
        // reference: https://github.com/berkerol/typer/blob/master/typer.js

        // deciding which side the fruit will spawn from

        // placeholders for corner coordinates
        const minX = this.camera.left;
        const maxX = this.camera.right;
        const minY = this.camera.bottom;
        const maxY = this.camera.top;

        let x;
        let y;
        const side = Math.random();

        // left
        if (side < 0.35) {
            x = minX;
            y = generateRandom(minY, maxY);
        }
        // right
        else if (side < 0.7) {
            x = maxX;
            y = generateRandom(minY, maxY);
        } // bottom
        else if (side < 0.85) {
            x = generateRandom(minX, maxX);
            y = minY;
        } // top
        else {
            x = generateRandom(minX, maxX);
            y = maxY;
        }
        const position = new Vector3(x, y, 0);

        let newFruit = new Fruit(
            this.fruits.length,
            word,
            pickRandomFruitType(),
            position,
            generateRandom(
                this.secondsAliveRange[0],
                this.secondsAliveRange[1]
            ),
            performance.now() / 1000
        );
        this.fruits.push(newFruit);
        this.add(newFruit);

        console.log('New fruit:', newFruit.word, newFruit);
    }

    removeFruit(fruit) {
        const id = fruit.getId();

        // Reference: https://stackoverflow.com/questions/2003815/how-to-remove-element-from-an-array-in-javascript
        this.fruits.splice(id, 1);

        // re-index fruits
        for (let i = 0; i < this.fruits.length; i++) {
            this.fruits[i].setId(i);
        }

        this.startingLetter[fruit.word.charAt(0)] = false;
        fruit.splat(performance.now() / 1000);
        this.splattedFruits.push(fruit);
    }

    /**
     * Creates a pixel color.
     * @param {string} letter - The letter to consider
     */
    acceptLetter(letter) {
        letter = letter.toLowerCase();
        // no fruit right now
        if (!this.currentFruit) {
            if (this.fruits.length === 0) {
                // do nothing if there's no fruits
                return;
            }

            for (const fruit of this.fruits) {
                // arbitrarily pick first seen.
                // TODO: Prevent fruits from starting with the same letter
                if (fruit.word.charAt(0) == letter) {
                    this.currentFruit = fruit;
                    break;
                }
            }

            // if letter doesn't match anything, return
            if (!this.currentFruit) {
                return;
            }
        }
        let done = this.currentFruit.acceptLetter(letter);

        if (done) {
            this.ninja.changePosition(this.currentFruit.position.clone());
            console.log('Finished fruit', this.currentFruit);

            // TODO: More dynamic point allocation
            this.points =
                this.points + this.currentFruit.word.length * (this.stage + 1);

            this.removeFruit(this.currentFruit); // created a new method for removing fruit
            this.currentFruit.addSlash(
                // add 1 to z position to superimpose on top of other sprite
                this.currentFruit.position.clone().set(2, 1)
            );

            this.currentFruit = null;
        }
    }

    getText(remove, message, x, y) {
        this.remove(remove);
        const fontLoader = new FontLoader();
        let font = fontLoader.parse(CourierFont);

        let numShapesCompleted = font.generateShapes(
            message.slice(0, this.currentWordIndex)
        ).length;

        const shapes = font.generateShapes(message, 6);
        const materials = [];
        const completed = new MeshBasicMaterial({ color: 0x808080 });
        const normal = new MeshBasicMaterial({ color: 0xffffff });
        for (let i = 0; i < shapes.length; i++) {
            if (i < numShapesCompleted) {
                materials.push(completed);
            } else {
                materials.push(normal);
            }
        }

        const geometry = new ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        const text = new Mesh(geometry, materials);

        // slightly above fruit in y direction
        const textPosition = new Vector3(x, y, 1);
        text.position.copy(textPosition);

        return text;
    }

    /**
     * updates objects in game.
     * @param {Fruit} fruit - The fruit in question
     * @param {number} time - The current time, in seconds
     */
    collisionWithNinja(fruit, time) {
        // TODO: calculate
        // random values for the bounding box
        return time - fruit.startingTime > fruit.secondsAlive;
    }

    /**
     * updates objects in game.
     * @param {number} time - The time elapsed in the game in seconds
     */
    update(time) {
        // Make ninja face current Fruit
        this.ninja.update(time);

        // add fruit if necessary
        if (time > this.nextFruitTime) {
            this.addFruit();
            const timeUntilNext = generateRandom(
                this.secondsBetweenRange[0],
                this.secondsBetweenRange[1]
            );
            this.nextFruitTime = time + timeUntilNext;
        }

        for (const fruit of this.fruits) {
            fruit.update(time);

            // handle collisions with ninja
            if (this.collisionWithNinja(fruit, time)) {
                if (this.currentFruit === fruit) {
                    this.currentFruit = null;
                }

                this.removeFruit(fruit);
                this.lives -= 1;
            }
        }

        let filteredSplattedFruits = [];
        for (const splatted of this.splattedFruits) {
            if (time - splatted.splatTime > SPLAT_DISPLAY_TIME) {
                this.remove(splatted);
            } else {
                filteredSplattedFruits.push(splatted);
            }
        }
        this.splattedFruits = filteredSplattedFruits;

        // TODO: FIX BOUNDS TO BE OF SCREEN
        this.textScore = this.getText(
            this.textScore,
            'Score:' + this.points,
            -95,
            40
        );
        this.add(this.textScore);

        this.textLives = this.getText(
            this.textLives,
            'Lives:' + this.lives,
            -95,
            30
        );
        this.add(this.textLives);
    }

    addEvents() {
        // this.keyDown();
        // for now, debugging
        window.addEventListener('keydown', this.keyDown, false);
    }

    removeEvents() {
        window.addEventListener('keydown', this.keyDown, false);
    }
}

export default Game;
