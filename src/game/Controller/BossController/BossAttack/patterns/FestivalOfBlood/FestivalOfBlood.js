import { loadImage } from "../../../../../utils/image_handler.js";
import FOBProjectile from "./FOBProjectile.js";
class FestivalOfBlood {
    static image = loadImage("../../../../../../../Assets/Sprite/Boss/particles/BloodFlame.png");

    particles = [];

    static construct(boss) {
        return new FestivalOfBlood(boss);
    }

    static customConstruct(maxInterval, minInterval, speed, spawnMultiplier) {
        function inner(boss) {
            return new FestivalOfBlood(boss, maxInterval, minInterval, speed, spawnMultiplier);
        }
        return inner;
    }

    constructor(boss, minInterval=200, maxInterval=500, speed=2, spawnMultiplier=1) {
        this.boss = boss;
        this.isDone = false;

        this.minY = (2*boss.dimension.height - boss.border.height);
        this.maxY = boss.dimension.height - 100;
        this.minX = 0;
        this.maxX = boss.border.width;

        this.previous = 0;
        this.interval = 0;

        this.speed = speed;
        this.spawnMultiplier = spawnMultiplier;

        this.minInterval = minInterval;
        this.maxInterval = maxInterval;
    }

    mainLoop() {
        let time = new Date();
        let currentTime = time.getTime();

        let dimension = this.boss.dimension;
        let border = this.boss.border;

        if(currentTime - this.previous >= this.interval) {
            let randomY = dimension.height - (Math.floor((Math.random() * 10000)) % border.height);
            let randomX = Math.floor((Math.random() * 10000)) % border.width;
    
            this.interval = (Math.floor(Math.random() * 100) % (this.maxInterval - this.minInterval)) + this.minInterval;
            new FOBProjectile(this.particles, this.boss, randomX, randomY, this.speed, this.spawnMultiplier);

            this.previous = currentTime;
        }

        this.particles.forEach((p) => {
            p.mainLoop();
        })


        
    }

    stop() {
        if(this.isDone) return;

        
        for(let i=0; i<this.particles.length; i++) {
            this.particles[i].clear();
        }
        this.particles = [];
        this.isDone = true;
    }


}
export default FestivalOfBlood;