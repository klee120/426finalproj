import { Group, Vector3, TextureLoader } from 'three';
import { createSprite } from 'sprites';

export class Banner extends Group {
    /**
     * Creates a banner object.
     * @param {number} level - The current level
     */
    constructor(banner) {
        super();

        const textureLoader = new TextureLoader();
        const scale = new Vector3(25, 25, 1);
        this.banner = createSprite(textureLoader, banner, scale);

        this.add(this.banner);
    }
}
