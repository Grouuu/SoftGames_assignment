import {Particle} from "pixi.js";

export interface ParticleData {
    particle: Particle;
    velocity: { x: number, y: number };
    life: number;
    maxLife: number;
    active: boolean;
}