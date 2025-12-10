import {Particle, ParticleContainer, ParticleContainerOptions, Texture} from "pixi.js";
import {Scene} from "../Scene";
import {ParticleData} from "../../interface/ParticleData";
import {Application} from "../../Application";
import {GAME_WIDTH} from "../..";

const NUMBER_PARTICLES = 10;
const PARTICLES_CONTAINER_Y = 400;
const PARTICLES_CONTAINER_OFFSET_X = -200;

const PARTICLE_SPAWN_ODD = 0.2; // [0, 1]
const PARTICLE_GRAVITY = -0.05;
const PARTICLE_COLOR_FADE_RATIO = 0.3; // [0, 1]

const PARTICLES_OPTIONS: ParticleContainerOptions = {
    dynamicProperties: {
        color: true
    }
};

export class PhoenixFlameScene extends Scene {

    private particlesContainer: ParticleContainer;
    private particles: ParticleData[] = [];
    
    public override start() {
        this.createParticlesContainer();
        this.initLayout();
        this.createParticles();
        this.startEmit();
    }
    
    public initLayout() {
        this.particlesContainer.position.set(GAME_WIDTH / 2 + PARTICLES_CONTAINER_OFFSET_X, PARTICLES_CONTAINER_Y);
    }

    private createParticlesContainer() {
        this.particlesContainer = new ParticleContainer(PARTICLES_OPTIONS);
        this.particlesContainer.blendMode = "add";

        this.addChild(this.particlesContainer);
    }

    private createParticles() {
        const particleTexture = Texture.from("fire_particle.png");

        for (let i = 0; i < NUMBER_PARTICLES; i++) {
            const particle = new Particle(particleTexture);
            
            const particleData = {
                active: false,
                particle,
                velocity: { x: 0, y: 0 },
                life: 0,
                maxLife: 0
            };

            this.particles.push(particleData);
            this.particlesContainer.addParticle(particle);
        }
    }

    private startEmit() {
        Application.getInstance().ticker.add(() => this.updateParticles());
    }

    private updateParticles() {
        
        if (Math.random() < PARTICLE_SPAWN_ODD) {
            this.emitParticle();
        }

        this.particles.forEach(particleData => {

            if (!particleData.active) {
                return;
            }

            particleData.life++;

            particleData.particle.x += particleData.velocity.x;
            particleData.particle.y += particleData.velocity.y;

            // add some gravity
            particleData.velocity.y += PARTICLE_GRAVITY;

            // fade in/out
            const lifeRatio = particleData.life / particleData.maxLife;
            let brightness;

            if (lifeRatio < PARTICLE_COLOR_FADE_RATIO) {
                // start from dark to bright
                brightness = lifeRatio / PARTICLE_COLOR_FADE_RATIO;
            } else {
                // end from bright to dark
                const fadeRatio = (lifeRatio - PARTICLE_COLOR_FADE_RATIO) / (1 - PARTICLE_COLOR_FADE_RATIO);
                brightness = Math.max(0, 1 - fadeRatio);
            }

            const r = Math.max(0, Math.min(255, Math.floor(255 * brightness)));
            const g = Math.max(0, Math.min(255, Math.floor(255 * brightness)));
            const b = 0;
            
            particleData.particle.tint = (r << 16) | (g << 8) | b;

            if (particleData.life > particleData.maxLife) {
                this.deactivateParticle(particleData);
            }
        });
    }

    private emitParticle() {
        const particleData = this.particles.find(particle => !particle.active);

        if (!particleData) {
            // no free particle in the pool
            return;
        }

        this.activateParticle(particleData);
    }

    private activateParticle(particleData: ParticleData) {
        particleData.active = true;
        particleData.velocity.x = (Math.random() - 0.5) * 2;
        particleData.velocity.y = -0.05 + Math.random() * 0.05;
        particleData.life = 0;
        particleData.maxLife = 60 + Math.random() * 30;

        particleData.particle.x = 0;
        particleData.particle.y = 0;
        particleData.particle.tint = 0x000000;
    }

    private deactivateParticle(particleData: ParticleData) {
        particleData.active = false;
    }
}