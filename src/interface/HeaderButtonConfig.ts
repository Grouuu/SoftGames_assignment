import {SceneName} from "../enum/SceneName";

export interface HeaderButtonConfig {
    /** Scene associated to the button */
    sceneName: SceneName;
    /** Button background texture */
    textureName: string;
    /** Button label */
    label: string;
}