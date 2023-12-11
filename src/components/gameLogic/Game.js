import Fruit from './Fruit.js';

const words = {
    1 : ["cat", "sun", "apple", "hope", "was", "beach", "chair", "dog", "elf", "lover", "fox", "igloo", "pixel", "color",  "giraffe", "ray", "kind", "lizard", "muffin", "nap", "ostrich", "pillow", "queen", "rizz", "star", "tea", "unite", "zen", "lace", "pool"],
    2 : ["cat", "sun", "apple", "hope", "was", "beach", "chair", "dog", "elf", "lover", "fox", "igloo", "pixel", "color",  "giraffe", "ray", "kind", "lizard", "muffin", "nap", "ostrich", "pillow", "queen", "rizz", "star", "tea", "unite", "zen", "lace", "pool", "blubber", "chicken", "really", "joy", "katie", "andrew", "genie", "purple", "banana", "happy", "guitar", "basket", "butter", "planet", "silver", "laptop", "monkey", "orange", "dragon", "turtle", "whisper", "kangaroo", "sparkle", "render", "shader", "gradient", "palette", "animation", "resolution", "opacity"],
    3 : ["cat", "sun", "apple", "hope", "was", "beach", "chair", "dog", "elf", "lover", "fox", "igloo", "pixel", "color",  "giraffe", "ray", "kind", "lizard", "muffin", "nap", "ostrich", "pillow", "queen", "rizz", "star", "tea", "unite", "zen", "lace", "pool", "blubber", "chicken", "really", "joy", "katie", "andrew", "genie", "purple", "banana", "happy", "guitar", "basket", "butter", "planet", "silver", "laptop", "monkey", "orange", "dragon", "turtle", "whisper", "kangaroo", "sparkle", "render", "shader", "gradient", "palette", "animation", "resolution", "opacity", "refraction", "reflection", "rasterization", "polygon", "ambient", "diffuse", "specular", "mapping", "blending", "shadow", "lighting", "saturation", "brightness", "waterfall", "renaissance", "nostalgia", "princeton", "metamorphosis", "astronomy", "treasure", "rainbow", "disappear", "encyclopedia", "boulevard", "gratitude", "hemisphere", "juxtapose", "silhouette", "entrepreneur", "luminosity"]
}

const speeds = {
    1: [0.5, 1],
    2: [0.8, 1.5],
    3: [1.2, 2]
}

// https://www.educative.io/answers/how-to-generate-a-random-number-between-a-range-in-javascript
// generates a random number between min and max
function generateRandom(min, max) {
    return Math.random() * (max-min) + min;
}

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
        
        /**
         * The current stage
         * @type {number}
         * @readonly
         */
        this.stage = 1;

        // for type annotation reference: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
        /**
         * The list of fruits.
         * @type {Fruit[]}
         * @readonly
         */
        this.fruits = [];
        this.startingLetter = {};

        /**
         * The current fruit being considered or null if no fruit right now
         * @type {?Fruit}
         * @readonly
         */
        this.currentFruit = null;
    }

    addFruit() {
        // get random index and word with unique letter
        let val;
        let word;
        
        do {
            val = Math.floor(Math.random() * words[this.stage].length);
            word = words[this.stage][val];
        } while (this.startingLetter(word[0]) && this.startingLetter(word[0]) != 0)

        // update dict of starting letters
        this.startingLetter[word[0]] = 1

        if (!word || word.length() == 0) {
            throw { message: 'Invalid word', word: word };
        }
        
        // randomize fruit speed
        const speedX = generateRandom(speeds[this.stage][0],speeds[this.stage][1])
        const speedY = generateRandom(speeds[this.stage][0],speeds[this.stage][1])

        // TODO: randomize starting location of fruit;
        // https://github.com/berkerol/typer/blob/master/typer.js
        // const starting = generateRandom();
        // const starting = [0, 0];
        
        // TODO: Randomly choose fruit type, location
        
        this.fruits.append(new Fruit(word, Fruit.FruitType.APPLE, starting, speedX, speedY));
    }

    removeFruit(id) {
        const fruit = this.fruits[id];
        this.startingLetter(fruit[0]) = 0;
        
        // Reference: https://stackoverflow.com/questions/2003815/how-to-remove-element-from-an-array-in-javascript
        this.fruits.splice(id, 1);
    }

    moveFruits() {
        for (const fruit of this.fruits) {
            // frames not defined yet, so commented out
            // if (!fruit.move(frames)) {
            //     this.removeFruit();
            // }
        }
    }

    /**
     * Creates a pixel color.
     * @param {string} letter - The letter to consider
     */
    acceptLetter(letter) {
        letter = letter.toLowerCase();
        // no fruit right now
        if (!this.currentFruit) {
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
            this.currentFruit = null;

            this.removeFruit(this.currentFruit.id); // created a new method for removing fruit

            // TODO: More dynamic point allocation
            this.points = this.points + 1;
        }
    }
} 

export default Game;
