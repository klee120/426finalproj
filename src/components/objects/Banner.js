import { Group, Vector3, TextureLoader } from 'three';
import { createSprite } from 'sprites';

export class Banner extends Group {
    /**
     * Creates a banner object.
     * @param {number} level - The current level
     */
    constructor(banner, scale) {
        super();

        if (!scale) {
            scale = new Vector3(100, 100, 1);
        } else {
            scale = scale.clone();
        }

        const textureLoader = new TextureLoader();
        this.banner = createSprite(textureLoader, banner, scale);

        this.add(this.banner);
    }
}
