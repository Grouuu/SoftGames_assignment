import {Container} from "pixi.js";
import {Header} from "./Header";
import {SceneName} from "../enum/SceneName";
import {Scene} from "./Scene";
import {AceOfShadowScene} from "./scenes/AceOfShadowScene";
import {SceneConfig} from "../interface/SceneConfig";
import {MagicWordsScene} from "./scenes/MagicWordsScene";
import {PhoenixFlameScene} from "./scenes/PhoenixFlameScene";

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

    public async init() {
        this.addHeader();
        this.showScene(SceneName.AceOfShadow);
    }

    public onResize(viewportWidth: number , viewportHeight: number) {
        if (this.header) {
            this.header.resize(viewportWidth, viewportHeight);
        }
        if (this.currentScene){
            this.currentScene.resize(viewportWidth, viewportHeight);
        }
    }

    private addHeader() {
        this.header = new Header({
            onSelectScene: (scenename: SceneName) => this.onSelectScene(scenename)
        });
        this.addChild(this.header);
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

}