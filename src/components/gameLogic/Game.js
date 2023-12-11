import Fruit from './Fruit.js';
class Game {
    /**
     * Creates a pixel color.
     * @param {?number} lives - The number of lives (default 3).
     */
    constructor(lives) {
        // should not have negative lives
        if (lives == null || lives <= 0) {
            lives = 3;
        }

        /**
         * The current number of points.
         * @type {number}
         * @readonly
         */
        this.points = 0;

        /**
         * The current number of lives.
         * @type {number}
         * @readonly
         */
        this.lives = lives;

        // for type annotation reference: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
        /**
         * The list of fruits.
         * @type {Fruit[]}
         * @readonly
         */
        this.fruits = [];

        /**
         * The current fruit being considered or null if no fruit right now
         * @type {?Fruit}
         * @readonly
         */
        this.currentFruit = null;
    }

    getRandomWord() {
        // TODO: Randomly choose word
        return 'testing';
    }

    addFruit() {
        let word = this.getRandomWord();
        if (!word || word.length == 0) {
            throw { message: 'Invalid word', word: word };
        }
        // TODO: Randomly choose fruit type, location
        this.fruits.push(
            new Fruit(this.fruits.length, word, Fruit.FruitType.APPLE, [0, 0])
        );
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
        }

        let done = this.currentFruit.acceptLetter(letter);
        if (done) {
            console.log('Finished fruit', this.currentFruit);

            // Reference: https://stackoverflow.com/questions/2003815/how-to-remove-element-from-an-array-in-javascript
            this.fruits.splice(this.currentFruit.id, 1);

            // re-index fruits
            for (let i = 0; i < this.fruits.length; i++) {
                this.fruits[i].id = i;
            }

            this.currentFruit = null;

            // TODO: More dynamic point allocation
            this.points = this.points + 1;
        }
    }
}

export default Game;
