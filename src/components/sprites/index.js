import FruitSprites from './FruitSprites.js';
import NinjaSprites from './NinjaSprites.js';

import Apple from './apple.png';
import Straw from './strawberry.png';
import Lemon from './lemon.png';
import Orange from './orange.png';
import Lime from './lime.png';
import Grape from './grape.png';
import Watermelon from './watermelon.png';
import AppleSplat from './apple-straw-splat.png';
import StrawSplat from './apple-straw-splat.png';
import OrangeSplat from './orange-splat.png';
import LemonSplat from './lemon-splat.png';
import LimeSplat from './lime-splat.png';
import GrapeSplat from './grape-splat.png';
import WatermelonSplat from './watermelon-splat.png';

import Front_White from './front-white.png';
import Down_White from './down-white.png';
import Down_Right_White from './down-right-white.png';
import Right_White from './right-white.png';
import Up_Right_White from './up-right-white.png';
import Up_White from './up-white.png';
import Up_Left_White from './up-left-white.png';
import Left_White from './left-white.png';
import Down_Left_White from './down-left-white.png';
import Front_Red from './front-red.png';
import Down_Red from './down-red.png';
import Down_Right_Red from './down-right-red.png';
import Right_Red from './right-red.png';
import Up_Right_Red from './up-right-red.png';
import Up_Red from './up-red.png';
import Up_Left_Red from './up-left-red.png';
import Left_Red from './left-red.png';
import Down_Left_Red from './down-left-red.png';
import Front_Black from './front-black.png';
import Down_Black from './down-black.png';
import Down_Right_Black from './down-right-black.png';
import Right_Black from './right-black.png';
import Up_Right_Black from './up-right-black.png';
import Up_Black from './up-black.png';
import Up_Left_Black from './up-left-black.png';
import Left_Black from './left-black.png';
import Down_Left_Black from './down-left-black.png';

export { default as Slash } from './slash.png';

export const APPLE_SPRITES = new FruitSprites('apple', Apple, AppleSplat);
export const STRAW_SPRITES = new FruitSprites('straw', Straw, StrawSplat);
export const LEMON_SPRITES = new FruitSprites('lemon', Lemon, LemonSplat);
export const ORANGE_SPRITES = new FruitSprites('orange', Orange, OrangeSplat);
export const LIME_SPRITES = new FruitSprites('lime', Lime, LimeSplat);
export const GRAPE_SPRITES = new FruitSprites('grape', Grape, GrapeSplat);
export const WATERMELON_SPRITES = new FruitSprites(
    'watermelon',
    Watermelon,
    WatermelonSplat
);

let ninjaWhite = new NinjaSprites(
    'white',
    Front_White,
    Down_White,
    Right_White,
    Left_White,
    Up_White,
    Up_Right_White,
    Up_Left_White,
    Down_Right_White,
    Down_Left_White
);

let ninjaRed = new NinjaSprites(
    'red',
    Front_Red,
    Down_Red,
    Right_Red,
    Left_Red,
    Up_Red,
    Up_Right_Red,
    Up_Left_Red,
    Down_Right_Red,
    Down_Left_Red
);

let ninjaBlack = new NinjaSprites(
    'black',
    Front_Black,
    Down_Black,
    Right_Black,
    Left_Black,
    Up_Black,
    Up_Right_Black,
    Up_Left_Black,
    Down_Right_Black,
    Down_Left_Black
);

export const NINJA_SPRITES = [ninjaWhite, ninjaRed, ninjaBlack];
