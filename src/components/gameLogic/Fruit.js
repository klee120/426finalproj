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
     */
    constructor(id, word, fruitType, location) {
        this.id = id;
        // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
        this.word = word.toLowerCase();
        this.fruitType = fruitType;
        this.location = [];

        this.currentWordIndex = 0;
    }

    acceptLetter(letter) {
        // catch erroneous case where fruit is interacted with despite being done
        if (this.currentWordIndex >= this.word.length) {
            // Exceptions reference: https://www.w3schools.com/js/js_errors.asp
            throw 'Fruit is already done!';
        }

        if (this.word.charAt(this.currentWordIndex) === letter) {
            this.currentWordIndex = this.currentWordIndex + 1;
        }

        if (this.currentWordIndex >= this.word.length) {
            return true;
        }

        return false;
    }
}

export default Fruit;
