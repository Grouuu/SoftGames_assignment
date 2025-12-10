import {Application as PIXIApplication} from "pixi.js";
import {GameStage} from "./stage/GameStage";

export class Application extends PIXIApplication {

    private static instance: Application;
    private gameStage: GameStage;

    constructor() {
        super();
        Application.instance = this;
    }

    public static getInstance(): Application {
        return Application.instance;
    }

    /** Game entry point **/
    public async startApplication () {
        await this.addGameStage();
    }

    private async addGameStage() {
        this.gameStage = new GameStage();
        this.stage.addChild(this.gameStage);
        await this.gameStage.init();
    }

}