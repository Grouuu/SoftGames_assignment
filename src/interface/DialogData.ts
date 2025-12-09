import {Texture} from "pixi.js";

export interface DialogParsedData {
    dialogues: DialogueEntry[];
    emojies: Set<string>;
    avatars: Set<string>;
}

export interface DialogData {
    dialogue: DialogueEntry[];
    emojies: Emoji[];
    avatars: Avatar[];
}

export interface DialogueEntry {
    name: string;
    text: string;
}

export interface Emoji {
    name: string;
    url: string;
}

export interface Avatar {
    name: string;
    url: string;
    position: 'left' | 'right';
}