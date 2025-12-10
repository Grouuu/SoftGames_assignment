import {Container, Sprite} from "pixi.js";
import {GameAssetsManager} from "../GameAssetsManager";
import {GAME_WIDTH} from "..";
import {FullscreenManager} from "../FullscreenManager";

export class FullscreenButton extends Container {

    private fullscreenGoButton: Sprite;
    private fullscreenStopButton: Sprite;

    constructor() {
        super();
        this.createButtons();
        this.initLayout();
        this.addButtonsListener();
    }

    private createButtons() {
        this.fullscreenGoButton = new Sprite(GameAssetsManager.getInstance().getGameAssets().spritesheet["fullscreen_go.png"]);
        this.fullscreenGoButton.interactive = true;
        this.fullscreenGoButton.cursor = 'pointer';

        this.fullscreenStopButton = new Sprite(GameAssetsManager.getInstance().getGameAssets().spritesheet["fullscreen_stop.png"]);
        this.fullscreenStopButton.interactive = true;
        this.fullscreenStopButton.cursor = 'pointer';

        this.addChild(this.fullscreenGoButton, this.fullscreenStopButton);
    }
 
    private initLayout() {
        this.fullscreenStopButton.visible = false;

        this.fullscreenGoButton.position.set(GAME_WIDTH * 0.9, 20);
        this.fullscreenStopButton.position.set(GAME_WIDTH * 0.9, 20);
    }

    private addButtonsListener() {
        const onGoFullscreen = (event: Event) => {
            this.fullscreenGoButton.visible = false;
            this.fullscreenStopButton.visible = true;
            FullscreenManager.getInstance().goFullscreen();
        };
        const onStopFullscreen = (event: Event) => {
            this.fullscreenGoButton.visible = true;
            this.fullscreenStopButton.visible = false;
            FullscreenManager.getInstance().exitFullscreen();
        };

        this.fullscreenGoButton.removeEventListener("pointerup", onGoFullscreen);
        this.fullscreenGoButton.addEventListener("pointerup", onGoFullscreen);
        this.fullscreenStopButton.removeEventListener("pointerup", onStopFullscreen);
        this.fullscreenStopButton.addEventListener("pointerup", onStopFullscreen);
    }

}