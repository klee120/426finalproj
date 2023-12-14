import { Color } from 'three';

class GameConfig {
    constructor(
        lives,
        wordList,
        secondsBetweenRange,
        secondsAliveRange,
        background,
        pointsNeeded,
        stageBanner
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
        this.stageBanner = stageBanner;
    }
}

export default GameConfig;
