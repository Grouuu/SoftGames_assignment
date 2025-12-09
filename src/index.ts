import {Application} from "./Application";
import {getViewportInfo} from "./Utils";
import {GameAssetsManager} from "./GameAssetsManager";

const gameWidth = 1080;
const gameHeight = 1920;

(async () => {

    const app = new Application();

    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({
        antialias: false,
        sharedTicker: true,
        preference: 'webgl',
        width: gameWidth,
        height: gameHeight,
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
        app.renderer.resize(viewPortInfo.width, viewPortInfo.height);
        app.onResize(viewPortInfo.width, viewPortInfo.height);
    };

    function listenResize(): void {
        window.addEventListener("resize", resizeCanvas);
    }
})();