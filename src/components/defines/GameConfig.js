import { Color } from 'three';

class GameConfig {
    constructor(
        lives,
        wordList,
        secondsBetweenRange,
        secondsAliveRange,
        background
    ) {
        this.lives = lives;
        this.wordList = wordList;
        this.secondsBetweenRange = secondsBetweenRange;
        this.secondsAliveRange = secondsAliveRange;
        if (background) {
            this.background = background;
        } else {
            this.background = new Color(0x7ec0ee);
        }
    }
}

export default GameConfig;
