import {Application} from "./Application";

export class FullscreenManager {

    private static instance: FullscreenManager;

    public static getInstance() {
        if (!FullscreenManager.instance) {
            FullscreenManager.instance = new FullscreenManager();
        }

        return FullscreenManager.instance;
    }

    private constructor() {
        this.addListeners();
    }

    public goFullscreen() {
        Application.getInstance().canvas.requestFullscreen();
    }

    public exitFullscreen() {
        document.exitFullscreen();
    }

    private addListeners(){
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                // Resize renderer to fullscreen dimensions
                Application.getInstance().renderer.resize(screen.width, screen.height);
            } else {
                // Back to normal size
                Application.getInstance().renderer.resize(window.innerWidth, window.innerHeight);
            }
        });
    }

}