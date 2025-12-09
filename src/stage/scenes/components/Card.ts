import {Container, Sprite} from "pixi.js";
import {CardConfig} from "../../../interface/CardConfig";
import {GameAssetsManager} from "../../../GameAssetsManager";

export class Card extends Container {

    public isDrawn: boolean = false;
    public isMoving: boolean = false;

    private config: CardConfig;
    private cardSprite: Sprite;

    constructor (config: CardConfig) {
        super();
        this.config = config;
        this.createCard();
    }

    public showCard() {
        this.cardSprite.texture = GameAssetsManager.getInstance().getGameAssets().spritesheet[this.config.textureFront];
    }

    public hideCard() {
        this.cardSprite.texture = GameAssetsManager.getInstance().getGameAssets().spritesheet[this.config.textureBack];
    }

    private createCard() {
        this.cardSprite = Sprite.from(GameAssetsManager.getInstance().getGameAssets().spritesheet[this.config.textureFront]);
        this.cardSprite.anchor.set(0.5);
        this.addChild(this.cardSprite);
    }

}