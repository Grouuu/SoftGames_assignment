import {Container} from "pixi.js";
import {SceneConfig} from "../interface/SceneConfig";
import {SceneName} from "../enum/SceneName";
import {getViewportInfo} from "../Utils";

export class Scene extends Container {

    protected sceneConfig: SceneConfig;

    public getSceneName() {
        return this.sceneConfig?.sceneName ?? SceneName.None;
    }

    public start(){
        // override
    }

    public resize(viewportWidth: number, viewportHeight: number) {
        this.updateLayout(viewportWidth, viewportHeight);
    }
    
    protected initLayout() {
        const { width, height } = getViewportInfo();
        this.updateLayout(width, height);
    }
    
    protected updateLayout(width: number, height: number) {
        // override
    }

}