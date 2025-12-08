import {Assets, Application as PIXIApplication, Sprite} from "pixi.js";

export class Application extends PIXIApplication {

    public async startApplication () {

        console.log("START");

        // const sheet = await Assets.load('assets/spritesheet.json');
        // console.error(sheet);
        // const sprite = new Sprite(sheet.textures['button_default.png']);
        // console.log(sprite.width, sprite.height);
        // sprite.position.set(500, 500);
        // this.stage.addChild(sprite);
    }

    public onResize (width: number, height: number) {

    }

}