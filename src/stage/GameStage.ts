import {Container, Graphics} from "pixi.js";
import {Header} from "./Header";
import {SceneName} from "../enum/SceneName";
import {Scene} from "./Scene";
import {AceOfShadowScene} from "./scenes/AceOfShadowScene";
import {SceneConfig} from "../interface/SceneConfig";
import {MagicWordsScene} from "./scenes/MagicWordsScene";
import {PhoenixFlameScene} from "./scenes/PhoenixFlameScene";
import {FPSMeter} from "./scenes/FPSMeter";
import {GAME_HEIGHT, GAME_WIDTH} from "..";
import {FullscreenButton} from "./FullscreenButton";

const SCENES_CONFIG: SceneConfig[] = [
    {
        sceneName: SceneName.AceOfShadow,
        instantiate: () => new AceOfShadowScene()
    },
    {
        sceneName: SceneName.MagicWords,
        instantiate: () => new MagicWordsScene()
    },
    {
        sceneName: SceneName.PhoenixFlame,
        instantiate: () => new PhoenixFlameScene()
    }
];

/**
 * Manage the whole stage, with the header and the different scenes.
 */
export class GameStage extends Container {

    private header: Header;
    private currentScene: Scene;
    private fpsMeter: FPSMeter;
    private fullscreenButton: FullscreenButton;

    private debugLayoutArea: Graphics;
    private isShowDebugLayoutArea: boolean = false;

    public async init() {
        this.showDebugLayoutArea();
        this.addHeader();
        this.addFPSMeter();
        this.addFullscreenButton();
        this.showScene(SceneName.AceOfShadow);
    }

    private addHeader() {
        this.header = new Header({
            onSelectScene: (scenename: SceneName) => this.onSelectScene(scenename)
        });
        this.addChild(this.header);
    }

    private addFPSMeter() {
        this.fpsMeter = new FPSMeter();
        this.addChild(this.fpsMeter);
    }

    private addFullscreenButton() {
        this.fullscreenButton = new FullscreenButton();
        this.addChild(this.fullscreenButton);
    }

    private showScene(sceneName: SceneName) {
        if (this.currentScene){
            this.removeChild(this.currentScene);
        }

        this.currentScene = this.createScene(sceneName);
        this.addChild(this.currentScene);
        this.currentScene.start();
    }

    private createScene(sceneName: SceneName): Scene {
        // add a safety fallback with an empty scene
        const config = SCENES_CONFIG.find(config => config.sceneName == sceneName) ?? { sceneName: SceneName.None, instantiate: () => new Scene() };
        const scene = config.instantiate();
        return scene;
    }

    private onSelectScene(sceneName: SceneName) {
        if (this.currentScene && this.currentScene.getSceneName() == sceneName) {
            return;
        }
        
        this.showScene(sceneName);        
    }

    /** Use to show the area reserved for the game layout in red */
    private showDebugLayoutArea() {
        if (!this.isShowDebugLayoutArea) {
            return;
        }

        this.debugLayoutArea = new Graphics();
        this.debugLayoutArea
            .rect(0, 0, GAME_WIDTH, GAME_HEIGHT)
            .fill({ color: 0xff0000 })
        ;
        this.addChild(this.debugLayoutArea);
    }

}