import {Container} from "pixi.js";
import {SceneConfig} from "../interface/SceneConfig";
import {SceneName} from "../enum/SceneName";

export class Scene extends Container {

    protected sceneConfig: SceneConfig;

    public getSceneName() {
        return this.sceneConfig?.sceneName ?? SceneName.None;
    }

    public start(){
        // override
    }

}