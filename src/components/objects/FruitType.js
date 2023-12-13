import {
    APPLE_SPRITES,
    STRAW_SPRITES,
    LEMON_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    GRAPE_SPRITES,
    WATERMELON_SPRITES,
} from 'sprites';

// Enum of fruit types
// Reference: https://www.sohamkamani.com/javascript/enums/

const FRUIT_TYPES = [
    APPLE_SPRITES,
    STRAW_SPRITES,
    LEMON_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    GRAPE_SPRITES,
    WATERMELON_SPRITES,
];

export function pickRandomFruitType() {
    let idx = Math.floor(Math.random() * FRUIT_TYPES.length);
    return FRUIT_TYPES[idx];
}
