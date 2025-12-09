import {Assets, Container, HTMLText, Point, Sprite, Text, Texture} from "pixi.js";
import {Scene} from "../Scene";
import {GameAssetsManager} from "../../GameAssetsManager";
import {DialogDataManager} from "../../remote/DialogsDataManager";
import {DialogParsedData} from "../../interface/DialogData";

const DIALOG_BUBBLE_POSITION_Y = 400;
const DIALOG_BUBBLE_POSITION_OFFSET = { x: 0, y: 0 };
const TEXT_POSITION_Y = 375;
const AVATAR_POSITION_Y = 570;
const AVATAR_OFFSET = { x: -300, y: 0 };
const EMOJI_SCALE = 0.2;
const DIALOG_DURATION_IN_SECOND = 3;

const LOADING_TEXT = "LOADING...";

const LOADING_TEXT_STYLE = {
    fill: 0xFFFFFF,
}
const DIALOG_TEXT_STYLE = {
    fill: 0x000000,
    fontSize: 20
};

export class MagicWordsScene extends Scene {

    private loadingText: Text;
    private data: DialogParsedData;
    private dialogBubble: Sprite;
    private dialogTextField: Container;
    private avatar: Sprite;

    private currentDialogIndex = 0;

    public override start() {
        this.setup();
    }
    
    public override updateLayout(width: number, height: number) {
        const dialogBubbleMiddlePoint = new Point(width / 2, DIALOG_BUBBLE_POSITION_Y);
        const avatarMiddlePoint = new Point(width / 2, AVATAR_POSITION_Y);

        this.loadingText.position.set(dialogBubbleMiddlePoint.x, dialogBubbleMiddlePoint.y);

        if (this.dialogTextField)
            this.dialogTextField.position.set(dialogBubbleMiddlePoint.x + DIALOG_BUBBLE_POSITION_OFFSET.x, TEXT_POSITION_Y);
        if (this.dialogBubble)
            this.dialogBubble.position.set(dialogBubbleMiddlePoint.x + DIALOG_BUBBLE_POSITION_OFFSET.x, dialogBubbleMiddlePoint.y + DIALOG_BUBBLE_POSITION_OFFSET.y);
        if (this.avatar)
            this.avatar.position.set(avatarMiddlePoint.x + AVATAR_OFFSET.x, avatarMiddlePoint.y + AVATAR_OFFSET.y);
    }

    private async setup(){
        this.createLoadingText();
        this.initLayout();
        await this.getDialogData();
        this.hideLoadingText();
        this.createLayout();
        this.initLayout();
        
        this.startDialog();
    }

    private startDialog() {
        this.nextDialog();
    }

    private nextDialog() {
        const dialogData = this.data.dialogues[this.currentDialogIndex];
        const avatarName = dialogData.name;
        const dialogText = dialogData.text;

        this.updateDialogText(dialogText);
        this.updateAvatar(avatarName);

        this.currentDialogIndex++;

        if (this.currentDialogIndex >= this.data.dialogues.length) {
            this.currentDialogIndex = 0;
        }

        setTimeout(() => this.nextDialog(), DIALOG_DURATION_IN_SECOND * 1000);
    }

    private async getDialogData() {
        this.data = await DialogDataManager.getInstance().getData();
    }

    private createLoadingText() {
        this.loadingText = new Text({
            style: LOADING_TEXT_STYLE
        });
        this.loadingText.text = LOADING_TEXT;

        this.addChild(this.loadingText);
    }

    private hideLoadingText() {
        this.loadingText.visible = false;
    }

    private createLayout() {
        this.createDialogBubble();
        this.createDialogTextField();
        this.createAvatar();
    }

    private createDialogBubble() {
        this.dialogBubble = Sprite.from(GameAssetsManager.getInstance().getGameAssets().spritesheet["dialog.png"]);
        this.dialogBubble.anchor.set(0.5);

        this.dialogTextField = new HTMLText({
            style: {
                fill: 0xFFFFFF
            }
        });

        this.addChild(this.dialogBubble, this.dialogTextField);
    }

    private createAvatar() {
        this.avatar = new Sprite();
        this.avatar.anchor.set(0.5);

        this.addChild(this.avatar);
    }

    private createDialogTextField() {
        this.dialogTextField = new Container();
        this.addChild(this.dialogTextField);
    }

    private updateDialogText(text: string) {
        // clear the previous text
        this.dialogTextField.removeChildren();

        const textElements = this.parseDialog(text);

        let currentPositionX = 0;

        // add each part of the text, text or image
        textElements.forEach(element => {
            const isImage = element[0] == "{";

            if (isImage) {
                const textureKey = element.slice(1, -1);
                const texture = Assets.get(textureKey);

                if (!texture) {
                    console.error("Missing emoji:", textureKey);
                    return;
                }

                const image = Sprite.from(texture);

                image.scale.set(EMOJI_SCALE);
                image.position.x = currentPositionX;
                image.anchor.set(0, 0.5);
                
                this.dialogTextField.addChild(image);
                currentPositionX += image.width;
            } else {
                const textField = new Text({
                    style: DIALOG_TEXT_STYLE
                });
                textField.text = element;

                textField.anchor.set(0, 0.5);
                textField.position.x = currentPositionX;

                this.dialogTextField.addChild(textField);
                currentPositionX += textField.width;
            }
        });

        const totalWidth = currentPositionX;

        // centered the text
        this.dialogTextField.pivot.set(totalWidth / 2, 0);
    }

    /**
     * Return an array of the text split where emoji are detected (surounded by curly brackets with no spaces)
     */
    private parseDialog(text: string): string[] {
        return text.split(/(\{[^}]*\})/);
    }

    private updateAvatar (avatarName: string) {

        if (!this.data.avatars.has(avatarName)) {
            console.error("Missing avatar:", avatarName);
            this.avatar.texture = Texture.EMPTY;
            return;
        }

        this.avatar.texture = Texture.from(avatarName);
    }

}