import { loadImage } from "../../../../../utils/image_handler.js";
import CRParticle from "./CRParticle.js";

class CrimsonRain {
    static image = loadImage("../../../../../../../Assets/Sprite/Boss/particles/CrimsonRain.png")

    static construct(boss) {
        return new CrimsonRain(boss);
    }

    constructor(boss) {
        this.particles = []
        this.boss = boss;

        this.interval = 70;
        this.previous = 0;
        this.isDone = false;

        this.velocity = 20;
    }

    mainLoop() {
        let time = new Date();
        let currentTime = time.getTime();

        if(currentTime - this.previous >= this.interval) {
            this.previous = currentTime;
            new CRParticle(this.particles, this.boss, this.velocity);
            this.velocity = Math.min(100, this.velocity + 0.1);
        }
    }

    stop() {
        for(let i=0; i<this.particles.length; i++) {
            this.particles[i].clear();
        }
        this.particles = [];
        this.isDone = true;
    }
}
export default CrimsonRain;