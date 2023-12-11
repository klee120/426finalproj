import Game from './Game.js';
class State {
    /**
     * Creates a pixel color.
     * @param {?number} lives - The number of lives per game (default 3).
     */
    constructor(lives) {
        // should not have negative lives
        if (lives == null || lives <= 0) {
            lives = 3;
        }

        this.game = new Game(lives);
    }

    handleKeyDown(event) {
        if (event.key === 'f') {
            this.game.addFruit();
        } else if (event.key === 'Enter') {
            console.log(this.game);
        } else {
            this.game.acceptLetter(event.key.toLowerCase());
        }
    }
}

export default State;
