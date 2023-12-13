import { Apple } from 'sprites';

class FruitType {
    constructor(name, sprite, splatSprite) {
        this.name = name;
        this.sprite = sprite;
        this.splatSprite = splatSprite;
    }
}

// Enum of fruit types
// Reference: https://www.sohamkamani.com/javascript/enums/

export const FRUIT_TYPES = [
    new FruitType('apple', Apple, 'apple-straw-splat.png'),
    // new FruitType('orange', 'orange.png', 'orange-splat.png'),
];

export function pickRandomFruitType() {
    let idx = Math.floor(Math.random() * FRUIT_TYPES.length);
    return FRUIT_TYPES[idx];
}
