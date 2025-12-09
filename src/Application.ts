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

    public onResize (viewportWidth: number, viewportHeight: number) {
        if (!this.gameStage) {
            return;
        }

        this.gameStage.onResize(viewportWidth, viewportHeight);
    }

    private async addGameStage() {
        this.gameStage = new GameStage();
        this.stage.addChild(this.gameStage);
        await this.gameStage.init();
    }

}