class Fruit {
    // Enum of fruit types
    // Reference: https://www.sohamkamani.com/javascript/enums/
    static FruitType = {
        APPLE: Symbol('apple', 'apple_file.png'),
        ORANGE: Symbol('orange', 'orange_file.png'),
    };

    /**
     * Creates a pixel color.
     * @param {number} id - An integer dynamic id
     * @param {string} word - The word
     * @param {Symbol} fruitType - The fruit type
     * @param {[number, number]} location - The starting location
     * @param {number} speedX - the speed of the fruit in the x direction
     * @param {number} speedY - the speed of the fruit in the y direction
     */
    constructor(id, word, fruitType, location, speedX, speedY) {
        this.id = id;
        // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
        this.word = word.toLowerCase();
        this.fruitType = fruitType;
        this.location = location; // need to randomize in a circle around the ninja

        this.currentWordIndex = 0;
        this.speedX = speedX;
        this.speedY = speedY; 
    }

    acceptLetter(letter) {
        // catch erroneous case where fruit is interacted with despite being done
        if (this.currentWordIndex >= this.word.length()) {
            // Exceptions reference: https://www.w3schools.com/js/js_errors.asp
            throw 'Fruit is already done!';
        }
        // correct letter
        if (this.word.charAt(this.currentWordIndex) === letter) {
            this.currentWordIndex = this.currentWordIndex + 1;
        }
        //  else { // incorrect letter
        //     // vibrate fruit
        // }

        if (this.currentWordIndex >= this.word.length()) {
            return true;
        }

        return false;
    }

    // frames commented out for now

    // move(frames) {
    //     // update location
    //     this.location[0] +=  this.speedX * frames;
    //     this.location[1] += this.speedY * frames;
    // }
}

export default Fruit;
