import {Assets, AssetsManifest} from "pixi.js";
import {Application} from "./Application";
import {getViewportInfo} from "./Utils";

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

    await loadGameAssets();

    document.body.appendChild(app.canvas);

    listenResize();
    
    // force the initial resize
    resizeCanvas();

    // start entry point
    app.startApplication();

    // load the game assets
    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [
                {
                    name: "spritesheet",
                    assets: [
                        { alias: "spritesheet", src: "./assets/spritesheet.json" },
                    ]
                },
            ]
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["spritesheet"]);
    }

    function resizeCanvas() {
        const viewPortInfo = getViewportInfo();
        app.renderer.resize(viewPortInfo.width, viewPortInfo.height);
        app.onResize(viewPortInfo.width, viewPortInfo.height);
    };

    function listenResize(): void {
        window.addEventListener("resize", resizeCanvas);
    }
})();