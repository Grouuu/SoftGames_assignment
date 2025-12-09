import {Assets, AssetsManifest} from "pixi.js";
import {GameAssets} from "./interface/GameAssets";

/**
 * Assets declaration
 */
const MANIFEST =
{
    bundles: [
        {
            name: "spritesheet",
            assets: [{ alias: "spritesheet", src: "./assets/spritesheet.json" }]
        }
    ]
} satisfies AssetsManifest;

/**
 * Manage all game assets (load, init and access).
 * Assets should be loaded, then initialized before trying to access them.
 */
export class GameAssetsManager {

    private static instance: GameAssetsManager;

    private assets: GameAssets;

    public static getInstance() : GameAssetsManager {
        if (!GameAssetsManager.instance){
            GameAssetsManager.instance = new GameAssetsManager();
        }

        return GameAssetsManager.instance;
    }

    /** Put assets in cache */
    public async loadAssets() {
        await Assets.init(this.getAssetsInitOptions());
        await Assets.loadBundle(this.getAssetsNameList());
    }

    /** Initialize assets to access them from the game */
    public async initGameAssets() {
        const spritesheet = await Assets.load('assets/spritesheet.json');

        this.assets = {
            spritesheet: spritesheet.textures
        };
    }

    public getGameAssets() {
        return this.assets;
    }

    private getAssetsInitOptions(){
        return {
            manifest: MANIFEST
        };
    }

    private getAssetsNameList() {
        return MANIFEST.bundles.reduce<string[]>((list, bundle) => {
            list.push(bundle.name);
            return list;
        }, []);
    }

}