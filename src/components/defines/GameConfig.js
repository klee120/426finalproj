import { Color } from 'three';

class GameConfig {
    constructor(
        lives,
        wordList,
        secondsBetweenRange,
        secondsAliveRange,
        background,
        pointsNeeded
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

        this.pointsNeeded = pointsNeeded;
    }
}

export default GameConfig;
