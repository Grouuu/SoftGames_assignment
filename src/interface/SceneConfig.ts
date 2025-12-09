import {SceneName} from "../enum/SceneName";
import {Scene} from "../stage/Scene";

export interface SceneConfig {
    sceneName: SceneName;
    instantiate: () => Scene;
}