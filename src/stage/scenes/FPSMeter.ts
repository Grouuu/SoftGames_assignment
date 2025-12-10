import {Container, Text} from "pixi.js";
import {Application} from "../../Application";
import {getViewportInfo} from "../../Utils";

const FPS_TARGET = 60;
const FPS_POSITION_Y = 50;

const FPS_TEXT_STYLE = {
    fill: 0xFFFFFF,
    fontSize: 24
}

export class FPSMeter extends Container {

    private fpsText: Text;
    private lastTime: number = performance.now();
    private frames: number[] = [];

    constructor() {
        super();
        this.createFPSText();
        this.startUpdate();
        this.initLayout();
    }

    public resize(viewportWidth: number, viewportHeight: number) {
        this.updateLayout(viewportWidth, viewportHeight);
    }
    
    private initLayout() {
        const { width, height } = getViewportInfo();
        this.updateLayout(width, height);
    }

    private createFPSText() {
        this.fpsText = new Text({
            style: FPS_TEXT_STYLE
        });
        this.addChild(this.fpsText);
    }

    private updateLayout(width: number, height: number) {
        this.fpsText.position.set(width * 0.1, FPS_POSITION_Y);
    }

    private startUpdate() {
        Application.getInstance().ticker.add(() => this.updateFPSMeter());
    }

    private updateFPSMeter() {
        const now = performance.now();
        const delta = now - this.lastTime;

        this.lastTime = now;

        this.frames.push(1000 / delta);

        if (this.frames.length > FPS_TARGET) {
            this.frames.shift();
        }

        // Calculate average FPS
        const avgFPS = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
        
        this.fpsText.text = `FPS: ${Math.round(avgFPS)}`;
    }
}