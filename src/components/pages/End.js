import {
    BoxGeometry,
    // FontLoader,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene,
    // TextGeometry,
    TextureLoader,
    Vector3,
    OrthographicCamera,
    Color,
} from 'three';

import FontLoader from 'three/examples/jsm/loaders/FontLoader.js';
// import { Scenes } from ".";
import SceneManager from '../gameLogic/SceneManager.js';
import { CourierFont } from '../fonts';
// import { EndBackground, WoodBlock } from "../images";
// import {EndBackground} from "../images"
import { Dojo } from '../sprites';

class End extends Scene {
    constructor(camera) {
        // Call parent Scene() constructor
        super();

        // Camera
        this.camera = new OrthographicCamera();

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.near = 1;
        this.camera.far = 100;

        // Set background to background image
        // const bgLoader = new TextureLoader();
        // const bgTexture = bgLoader.load(Dojo);
        // this.background = bgTexture;

        this.background = new Color(0xbaf8ba);
        // Add cube to back

        // const boxGeometry = new BoxGeometry(2.5, 1.5, 0.001);
        // // const boxTexture = new TextureLoader().load(WoodBlock);
        // // const boxMaterial = new MeshBasicMaterial({ map: boxTexture });
        // // const cube = new Mesh(boxGeometry, boxMaterial);
        // const cube = new Mesh(boxGeometry);
        // cube.position.set(0, 0, 0);
        // this.add(cube);

        // // Title Text Box
        // const fontLoader = new FontLoader();
        // // fontLoader.load(CourierFont, function (font) {
        // const geometry = new TextGeometry('Thanks for playing!', {
        //     //  font: font,
        //     size: 0.12,
        //     height: 0,
        // });
        // const textMesh = new Mesh(
        //     geometry,
        //     new MeshPhongMaterial({ color: 0xffffff })
        // );
        // console.log(textMesh)
        // textMesh.position.set(-0.8, 0, 0.1);
        // // Cannot use this.add since inside new function
        // SceneManager.end.add(textMesh);
        // //});
        // // fontLoader.load(CourierFont, function (font) {
        // const geometry2 = new TextGeometry(
        //     'Created by: Arnav Kumar, Stephanie Yen, and Kirsten Pardo',
        //     {
        //         // font: font,
        //         size: 0.05,
        //         height: 0,
        //     }
        // );
        // const text2Mesh = new Mesh(
        //     geometry2,
        //     new MeshPhongMaterial({ color: 0xffffff })
        // );
        // text2Mesh.position.set(-1, -0.37, 0.1);
        // // Cannot use this.add since inside new function
        // SceneManager.end.add(text2Mesh);
        // // });

        // Window resize handler for scene
        // this.windowResizeHandler = () => {
        //     const { innerHeight, innerWidth } = window;
        //     SceneManager.renderer.setSize(innerWidth, innerHeight);
        //     this.camera.aspect = innerWidth / innerHeight;
        //     this.camera.updateProjectionMatrix();
        // };

        // event handler
        this.keyDown = (event) => {
            if (event.key === 'Enter') {
                SceneManager.startGame();
            }
        };
    }

    addEvents() {
        // this.keyDown();
        // for now, debugging
        window.addEventListener('keydown', this.keyDown, false);
    }

    removeEvents() {
        window.addEventListener('keydown', this.keyDown, false);
    }
}

export default End;
