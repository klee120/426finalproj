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
    }

    handleKeyDown(event) {
        console.log(event);
    }
}

export default State;
