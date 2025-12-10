import {Application} from "./Application";
import {getViewportInfo} from "./Utils";
import {GameAssetsManager} from "./GameAssetsManager";

export const GAME_WIDTH = 1080;
export const GAME_HEIGHT = 1080;

(async () => {

    const app = new Application();

    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({
        antialias: false,
        sharedTicker: true,
        preference: 'webgl',
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: 0x000000,
    });

    await GameAssetsManager.getInstance().loadAssets();
    await GameAssetsManager.getInstance().initGameAssets();

    document.body.appendChild(app.canvas);

    listenResize();

    // force the initial resize
    resizeCanvas();

    // start entry point
    app.startApplication();

    function resizeCanvas() {
        const viewPortInfo = getViewportInfo();
        
        // Calculate scale to fit viewport while maintaining aspect ratio
        const scaleX = viewPortInfo.width / GAME_WIDTH;
        const scaleY = viewPortInfo.height / GAME_HEIGHT;
        const scale = Math.min(scaleX, scaleY);

        // Resize renderer to viewport
        app.renderer.resize(viewPortInfo.width, viewPortInfo.height);

        // Scale your stage/content
        app.stage.scale.set(scale);

        // Center content
        app.stage.position.set(
            (viewPortInfo.width - GAME_WIDTH * scale) / 2,
            0
        );
    };

    function listenResize(): void {
        window.addEventListener("resize", resizeCanvas);
    }
})();