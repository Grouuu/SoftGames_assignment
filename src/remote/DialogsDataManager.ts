import {Assets, Texture} from "pixi.js";
import {DialogData, DialogParsedData} from "../interface/DialogData";

const DIALOG_DATA_URL = "https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords";

export class DialogDataManager {

    private static instance: DialogDataManager;

    public static getInstance() {
        if(!DialogDataManager.instance) {
            DialogDataManager.instance = new DialogDataManager();
        }

        return DialogDataManager.instance;
    }

    public async getData (): Promise<DialogParsedData> {
        const jsonData: DialogData = await this.getJsonData();
        const { emojies, avatars } = await this.loadImages(jsonData);
        return {
            dialogues: jsonData.dialogue,
            emojies,
            avatars
        };
    }

    private async getJsonData() {
        try {
            const response = await fetch(DIALOG_DATA_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: DialogData = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching JSON:', error);
            throw error;
        }
    }

    private async loadImages(jsonData: DialogData){

        // Create maps for easy access
        const emojies = new Map<string, Texture>();
        const avatars = new Map<string, Texture>();
        
        // Load emojies
        for (const emoji of jsonData.emojies) {
            Assets.add({ alias: emoji.name, src: emoji.url, parser: 'loadTextures' });
            const texture = await Assets.load(emoji.name);
            emojies.set(emoji.name, texture);
        }
        
        // Load avatars
        for (const avatar of jsonData.avatars) {
            Assets.add({ alias: avatar.name, src: avatar.url, parser: 'loadTextures' });
            const texture = await Assets.load(avatar.name);
            avatars.set(avatar.name, texture);
        }
        
        return { emojies, avatars };
    }

}