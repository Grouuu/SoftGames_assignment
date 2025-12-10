import {CanvasTextOptions, Container, Sprite, Text} from "pixi.js";
import {GameAssetsManager} from "../GameAssetsManager";
import {SceneName} from "../enum/SceneName";
import {HeaderButtonConfig} from "../interface/HeaderButtonConfig";
import {HeaderButtonStruct} from "../interface/HeaderButtonStruct";
import {GAME_WIDTH} from "..";

/**
 * Configuration for all header buttons
 */
const LAYOUT_CONFIG = {
    buttonsConfig: [
        {
            sceneName: SceneName.AceOfShadow,
            textureName: 'button_default.png',
            label: "Ace Of Shadow",
        },
        {
            sceneName: SceneName.MagicWords,
            textureName: 'button_default.png',
            label: "Magic Words",
        },
        {
            sceneName: SceneName.PhoenixFlame,
            textureName: 'button_default.png',
            label: "Phoenix Flame",
        }
    ] as HeaderButtonConfig[],
    buttonMargin: 5,
    buttonPositionY: 100,
};

const HEADER_BUTTON_LABEL_STYLE: CanvasTextOptions = {
    style:{
        fill: 0xFFFFFF
    }
};

const HEADER_BUTTON_LABEL_OFFSET = {
    x: 0,
    y: -5
};

export interface HeaderOptions {
    onSelectScene: (sceneName: SceneName) => void;
}

/**
 * Manage the swap between the different scenes
 */
export class Header extends Container {

    private options: HeaderOptions;
    private sceneButtons: HeaderButtonStruct[] = [];

    constructor(options: HeaderOptions) {
        super();
        this.options = options;
        this.initSceneButtons();
        this.initLayout();
    }

    private initLayout() {
        const totalButtonsWidth = this.sceneButtons.reduce((total: number, button: HeaderButtonStruct) => total += button.background.width, 0);
        const totalButtonsMargin = LAYOUT_CONFIG.buttonMargin * (this.sceneButtons.length - 1);
        const startPositionX = GAME_WIDTH / 2 - (totalButtonsWidth - totalButtonsMargin) / 2;

        let buttonPositionX = startPositionX;
        let buttonPositionY = LAYOUT_CONFIG.buttonPositionY;

        this.sceneButtons.forEach(button => {
            button.container.position.set(buttonPositionX, buttonPositionY);
            buttonPositionX += button.background.width + LAYOUT_CONFIG.buttonMargin;
        });
    }

    private initSceneButtons() {
        LAYOUT_CONFIG.buttonsConfig.forEach(config => this.addSceneButton(config));
    }

    private addSceneButton(buttonConfig: HeaderButtonConfig) {
        const container = new Container();

        const background = this.createSceneButtonBackground(buttonConfig);
        background.cursor = 'pointer';

        const label = this.createSceneButtonLabel(buttonConfig);
        // align the label related to the background
        label.position.set(background.width / 2 + HEADER_BUTTON_LABEL_OFFSET.x, background.height / 2 + HEADER_BUTTON_LABEL_OFFSET.y);

        container.addChild(background, label);

        this.addChild(container);

        const buttonStruct: HeaderButtonStruct = {
            container,
            background,
            label
        };

        this.sceneButtons.push(buttonStruct);

        this.addSceneButtonListener(buttonStruct, buttonConfig);
    }

    private createSceneButtonBackground(buttonConfig: HeaderButtonConfig) {
        const background = new Sprite(GameAssetsManager.getInstance().getGameAssets().spritesheet[buttonConfig.textureName]);
        background.interactive = true;
        return background;
    }

    private createSceneButtonLabel(buttonConfig: HeaderButtonConfig) {
        const label = new Text(HEADER_BUTTON_LABEL_STYLE);
        label.interactive = false;
        label.anchor.set(0.5);
        label.text = buttonConfig.label;
        return label;
    }

    private addSceneButtonListener(buttonContainer: HeaderButtonStruct, buttonConfig: HeaderButtonConfig) {
        const onClick = (event: Event) => this.onSceneButtonClick(buttonConfig);
        buttonContainer.background.removeEventListener("pointerup", onClick);
        buttonContainer.background.addEventListener("pointerup", onClick);
    }

    private onSceneButtonClick(button: HeaderButtonConfig){
        this.options.onSelectScene(button.sceneName);
    }

}